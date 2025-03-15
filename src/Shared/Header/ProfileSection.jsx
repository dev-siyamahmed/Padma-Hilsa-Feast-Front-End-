import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import IconsMenu from "../IconsMenu/IconsMenu";

export default function ProfileSection() {
    const { user, logOut } = useAuth()
    console.log("user", user);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative flex items-center space-x-6" ref={menuRef}>
            {/* Profile Image or Login Button */}
            <IconsMenu />
            <div className=" w-10 ">
                {user ? (
                    <img
                        src={user?.photoURL || "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"}
                        alt="Profile"
                        className="w-10 h-10 rounded-full cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    />
                ) : (
                    <Link to="/login" className="text-gray-800">
                        <button className="" >
                            Login
                        </button>
                    </Link>
                )}
                {/* Dropdown Menu */}
                {isOpen && user && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md"
                    >
                        <ul className="py-2 text-gray-800">
                            <li className="px-4 py-2 font-semibold text-blue-600 bg-gray-100 rounded-md text-center">
                                {user?.displayName}
                            </li>
                            <Link to={'/dashboard'}><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li></Link>
                            <Link to={'/dashboard'}><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Dashboard</li></Link>
                            <li
                                className="px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer"
                                onClick={logOut}
                            >
                                Logout
                            </li>
                        </ul>

                    </motion.div>
                )}
            </div>


        </div>
    );
}
