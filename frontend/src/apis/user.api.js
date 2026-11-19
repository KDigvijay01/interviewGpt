import api from "../utils/axios";


export const getCurrentUser = async() => {
    try{
        const response = await api.get("/api/me");
        console.log("usr data", response);
        return response.data;
    }
    catch(error){
        console.error(error);
        return null;  
    }
}

export const userCoins = async (data) => {
    try {
        const response = await api.post("/api/auth/use-coins", data);
        console.log("coins data", response);
        return response.data;
    } catch (error) {
        console.log(error.response?.data || error.message
        );
        return null;
    }   
}