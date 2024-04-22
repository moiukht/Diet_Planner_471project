import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    
    <div className="flex min-h-screen bg-gradient-to-r from-beige-100 to-lime-200">
      <div className="max-w-2xl mx-auto flex-grow mt-20 ml-20">
        <div className='fixed py-4 bg-gray-100 rounded-lg px-4 mb-4 mt-20'>
          <h1 className="text-2xl font-semibold mb-4">Feedback</h1>
          <div className="flex flex-col items-center mt-6">
            {showFeedbackMessage && (
              <h3 className="text-lg text-gray-800">Thank you for your feedback!</h3>
            )}
            {username !='admin' && !submitted && (
              <>
                <h3 className="text-lg text-gray-800">Give Your Feedback</h3>
                <div className="mt-4 flex space-x-4">
                  <button onClick={() => handleFeedback(1)} className={`px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300 ${selectedFeedback === 1 ? 'bg-blue-600' : ''}`}>1</button>
                  <button onClick={() => handleFeedback(2)} className={`px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300 ${selectedFeedback === 2 ? 'bg-blue-600' : ''}`}>2</button>
                  <button onClick={() => handleFeedback(3)} className={`px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300 ${selectedFeedback === 3 ? 'bg-blue-600' : ''}`}>3</button>
                  <button onClick={() => handleFeedback(4)} className={`px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300 ${selectedFeedback === 4 ? 'bg-blue-600' : ''}`}>4</button>
                  <button onClick={() => handleFeedback(5)} className={`px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300 ${selectedFeedback === 5 ? 'bg-blue-600' : ''}`}>5</button>
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
