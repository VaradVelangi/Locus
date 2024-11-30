import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    trim: true
  }
});

reviewSchema.post('save', async function() {
  const Review = this.constructor;
  const Business = mongoose.model('Business');
  
  const approvedReviews = await Review.find({
    businessId: this.businessId,
    status: 'approved'
  });
  
  const totalRating = approvedReviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = approvedReviews.length > 0 ? totalRating / approvedReviews.length : 0;
  
  await Business.findByIdAndUpdate(this.businessId, {
    rating: Number(averageRating.toFixed(1)),
    reviewCount: approvedReviews.length
  });
});

export default mongoose.model('Review', reviewSchema);