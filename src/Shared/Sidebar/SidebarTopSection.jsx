import React from "react";
import { AiOutlineMenu } from "react-icons/ai";

const SidebarTopSection = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
    return (
        <header className="sticky top-0 z-9999 flex items-center justify-between bg-white shadow-md py-2 ">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 focus:outline-none lg:hidden px-2 "
            >
                <AiOutlineMenu size={24} />
            </button>

            {/* Profile Picture */}
            <div className="flex items-center gap-4 ml-auto px-2">
                <img
                    src="https://i.pravatar.cc/40"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                />
            </div>
        </header>
    );
};

export default SidebarTopSection;
