import React, { useState } from 'react';
import { FaSearch, FaBars, FaChevronDown } from 'react-icons/fa';
import ProfileSection from './ProfileSection';

export default function Header() {


    return (
        <header className="flex fixed left-0 right-0 items-center justify-between px-6 py-4 bg-white text-gray-700 shadow-sm">

            {/* Search bar */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-md  ml-[18rem] ">
                <FaSearch className="text-gray-400 mr-3" />
                <input
                    type="search"
                    placeholder="Search..."
                    className="bg-transparent outline-none text-gray-900 w-full"
                />
            </div>

            {/* Right section: Profile and Menu */}
            <div className="flex items-center space-x-4">
                {/* Profile section */}
                <ProfileSection />

                {/* Menu icon (visible on small screens) */}
                <div className="md:hidden">
                    <FaBars className="text-2xl cursor-pointer" />
                </div>
            </div>
        </header>
    );
}
