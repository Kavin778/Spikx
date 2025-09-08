import { resgisterUser } from '../services/user.service.js';

const registerUser = async (req,res,next) =>{
    try{
         const userData = req.body;
         const newUser = await resgisterUser(userData);

         res.status(201)
            .json({ message: 'User registered successfully', data: newUser });
    }
    catch(error){
        next(error);
    }
}

export { registerUser };