import llm from "../config/llm.js";
import hrInterviewPrompt from "../prompts/hrInterviewPrompt.js";
import techInterviewPrompt from "../prompts/techInterviewPrompt.js";


const interviewAgent = async (data) => {
    try {
        const prompt = data.type?.toLowerCase() === "hr" ? hrInterviewPrompt(data) : techInterviewPrompt(data);
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

export default interviewAgent;