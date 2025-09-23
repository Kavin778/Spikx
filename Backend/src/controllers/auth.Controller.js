import { generateTokenandCookieService, logoutServie, refreshTokenService } from "../services/auth.service.js";
import { getUserService } from "../services/user.service.js";
import bcrypt from "bcrypt"

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUserService(email);

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if (!user || !isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const accessToken = await generateTokenandCookieService(res, user);

    res.status(200).json({ message: "Login Successfull", accessToken });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const {refreshToken} = req.cookies;
    if (!refreshToken)
      return res.status(401).json({ message: "Invalid Credentials" });
    
    const result = await refreshTokenService(refreshToken);

    if(!result.success){
      return res.status(result.status).json({message:result.message})
    }

    res.status(200).json({ message: "Session created", accessToken:result.accessToken });

  } catch (error) {
    next(error);  
  }
};

export const logout = async(req,res,next)=>{
  try{
    const {refreshToken} = req.cookies;

    if(!refreshToken)
      return res.status(204).json({message:"You are not logged in!"})

    const result = await logoutServie(res,refreshToken)

    res.status(result.status).json({message:result.message});
  }
  catch(error){
    next(error)
  }
}

