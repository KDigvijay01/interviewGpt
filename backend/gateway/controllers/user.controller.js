export const getCurrUser = async(req, res) =>{
    try{
       return res.status(200).json({succes: true, user: req.user});
    }
    catch{
        return res.status(500).json({success: false, message: error.message});
    }
}