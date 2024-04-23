import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/feedback/view');
        setFeedbacks(response.data.filter(feedback => feedback !== null && feedback !== ''));
      } catch (error) {
        console.error(error);
        setError('Server Error');
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-beige-100 to-lime-200">
      <div className="max-w-2xl mx-auto flex-grow mt-20 ml-20">
        <div className='fixed py-4 bg-gray-100 rounded-lg px-4 mb-4 mt-20'>
          <h1 className="text-2xl font-semibold mb-4 text-center">User Feedback List</h1>
          <div className="flex flex-col items-center mt-6">
            {error && (
              <h3 className="text-lg text-gray-800">{error}</h3>
            )}
            
            {!error && feedbacks.length > 0 && (
              <div className="mt-4 flex flex-col space-y-4">
                {feedbacks.map((feedback, index) => (
                  <div key={index} className="px-4 py-2 bg-white rounded-md shadow-md">
                    <p className="text-gray-800">{feedback}</p>
                    <div className="stars">
                      {[...Array(parseInt(feedback))].map((e, i) => {
                        return <span key={i} className="star">&#9733;</span>;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!error && feedbacks.length === 0 && (
              <h3 className="text-lg text-gray-800">No feedback available</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFeedback;
