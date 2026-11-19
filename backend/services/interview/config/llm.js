import { ChatGroq } from "@langchain/groq"

const llm = new ChatGroq({
    // model: "openai/gpt-oss-120b",
    // model: "llama-3.3-70b-versatile",
    model: "openai/gpt-oss-120b",
    temperature: 0.2,
    maxRetries: 2,
})

export default llm;