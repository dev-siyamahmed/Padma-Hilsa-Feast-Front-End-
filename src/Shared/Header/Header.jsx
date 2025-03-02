import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import ProfileSection from './ProfileSection';

// Define navigation items dynamically
const navItems = [
    { name: 'Nav', link: '#' },
    { name: 'Food', link: '#' },
    { name: 'Blog', link: '#' },
    { name: 'Contact', link: '#' }
];

// Reusable NavItem Component
const NavItem = ({ link, name, onClick }) => (
    <a
        href={link}
        onClick={onClick}
        className="text-gray-700 hover:text-blue-600 transition-colors"
    >
        {name}
    </a>
);

export default function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Toggle sidebar visibility
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <>
            <header className="flex items-center justify-between fixed left-0 right-0 md:px-4 lg:px-6 px-2 md:py-4 lg:py-4 py-3 bg-white text-gray-700 shadow-sm z-50">
                {/* Logo - Left Aligned */}
                <div className="font-bold text-lg md:text-xl text-blue-600 flex-shrink-0">
                    Foodie Haven
                </div>

                {/* Navigation Items - Center Aligned for large screens */}
                <nav className="hidden lg:flex items-center space-x-6">
                    {navItems.map((item, index) => (
                        <NavItem key={index} link={item.link} name={item.name} />
                    ))}
                </nav>

                {/* Right Section: Profile and Menu */}
                <div className="flex items-center space-x-4">
                    <div className="hidden lg:block">
                        <ProfileSection />
                    </div>

                    {/* Menu Icon for Small Screens */}
                    <div className="lg:hidden">
                        <FaBars className="text-2xl cursor-pointer" onClick={toggleSidebar} />
                    </div>
                </div>
            </header>

            {/* Sidebar Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={toggleSidebar}
            ></div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-20 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Close Button */}
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <span className="text-xl font-bold text-blue-600">Menu</span>
                    <FaTimes className="text-2xl cursor-pointer text-gray-600" onClick={toggleSidebar} />
                </div>

                {/* Sidebar Links (Dynamic) */}
                <nav className="flex flex-col space-y-4 px-4 py-6">
                    {navItems?.map((item, index) => (
                        <NavItem key={index} link={item.link} name={item.name} onClick={toggleSidebar} />
                    ))}
                </nav>
            </div>
        </>
    );
}
