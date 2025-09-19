import { resgisterUserService } from "../services/user.service.js";

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
