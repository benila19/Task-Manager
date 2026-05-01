import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import SideMenu from './SideMenu';
import logo from '../../assets/logo.svg';

const Navbar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div className="flex items-center gap-5 bg-white border border-gray-300/50 backdrop-blur-[5px] py-4 px-7 sticky top-0 z-30">
        <button 
        className="block lg:hidden text-black" 
        onClick={() =>{
            setOpenSideMenu(!openSideMenu);
        }}
        >
            {openSideMenu ? (
                <HiOutlineX className="text-2xl" />
            ) : (
                <HiOutlineMenu className="text-2xl" />
            )}
        </button>

        <div className="flex items-center gap-3">
          <img src={logo} alt="Team Task Manager Logo" className="w-8 h-8" />
          <h2 className="text-lg font-bold text-cyan-600">Team Task Manager</h2>
        </div>

        {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
            <SideMenu activeMenu = {activeMenu} />
        </div>
        )}
    </div>
  )
}

export default Navbar