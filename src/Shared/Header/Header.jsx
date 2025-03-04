import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import ProfileSection from './ProfileSection';
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import IconsMenu from '../IconsMenu/IconsMenu';

// Define navigation items dynamically
const navItems = [
    { name: 'Nav', link: '#' },
    { name: 'Food', link: '/food/coffee' },
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
    const { user, logOut } = useAuth()
    console.log("user", user);
    // Toggle sidebar visibility
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <>
            <header className="flex items-center justify-between fixed left-0 right-0 md:px-4 lg:px-6 px-2 md:py-4 lg:py-4 py-2 bg-white text-gray-700 shadow-sm z-50">
                {/* Logo - Left Aligned */}
                <Link to={"/"}>
                    <div className="flex justify-center items-center gap-2">
                        <img className="lg:w-12 w-10 rounded-full" src={logo} alt="logo" />
                        <h2 className="text-2xl font-bold font-serif hidden sm:block">
                            Foodie Haven
                        </h2>
                    </div>
                </Link>

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
                    <div className="lg:hidden z-50">
                        <FaBars className="text-2xl cursor-pointer text-gray-700" onClick={toggleSidebar} />
                    </div>
                </div>
            </header>

            {/* Sidebar Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={toggleSidebar}
            ></div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Close Button */}
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <span className="text-xl font-bold text-blue-600">Menu</span>
                   <IconsMenu />
                    <FaTimes className="text-2xl cursor-pointer text-gray-600" onClick={toggleSidebar} />
                </div>

                {/* Sidebar Links (Dynamic) */}
                <nav className="flex flex-col space-y-4 px-4 py-6">
                    {navItems?.map((item, index) => (
                        <NavItem key={index} link={item.link} name={item.name} onClick={toggleSidebar} />
                    ))}

                </nav>
                <div className="mt-auto flex flex-col px-2 items-left pb-4 border-t pt-4">
                    {user ? (
                        <>
                            <img
                                src={user?.photoURL || "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"}
                                alt="User Profile"
                                className="w-12 h-12 rounded-full mb-2"
                            />
                            <span className="text-gray-700 mb-2">{user?.name}</span>
                            <button
                                onClick={() => { logOut(); toggleSidebar() }}
                                className="bg-red-500 text-white py-1 px-6 rounded hover:bg-red-600 transition">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="">
                            <button onClick={toggleSidebar}
                                className="bg-blue-500 text-white py-1 px-6 rounded hover:bg-blue-600 transition" >
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}
