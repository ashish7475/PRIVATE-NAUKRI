import mongoose from "mongoose";

const PasswordResetSchema = new mongoose.Schema({
  username: String,
  token: String,
});

const PasswordResetToken = mongoose.model(
  "PasswordResetToken",
  PasswordResetSchema
);

export default PasswordResetToken;
