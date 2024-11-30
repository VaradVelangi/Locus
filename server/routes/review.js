import express from 'express';
import { body, validationResult } from 'express-validator';
import { auth, adminAuth } from '../middleware/auth.js';
import Review from '../models/Review.js';

const router = express.Router();

// Get reviews for a business
router.get('/business/:businessId', async (req, res) => {
  try {
    const reviews = await Review.find({
      businessId: req.params.businessId,
      status: 'approved'
    })
    .populate('userId', 'name')
    .sort('-createdAt');
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit review
router.post('/',
  auth,
  [
    body('businessId').notEmpty().withMessage('Business ID is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').trim().notEmpty().withMessage('Comment is required')
  ],
  async (req, res) => {
    try {
      console.log("review")
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const review = new Review({
        ...req.body,
        userId: req.user.userId
      });
      
      await review.save();
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);




export default router;