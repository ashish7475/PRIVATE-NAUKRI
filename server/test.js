import mongoose from "mongoose";
import AmazonJobListing from "./models/AmazonJobListing.js";
import ApplyHistory from "./models/ApplyHistory.js";
import Testimonial from "./models/Testimonials.js";

const URI = `mongodb+srv://ashish729912:hQAIMkyrifmhQH8w@webscrapercluster.sagxtxf.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongoose Connected");
  });
const query = {
  title: { $regex: "", $options: "i" },
};

query.type = "Internship";

const db = mongoose.connection;
await Testimonial.deleteMany();

await db.close();
