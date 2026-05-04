import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";

// 🔥 1. Define structured output
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    summary: z.string(),
    rootCause: z.string(),
    suggestion: z.string()
  })
);

// 🔥 2. Create Groq model (LLaMA 3)
const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama3-8b-8192",
  temperature: 0.2,
});

// 🔥 3. Clean logs
const shapeLogs = (logs = []) =>
  logs.map(l => ({
    status: l.status,
    statusCode: l.statusCode,
    responseTime: l.responseTime,
    error: l.errorMessage || null,
    time: l.createdAt
  }));

// 🔥 4. Prompt template (IMPORTANT: stricter for LLaMA)
const prompt = ChatPromptTemplate.fromTemplate(`
You are a backend monitoring expert.

URL: {url}
Method: {method}

Recent logs:
{recentLogs}

Previous logs:
{previousLogs}

Instructions:
- Detect patterns (timeouts, latency spikes, failures)
- Explain root cause in 1 sentence
- Suggest one actionable fix

CRITICAL:
- Return ONLY valid JSON
- No explanation, no markdown, no text outside JSON

{format_instructions}
`);

// 🔥 5. Main function
export const generateSummary = async ({
  url,
  method,
  recentLogs,
  previousLogs
}) => {
  try {
    const formattedPrompt = await prompt.format({
      url,
      method,
      recentLogs: JSON.stringify(shapeLogs(recentLogs), null, 2),
      previousLogs: JSON.stringify(shapeLogs(previousLogs), null, 2),
      format_instructions: parser.getFormatInstructions()
    });

    const response = await model.invoke(formattedPrompt);

    // 🔒 parse structured output
    const result = await parser.parse(response.content);

    return result;

  } catch (err) {
    console.error("Groq LangChain Error:", err.message);

    return {
      summary: "Issue detected",
      rootCause: "AI unavailable",
      suggestion: "Check logs manually"
    };
  }
};