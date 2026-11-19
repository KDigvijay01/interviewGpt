import llm from "../config/llm.js";
import summaryPrompt from "../prompts/summaryPrompt.js";


const summaryAgent = async (data) => {
    try {
        const prompt = summaryPrompt(data);
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

export default summaryAgent;