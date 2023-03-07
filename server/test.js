import mongoose from "mongoose";
import ApplyHistory from "./models/ApplyHistory.js";

const URI = `mongodb+srv://ashish729912:hQAIMkyrifmhQH8w@webscrapercluster.sagxtxf.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongoose Connected");
  });

const db = mongoose.connection;
await ApplyHistory.deleteMany();

await db.close();
