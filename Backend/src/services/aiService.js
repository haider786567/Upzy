import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import config from "../config/config.js";

// 🔥 1. Define structured output
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    summary: z.string(),
    rootCause: z.string(),
    suggestion: z.string()
  })
);

// 🔥 2. Create Gemini model
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0.2,
  apiKey: config.GEMNI_API_KEY
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

// 🔥 4. Prompt template
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

    const response = await model.invoke([
      { role: "user", content: formattedPrompt }
    ]);
    console.log(response);
    

    // 🔒 parse structured output
    const result = await parser.parse(response.content);
    console.log(result);
    

    return result;

  } catch (err) {
    console.error("Gemini LangChain Error:", err.message);

    return {
      summary: "Issue detected",
      rootCause: "AI unavailable",
      suggestion: "Check logs manually"
    };
  }
};