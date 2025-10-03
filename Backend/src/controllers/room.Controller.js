import {
  createRoomService,
  getRoomsService,
  joinRoomService,
  getRoomByIdService
} from "../services/room.service.js";

export const createRoom = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.userId; 

    const roomData = {
      creatorId: userId,
      name:data.name,
      isPublic:data.isPublic,
      password:data.password,
      currentMovieId:data.currentMovieId,
      description:data.description
    }
    const newRoom = await createRoomService(roomData);

    if (!newRoom.success) {
      return res.status(newRoom.status).json({ message: newRoom.message });
    } 
    res
      .status(201)
      .json({ message: "Room created successfully", room: newRoom });
  } catch (error) {
    next(error);
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await getRoomsService();
    if (!rooms.success) {
      return res.status(rooms.status).json({ message: rooms.message });
    }

    res.status(200).json({ message: "Rooms Fetched Successfully" ,rooms:rooms});
  } catch (error){
    next(error);
  }
};

export const joinRoom = async (req, res, next) => {
  try {
    const roomData = req.body;

    const room = await joinRoomService(roomData);
    if (!room.success) {
      return res.status(room.status).json({success:room.success, message: room.message });
    }

    res.status(200).json({success:room.success, message: "Succesfullt joined the room" });
  } catch (error) {
    next(error);
  }
};

export const getRoomById = async (req, res, next) => {
  try {
    const roomId = req.params.id;

    const room = await getRoomByIdService(roomId);

    res.status(200).json({ room: room });
  } catch (error) {
    next(error);
  }
};
