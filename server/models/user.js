import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: {
    type: String,
  },
  profilePhotoUrl: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
