import jwt from "jsonwebtoken";

export const signedUrlHandler = (req, res, next) => {
  const movieId  = req.params.id;
  const { token } = req.query;
  if (!token) {
    return res.status(401).json({ message: "Invalid Url" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    if (decoded.movieId !== movieId || decoded.type !== "video_stream") {
      return res.status(401).json({ message: "Invalid Url" });
    }
    next();
  } catch (error) {
    res.status(401).json({message:"Invalid or expired token"});
  }
};
