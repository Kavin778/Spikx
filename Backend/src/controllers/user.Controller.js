import { getUserByIdService, resgisterUserService } from "../services/user.service.js";

export const registerUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const newUser = await resgisterUserService(userData);

    res
      .status(201)
      .json({ message: "User registered successfully", data: newUser });
  } catch (error) {
    next(error);
  }
};

export const getUserDetails = async (req,res,next)=>{
  try{
    const userId = req.userId;
    const user = await getUserByIdService(userId);
    res.status(200).json({message:"User found successfully",user:user})
  }
  catch(error){
    next(error)
  }
}


