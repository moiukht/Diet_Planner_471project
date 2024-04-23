import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Ufeedback.css';
const UserFeedback = () => {
  const [feedback, setFeedback] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User not authenticated');
          return;
        }

        setUsername(JSON.parse(atob(token.split('.')[1])).username)
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Error fetching user profile');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('http://localhost:3001/user/feedback');
        setFeedback(response.data.feedback);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFeedback();
  }, [submitted]);

  const handleFeedback = (value) => {
    setSelectedFeedback(value);
  };

  const handleSubmit = async () => {
    if (!username) {
      alert('Please log in to submit feedback.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/user/feedback', { username: username, feedback: selectedFeedback.toString() });
      setSubmitted(true);
      setShowFeedbackMessage(true);
      setTimeout(() => setShowFeedbackMessage(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const changeFeedback = async () => {
    setFeedback(null);
    setSubmitted(false);
  };

  const giveFeedbackAgain = () => {
    setSubmitted(false);
    setFeedback(null);
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gradient-to-r from-lime-100 to-lime-100">
      <div className="max-w-2xl mx-auto flex-grow">
        <div className='py-4 bg-gray-100 rounded-lg px-4 mb-4'>
        <h1 className="text-2xl font-semibold mb-4 text-center">Feedback</h1>
          <div className="flex flex-col items-center mt-6">
            {showFeedbackMessage && (
              <h3 className="text-lg text-gray-800">Thank you for your feedback!</h3>
            )}
            {username !== 'admin' && !submitted && (
              <>
                <h3 className="text-lg text-gray-800">Give Your Feedback</h3>
                <div class="rate">
              <input type="radio" id="star5" name="rate" value="5" onClick={() => handleFeedback(5)}/>
              <label for="star5" title="text">5 stars</label>
              <input type="radio" id="star4" name="rate" value="4" onClick={() => handleFeedback(4)}/>
              <label for="star4" title="text">4 stars</label>
              <input type="radio" id="star3" name="rate" value="3" onClick={() => handleFeedback(3)}/>
              <label for="star3" title="text">3 stars</label>
              <input type="radio" id="star2" name="rate" value="2" onClick={() => handleFeedback(2)}/>
              <label for="star2" title="text">2 stars</label>
              <input type="radio" id="star1" name="rate" value="1" onClick={() => handleFeedback(1)}/>
              <label for="star1" title="text">1 star</label>
            </div>
                
                <button onClick={handleSubmit} className="mt-6 px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:bg-green-600 transition duration-300">Submit</button>
              </>
            )}
            {username === 'admin' && (
              <h3 className="text-lg text-gray-800">Only users can provide feedback</h3>
            )}
            {submitted && (
              <button onClick={giveFeedbackAgain} className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600 transition duration-300">Give Feedback Again</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default UserFeedback;
