const API_KEY = process.env.EXPLABS_API_KEY;
if (!API_KEY) {
  console.error(
    "EXPLABS_API_KEY is not set.\n" +
    "Create one at Settings -> API keys on Experiential, then:\n" +
    '  export EXPLABS_API_KEY="xpl_..."'
  );
  process.exit(1);
}

const BASE_URL = "https://api.experientiallabs.ai/v1";
const MODEL = "gpt-6-astra";

const body = {
  model: MODEL,
  messages: [{ role: "user", content: "Hello! What model are you and who made you?" }],
  max_tokens: 256,
};

console.log(`POST ${BASE_URL}/chat/completions`);
console.log(`Model: ${MODEL}\n`);

const res = await fetch(`${BASE_URL}/chat/completions`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
  body: JSON.stringify(body),
});

if (!res.ok) {
  const err = await res.text();
  console.error(`HTTP ${res.status}: ${err}`);
  process.exit(1);
}

const data = await res.json();
const reply = data.choices?.[0]?.message?.content ?? "(no content)";
const usage = data.usage ?? {};

console.log("--- Reply ---");
console.log(reply);
console.log("\n--- Token Usage ---");
console.log(`Prompt tokens:     ${usage.prompt_tokens ?? "?"}`);
console.log(`Completion tokens: ${usage.completion_tokens ?? "?"}`);
console.log(`Total tokens:      ${usage.total_tokens ?? "?"}`);
