import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const AdminPanel = () => {
  const [pendingReviews, setPendingReviews] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.isAdmin) {
      fetchPendingReviews();
    }
  }, [user]);

  const fetchPendingReviews = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/reviews/pending', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPendingReviews(response.data);
    } catch (error) {
      console.error('Error fetching pending reviews:', error);
    }
  };

  const handleReviewStatus = async (reviewId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/reviews/${reviewId}/status`, 
        { status },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      fetchPendingReviews();
    } catch (error) {
      console.error('Error updating review status:', error);
    }
  };

  if (!user?.isAdmin) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Review Panel</h2>
      {pendingReviews.length === 0 ? (
        <p className="text-gray-500">No pending reviews</p>
      ) : (
        <div className="space-y-4">
          {pendingReviews.map((review) => (
            <div key={review._id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{review.businessId.name}</h3>
                  <p className="text-sm text-gray-500">by {review.userId.name}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleReviewStatus(review._id, 'approved')}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReviewStatus(review._id, 'rejected')}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
              <div className="mt-2 text-sm text-gray-500">
                Rating: {review.rating}/5
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;