import { createRoomService } from "../services/room.service.js";

export const createRoom = async (req, res, next) => {
  try {
    const roomData = req.body;
    const newRoom = await createRoomService(roomData);

    res
      .status(201)
      .json({ message: "Room created successfully", data: newRoom });
  } catch (error) {
    next(error);
  }
};
