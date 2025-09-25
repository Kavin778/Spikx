import jwt from "jsonwebtoken";
import prisma from "../config/dbconfig.js";
import { hashToken } from "../utils/hash.js";

const refreshKey = process.env.REFRESH_TOKEN_SECRET_KEY;
const accessKey = process.env.ACCESS_TOKEN_SECRET_KEY;

function generateAccessToken(user) {
  return jwt.sign({ userId: user.id }, accessKey, {
    expiresIn: "15m",
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ userId: user.id }, refreshKey, {
    expiresIn: "7d",
  });
}

function generateUrlToken(movieId, userId) {
  return (
    jwt.
    sign(
      { movieId: movieId, userId: userId, type: "video_stream" },
      accessKey,
      { expiresIn: "4h" }
    )
  );
}

export async function generateTokenandCookieService(res, user) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  const refreshTokenHash = hashToken(refreshToken);

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await prisma.sessions.create({
    data: {
      userId: user.id,
      refreshToken: refreshTokenHash,
      expiresAt,
    },
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    expires: expiresAt,
  });

  return accessToken;
}

export async function refreshTokenService(refreshToken) {
  let payload;
  try {
    payload = jwt.verify(refreshToken, refreshKey);
  } catch (error) {
    return { success: false, status: 401, message: "Invalid refresh token" };
  }

  const hashedRefreshToken = hashToken(refreshToken);

  const session = await prisma.sessions.findUnique({
    where: { refreshToken: hashedRefreshToken },
  });

  if (!session || session.expiresAt < new Date()) {
    return { success: false, status: 401, message: "Session expired" };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: payload.userId,
    },
  });

  const result = generateAccessToken(user);

  return { success: true, status: 200, accessToken: result };
}

export async function logoutServie(res, refreshToken) {
  const hashedRefreshToken = hashToken(refreshToken);

  await prisma.sessions.deleteMany({
    where: { refreshToken: hashedRefreshToken },
  });

  res.clearCookie("refreshToken");
  return { status: 204, message: "Logout Success" };
}

export async function getSignedUrlService(movieId, userId) {

  const urlToken = generateUrlToken(movieId,userId);

  if(!urlToken){
    return {success:false,status:500,message:"Error while creating urlToken"};
  }

  return {success:true,status:200,token:urlToken,message:"Successfully created urlToken"};
}
