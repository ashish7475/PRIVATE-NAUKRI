import React from 'react'

const Testimonials = () => {
  return (
    <div>
      <form>
  <div class="form-group">
    <label for="title">Title</label>
    <input type="text" class="form-control" id="title" placeholder="Title..."/>
  </div>
  
  <div class="form-group">
    <label for="testimonial">Testimonial</label>
    <textarea class="form-control" id="testimonial" rows="3"></textarea>
  </div>
</form>
    </div>
  )
}

export default Testimonials
