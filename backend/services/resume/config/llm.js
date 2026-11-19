import { ChatGroq } from "@langchain/groq"

const llm = new ChatGroq({
    // model: "openai/gpt-oss-120b",
    // model: "llama-3.3-70b-versatile",
    // model: "meta-llama/llama-guard-4-12b",
    // model: "gpt-3.5-turbo",
    // model: "qwen/qwen3-32b",
    // model: "openai/gpt-oss-120b",
    model: "openai/gpt-oss-120b",
    temperature: 0.2,
    maxTokens: 2500,
    maxRetries: 2,
})

export default llm;