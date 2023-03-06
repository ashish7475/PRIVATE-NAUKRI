import mongoose from "mongoose";
import AmazonJobListing from "./models/AmazonJobListing.js";

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
await AmazonJobListing.deleteMany();

await db.close();
