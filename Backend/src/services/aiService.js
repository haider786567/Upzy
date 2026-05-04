import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import config from "../config/config.js";

// 🔥 1. Create Groq model
const model = new ChatGroq({
  apiKey: config.GROQ_API_KEY,
  model: "llama-3.1-8b-instant",
  temperature: 0.2,
});

// 🔥 2. Clean logs
const shapeLogs = (logs = []) =>
  logs.map(l => ({
    status: l.status,
    statusCode: l.statusCode,
    responseTime: l.responseTime,
    error: l.errorMessage || null,
    time: l.createdAt
  }));

// 🔥 3. Prompt (NO schema)
const prompt = ChatPromptTemplate.fromTemplate(`
You are a backend monitoring expert.

Return ONLY JSON:

{
  "summary": "short summary",
  "rootCause": "1 sentence",
  "suggestion": "1 fix"
}

NO markdown. NO explanation.

URL: {url}
Method: {method}

Recent logs:
{recentLogs}

Previous logs:
{previousLogs}
`);

// 🔥 4. Clean output
function cleanOutput(raw) {
  if (!raw) return "";

  if (Array.isArray(raw)) {
    raw = raw.map(r => r.text || "").join("");
  }

  return raw
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
}

// 🔥 5. Extract LAST JSON block
function extractLastJSON(text) {
  const matches = text.match(/\{[\s\S]*?\}/g);
  return matches ? matches[matches.length - 1] : null;
}

// 🔥 6. Safe parse
function safeParse(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);

    if (
      typeof parsed.summary === "string" &&
      typeof parsed.rootCause === "string" &&
      typeof parsed.suggestion === "string"
    ) {
      return parsed;
    }

    return null;
  } catch {
    return null;
  }
}

// 🔥 7. Retry wrapper
async function callWithRetry(promptText, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    const res = await model.invoke(promptText);

    const cleaned = cleanOutput(res.content);
    const extracted = extractLastJSON(cleaned);
    const parsed = safeParse(extracted);

    if (parsed) return parsed;

    promptText += "\nREMEMBER: ONLY JSON.";
  }

  return null;
}

// 🔥 8. Main function
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
      previousLogs: JSON.stringify(shapeLogs(previousLogs), null, 2)
    });

    const result = await callWithRetry(formattedPrompt);

    if (result) return result;

    return {
      summary: "Service issue detected",
      rootCause: "AI parsing failed",
      suggestion: "Check logs manually"
    };

  } catch (err) {
    console.error("Groq Error:", err.message);

    return {
      summary: "Monitoring failure",
      rootCause: "AI error",
      suggestion: "Inspect system logs"
    };
  }
};