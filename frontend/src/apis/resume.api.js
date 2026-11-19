import api from "../utils/axios";


export const getResume = async() =>{
    try{
        const response = await api.get("/api/resume/get-resume");
        console.log("resume data", response.data);;
        return response.data;
        
    }
    catch(error){
        console.error(error);
        return null;
        
    }
}