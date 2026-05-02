import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// keep payload tight & safe
const shapeLogs = (logs = []) =>
  logs.map(l => ({
    status: l.status,
    statusCode: l.statusCode,
    responseTime: l.responseTime,
    error: l.errorMessage || null,
    at: l.createdAt
  }));

const buildPrompt = ({ url, method, recentLogs, previousLogs }) => {
  return `
You are a senior SRE. Analyze these monitoring logs and produce a concise diagnosis.

Target:
- URL: ${url}
- Method: ${method}

Recent logs (latest first):
${JSON.stringify(shapeLogs(recentLogs), null, 2)}

Previous logs:
${JSON.stringify(shapeLogs(previousLogs), null, 2)}

Instructions:
- Identify pattern (latency spike, status mismatch, timeouts, auth errors, etc.)
- Provide a short root cause hypothesis (1 sentence)
- Provide one actionable next step

Return ONLY valid JSON in this exact shape:
{
  "summary": "...",
  "rootCause": "...",
  "suggestion": "..."
}
`;
};

export const generateSummary = async ({
  url,
  method,
  recentLogs,
  previousLogs
}) => {
  try {
    const prompt = buildPrompt({ url, method, recentLogs, previousLogs });

    const resp = await client.responses.create({
      model: "gpt-4.1-mini",   // fast/cheap; upgrade if needed
      input: prompt,
      temperature: 0.2,
      max_output_tokens: 150
    });

    const text = (resp.output_text || "").trim();

    // 🔒 enforce JSON output
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      // fallback if model slips format
      parsed = {
        summary: text.slice(0, 120) || "Issue detected.",
        rootCause: "Unable to parse AI output.",
        suggestion: "Check recent logs and server metrics."
      };
    }

    // basic shape guard
    return {
      summary: parsed.summary || "Issue detected.",
      rootCause: parsed.rootCause || "Unknown cause.",
      suggestion: parsed.suggestion || "Inspect logs and metrics."
    };
  } catch (err) {
    console.error("AI Service Error:", err.message);
    return {
      summary: "Issue detected.",
      rootCause: "AI unavailable.",
      suggestion: "Check logs and retry."
    };
  }
};