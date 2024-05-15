import { fieldType, senderReceiver } from "../schemaShards/genericShards.js";
import mongoose from "mongoose";

const roomsSchema = new mongoose.Schema({
  ...(await senderReceiver(false)),
  roomId: { ...fieldType({}) },
});

const Rooms = mongoose.model("rooms", roomsSchema);

export default Rooms;
