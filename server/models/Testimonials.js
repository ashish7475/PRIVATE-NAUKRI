import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema({
  username: String,
  title: String,
  photoUrl: String,
  name: String,
  testimonial: String,
  positive: Boolean,
});

const Testimonial = mongoose.model("Testimonials", TestimonialSchema);

export default Testimonial;
