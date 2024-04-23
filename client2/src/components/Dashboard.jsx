import React, { useState, useEffect } from 'react';
import { useRef } from "react";
import { motion } from "framer-motion";

import { Link } from 'react-router-dom'; // Import Link
import DietCalendar from './DietCalendar';
import './Dashstyle.css';
import cvrImage from "./Assets/2.jpg"

const Dashboard = () => {

  const dashboardRef = useRef(null);

  const scrollToDashboard = () => {
    if (dashboardRef.current) {
      dashboardRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserProfile(user);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);


  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!userProfile) {
    return <div className="flex items-center justify-center h-screen">User not found</div>;
  }
  
  return (
    // <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-beige-100 to-beige-300">
    //   <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Hello, {userProfile.name}!</h2>
    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //     <Link to="/mealplan" className="link-button">Meal Plan Generator</Link>
    //     <Link to="/diet-calendar" className="link-button">Diet Calendar</Link>
    //     <Link to="/workreco" className="link-button">Workout Recommendations</Link>
    //     <button className="action-button">Calorie Counter</button>
    //     <Link to="/showbmi" className="link-button">Show BMI</Link>
    //     <Link to="/notifications" className="link-button">Notifications</Lnk>
    //   </div>
    // </div> 
    <div className="flex flex-col font-[TimesNewRoman]  mt-20 mb-32 mb-[-1rem] ">
      {/* <div className="w-auto relative h-[100vh] bg-black  text-white"> */}

      <div className='flex flex-col '>
      <img
    src="https://t4.ftcdn.net/jpg/02/92/20/37/360_F_292203735_CSsyqyS6A4Z9Czd4Msf7qZEhoxjpzZl1.jpg"
    alt=".."
    className="abssolute inset-0 object-cover" 
  />
  <h1 className="absolute mt-[25rem] ml-[53rem] text-white text-7xl text-center font-semibold ">WELCOME!!</h1>
      <motion.button
        whileHover={{ scale: 1.1 }} // Scale to 1.1 on hover
        className="absolute mt-[35rem] ml-[60rem] "
      >
    <button
    onClick={scrollToDashboard} 
    className='bg-[#9cc034] px-10 py-5 rounded-xl text-4xl '>Explore</button>
    </motion.button>
    </div>

          {/* Background image with overlay */}
          {/* <div className="relative">

  <div className="flex flex-col gap-20 absolute inset-0 flex items-center justify-center">
    <p className="text-white text-7xl font-bold">Welcome</p>
    <motion.button
        whileHover={{ scale: 1.1 }} // Scale to 1.1 on hover
        className="relative"
      >
    <button
    onClick={scrollToDashboard}
    className='bg-red-500 px-10 py-5 rounded-xl text-4xl'>Explore</button>
    </motion.button>
  </div>
</div> */}
     


      <div

      id='dashboard'
      ref={dashboardRef}
      
      style={{

        background: "rgb(255,255,255)",
        background: "linear-gradient(270deg, rgba(255,255,255,1) 7%, rgba(156,192,48,1) 100%)",
        padding: "1rem"
      }}    
      className="flex flex-col items-center h-[100vh] pt-32 gap-16">
          <div className='flex flex-row gap-[20rem] mx-10'>
          <div className='rounded-xl'>

          <Link to="/mealplan">
      <motion.button
        whileHover={{ scale: 1.1 }} // Scale to 1.1 on hover
        className="relative"
      >
        <img
          className="w-[30rem] rounded-lg shadow-lg shadow-[#9cc034] h-[25rem]"
          src="https://as1.ftcdn.net/v2/jpg/02/91/26/36/1000_F_291263648_p6xUmn8znBXXiBDquzbAIiHsPk1rosnU.jpg"
          alt="planner"
        />
        <motion.div
          className="absolute inset-0 bg-black opacity-60 hover:opacity-70 flex items-center justify-center"
          whileHover={{ opacity: 0.5 }} // Opacity to 50% on hover
          whileTap={{ opacity: 0 }} // Hide text on tap
        >
          <p className="text-white text-4xl">Meal planner</p>
        </motion.div>
      </motion.button>
      </Link>
    </div>
    <div className='rounded-xl'>
    <Link to="/workreco">
      <motion.button
        whileHover={{ scale: 1.1 }} // Scale to 1.1 on hover
        className="relative"
      >
        <img
          className="w-[30rem] rounded-lg shadow-lg shadow-[#9cc034] h-[25rem]"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyNsQCPqKQbytxV7Vwk8WeNTz4mM5-ZmH1pg&s"
          alt="planner"
        />
        <motion.div
          className="absolute inset-0 bg-black opacity-60 hover:opacity-70 flex items-center justify-center"
          whileHover={{ opacity: 0.5 }} // Opacity to 50% on hover
          whileTap={{ opacity: 0 }} // Hide text on tap
        >
          <p className="text-white text-4xl">Workout Recommendations</p>
        </motion.div>
      </motion.button>
      </Link>
    </div>
    <div className='rounded-xl'>
    <Link to="/caloriecounter">
      <motion.button
        whileHover={{ scale: 1.1 }} // Scale to 1.1 on hover
        className="relative"
      >
        <img
          className="w-[30rem] rounded-lg shadow-lg shadow-[#9cc034] h-[25rem]"
          src="https://www.eatingbirdfood.com/wp-content/uploads/2022/05/green-smoothie-bowl-hero.jpg"
          alt="planner"
        />
        <motion.div
          className="absolute inset-0 bg-black opacity-60 hover:opacity-70 flex items-center justify-center"
          whileHover={{ opacity: 0.5 }}// Opacity to 50% on hover
          whileTap={{ opacity: 0 }} // Hide text on tap
        >
          <p className="text-white text-4xl">Calorie Counter</p>
        </motion.div>
      </motion.button>
      </Link>
    </div>

          </div>
          <div className='flex flex-row gap-[20rem] mx-10'>
          <div className='rounded-xl'>
          <Link to="/showbmi">
      <motion.button
        whileHover={{ scale: 1.1 }} // Scale to 1.1 on hover
        className="relative"
      >
        <img
          className="w-[30rem] rounded-lg shadow-lg shadow-[#9cc034] h-[25rem]"
          src="data:image/jpeg;base64,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"
          alt="planner"
        />
        <motion.div
          className="absolute inset-0 bg-black opacity-60 hover:opacity-70 flex items-center justify-center"
          whileHover={{ opacity: 0.5 }} // Opacity to 50% on hover
          whileTap={{ opacity: 0 }} // Hide text on tap
        >
          <p className="text-white text-4xl">Show BMI</p>
        </motion.div>
      </motion.button>
      </Link>
    </div>
    <div className='rounded-xl'>
    <Link to="/workoutvideo">
      <motion.button
        whileHover={{ scale: 1.1 }} // Scale to 1.1 on hover
        className="relative"
      >
        <img
          className="w-[30rem] rounded-lg shadow-lg shadow-[#9cc034] h-[25rem]"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCBf0WrNq6FK_tewHJT4IMAfBSy2yo0pGxbw&s"
          alt="planner"
        />
        <motion.div
          className="absolute inset-0 bg-black opacity-60 hover:opacity-70 flex items-center justify-center"
          whileHover={{ opacity: 0.5 }} // Opacity to 50% on hover
          whileTap={{ opacity: 0 }} // Hide text on tap
        >
          <p className="text-white text-4xl">Workout Videos</p>
        </motion.div>
      </motion.button>
      </Link>
    </div>
    <div className='rounded-xl'>
    <Link to="/diet-calendar" >
      <motion.button
        whileHover={{ scale: 1.1 }} // Scale to 1.1 on hover
        className="relative"
      >
        <img
          className="w-[30rem] rounded-lg shadow-lg shadow-[#9cc034] h-[25rem]"
          src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ0BC40CpeSZzS8sV66LXleg78o_gtjHUjHAR6zRxaJWVJ0RSBE"
          alt="planner"
        />
        <motion.div
          className="absolute inset-0 bg-black opacity-60 hover:opacity-70 flex items-center justify-center"
          whileHover={{ opacity: 0.5 }} // Opacity to 50% on hover
          whileTap={{ opacity: 0 }} // Hide text on tap
        >
          <p className="text-white text-4xl">Diet Calendar</p>
        </motion.div>
      </motion.button>
      </Link>
    </div >

          </div>

      </div>




    </div>
    // </div>
  );
  
};

export default Dashboard;
