import jwt from 'jsonwebtoken'

export const socketAuthHandler =(socket,next)=>{
    const token = socket.handshake.auth.token;

    if(!token){
        return next(new Error("Socket Authentication failed,Token is not available"));
    }

    try{
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY);
        socket.userId = decoded.userId;
        next();
    }
    catch(error){
        console.error("Authentication Failed,Invalid token");
        next(new Error("Invalid Token"));
    }
}