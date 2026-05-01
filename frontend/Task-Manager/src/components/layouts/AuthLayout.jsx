import React from 'react'
import teamTaskBg from "../../assets/Images/teamTaskBg.svg"
import logo from "../../assets/logo.svg"

const AuthLayout = ({ children }) => {
  return (
    <div className="flex relative">
      {/* Left Content */}
      <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 z-10'>
        <div className="flex items-center gap-3 mb-8">
          <img src={logo} alt="Team Task Manager Logo" className="w-10 h-10" />
          <h2 className='text-2xl font-bold text-cyan-600'>Team Task Manager</h2>
        </div>
        {children}
      </div>

      {/* Right Fixed Image */}
      <div className="hidden md:block fixed top-0 right-0 w-[40vw] h-screen">
        <img 
          src={teamTaskBg} 
          className='w-full h-full object-cover' 
          alt="Team Task Manager Background" 
        />
      </div>
    </div>
  );
};

export default AuthLayout;
