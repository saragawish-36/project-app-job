import mongoose, { model, Schema, Types } from "mongoose";

const chatSchema = new Schema(
  {
    senderId: { type: Types.ObjectId, ref: "user", required: true },
    receiverId: { type: Types.ObjectId, ref: "user", required: true },
    messages: [
      {
        message: {
          type: String,
          required: true,
        },
        senderId: { type: Types.ObjectId, ref: "user", required: true },
      },
    ],
  },
  { timeseries: true }
);

export const Chat = mongoose.models.Chat || model("Chat", chatSchema);

export default Chat;
