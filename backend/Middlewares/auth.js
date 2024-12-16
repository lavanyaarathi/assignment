const jwt=require('jsonwebtoken');
const ensureauthenticated=(req,res,next)=>{
     auth=req.headers['authorization'];
    if(!auth){
        return res.status(403)
        .json({message:'Unauthorized,JWT is required'})
    }
    try{
        const decoded=jwt.verify(auth, process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(err){
        return res.status(403)
        .json({message:'Unauthorized,JWT is wrong or expired'})
    }
}
module.exports=ensureauthenticated;