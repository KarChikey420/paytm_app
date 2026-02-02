import jwt from 'jsonwebtoken'
import JWT_SECRET from './routes/config';

const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization header missing or invalid' });
    }

    const token=authHeader.split(' ')[1];

    try{
        const decoded=jwt.verify(token, JWT_SECRET);
        req.userId=decoded.userId;
        next();
    }catch(err){
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}
export {
    authMiddleware
}