import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema({
  username: String,
  photoUrl: String,
  name: String,
  testimonial: String,
});

const Testimonial = mongoose.model("Testimonials", TestimonialSchema);

export default Testimonial;
