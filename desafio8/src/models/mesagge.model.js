import mongoose from 'mongoose';
const messageCollection = 'messages';
const messagesSchema = new mongoose.Schema({
    message: String,
    user: String
});
export const messageModel = mongoose.model(messageCollection, messagesSchema);
