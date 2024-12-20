import React, { useState, useEffect } from 'react';
import OpenAI from "openai";
import axios from 'axios';
import dietbg from './dietbg.webp'
// import { PromptTemplate } from 'langchain/prompts';
// import { ResponseSchema, StructuredOutputParser } from 'langchain/output_parsers';

const llm = new OpenAI({apiKey: '27b95a3400e500cba3ab6afb030a0dae16b8d45fcb4626456aa5acc5b7901018', baseURL: 'https://api.together.xyz/v1', dangerouslyAllowBrowser: true });

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('AIzaSyCIdb1V_JApZ89lbc1l6g9WdT9bFnoSx6E');

// ...

// For text-only input, use the gemini-pro model
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

// ...

const MealPlan = () => {
  const [age, setAge] = useState('');
  const [requiredCalories, setRequiredCalories] = useState('');
  const [dietary, setDietary] = useState('');
  const [error, setError] = useState('');
  const [mealPlan, setMealPlan] = useState([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

    // Fetch username  
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('User not authenticated');
        } else {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUsername(decodedToken.username);
        }
    }, []); 

  useEffect(() => {
    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('User not authenticated');
                return;
            }

            const username = JSON.parse(atob(token.split('.')[1])).username;

            const response = await axios.get(`http://localhost:3001/user/profile/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const userProfileData = response.data;
            console.log(userProfileData)

            const dob = new Date(userProfileData.dob);

            // Get the current date
            const currentDate = new Date();

            // Calculate the difference between the current date and the DOB
            const ageDiffMilliseconds = currentDate - dob;

            // Convert milliseconds to years
            const ageDate = new Date(ageDiffMilliseconds);
            const age = Math.abs(ageDate.getUTCFullYear() - 1970);

            setAge(age)

        } catch (error) {
            console.error('Error fetching user profile:', error);
            setError('Error fetching user profile');
        }
    };

    fetchUserProfile();
}, []);

  const getMealPlan = async () => {
    try {
        setMealPlan([]); // Clear previous meal plan
    setError(''); // Clear previous error
    setGenerated(false); // Set generated to false
    if (!requiredCalories || !dietary) {
        // Display validation messages or prevent form submission
        // For example:
        setError('Please fill out all required fields.');
        return;
      }
        setLoading(true);
        console.log(age, requiredCalories, dietary)
      const questionString = `
        I am ${age} years of age.
        My calorie goal for the day is ${requiredCalories}.
        I am ${dietary}. I want to have 5 meals in a day.
        Create a meal plan using these details.
        Try to suggest Bangladeshi cuisine.
        Using these details answer the following question in 5 paragraphs (each with bullet points of the meals) with each paragraph starting with "#":
        meal1: What should be the breakfast and how many calories are in there?
        meal2: What should be the midday snack and how many calories are in there?
        meal3: What should be the lunch and how many calories are in there?
        meal4: What should be the evening snack and how many calories are in there?
        meal5: What should be the dinner and how many calories are in there?
      `;
      const prompt = questionString

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(text);
      console.log(response)
      const parsedResponse = parseResponse(text);
      setMealPlan(parsedResponse);
      setLoading(false);
      setGenerated(true);
      
    } catch (error) {
      setError('Error fetching meal plan');
      console.error(error);
      setLoading(false);
    }
  };
  
  const parseResponse = (response) => {
    const lines = response.split('#');
    const mealPlan = [];
    for (let i = 0; i < 5; i++) {
      const meal = {};
      meal.name = `meal${i + 1}`;
      meal.description = lines[i + 1]; // Assuming the meal descriptions start from line 7 in the response
      mealPlan.push(meal);
    }
    return mealPlan;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-beige-100 to-beige-300 relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={dietbg}  
          alt="Background"
          className="object-cover w-full h-full opacity-65"
        />
      </div>

      <div className="max-w-4xl w-full mx-auto flex mt-20 relative z-10"> {/* Ensure z-index is higher than the background */}
        {/* Form Section */}
        <div className="w-1/3 p-4">
          <label htmlFor="dietary" className="mb-1 block text-xl text-gray-800">Required Calories</label>
          <input
            className="mb-2 p-2 border rounded-md w-full"
            type="text"
            value={requiredCalories}
            onChange={(e) => setRequiredCalories(e.target.value)}
            required
          />

          <label htmlFor="dietary" className="mb-1 block text-xl text-gray-800">Dietary Preference</label>
          <select
            id="dietary"
            className="mb-2 p-2 border rounded-md w-full"
            value={dietary}
            onChange={(e) => setDietary(e.target.value)}
            required
          >
            <option value="">Select Dietary Preference</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-vegetarian">Non-vegetarian</option>
          </select>

          <button
            className="mb-4 px-4 py-2 bg-lime-300 text-black rounded-md shadow-md hover:bg-lime-600"
            onClick={getMealPlan}
          >
            Generate Meal Plan
          </button>
          {error && <p className="text-red-500">{error}</p>}
          {loading && <p className="text-green-500">GENERATING</p>}
        </div>

        {/* Output Section */}
        <div className="w-2/3">
  <div className="container mx-auto">
    <div className="grid gap-4">
      {mealPlan.map((meal, index) => (
        <div key={index} className="rounded-lg bg-white shadow-md p-6">
          <p className="text-xl font-semibold mb-4 text-purple-800">{meal.title}</p>
          <p className="text-lg text-gray-700" dangerouslySetInnerHTML={{ __html: meal.description.replace(/\n/g, '<br>') }}></p>
        </div>
      ))}
    </div>
  </div>
</div>
      </div>
    </div>
  );
};


export default MealPlan;