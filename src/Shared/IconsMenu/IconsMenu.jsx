import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiOutlineBell, AiOutlineShoppingCart } from 'react-icons/ai';

const IconsMenu = ({ className = '' }) => {
    return (
        <div className={`flex items-center space-x-4 text-gray-600 ${className}`}>
            <Link to="/wishlist">
                <AiOutlineHeart className="w-6 h-6 cursor-pointer hover:text-blue-500 transition-colors" />
            </Link>
            <Link to="/notifications">
                <AiOutlineBell className="w-6 h-6 cursor-pointer hover:text-blue-500 transition-colors" />
            </Link>
            <Link to="/cart">
                <AiOutlineShoppingCart className="w-6 h-6 cursor-pointer hover:text-blue-500 transition-colors" />
            </Link>
        </div>
    );
};

export default IconsMenu;
