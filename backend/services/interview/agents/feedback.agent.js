import llm from "../config/llm.js";
import feedbackPrompt from "../prompts/feedbackPrompt.js";

const feedbackAgent = async (data) => {
    try {
        const prompt = feedbackPrompt(data);
        const response = await llm.invoke(prompt);
        const refined = response.content
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
        return JSON.parse(refined);
    }
    catch(error){
        console.error(error);
        return null;
    }
}

export default feedbackAgent;