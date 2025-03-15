import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiOutlineBell, AiOutlineShoppingCart } from 'react-icons/ai';
import useCartList from '../../Hooks/useCartList';

const IconsMenu = ({ className = '' }) => {
    const [cartList] = useCartList();
    const cartItemCount = cartList?.reduce((total, item) => total + item.quantity, 0); // Calculate total cart items

    return (
        <div className={`flex items-center space-x-6 text-gray-600 ${className}`}>
            {/* Wishlist Icon */}
            <Link to="/wishlist" className="relative">
                <AiOutlineHeart className="w-6 h-6 cursor-pointer hover:text-blue-500 transition-colors" />
            </Link>

            {/* Notification Icon */}
            <Link to="/notifications" className="relative">
                <AiOutlineBell className="w-6 h-6 cursor-pointer hover:text-blue-500 transition-colors" />
            </Link>

            {/* Cart Icon with Badge */}
            <Link to="/cart" className="relative">
                <AiOutlineShoppingCart className="w-6 h-6 cursor-pointer hover:text-blue-500 transition-colors" />
                
                {/* Cart Badge - Only show if cart has items */}
                {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                        {cartItemCount}
                    </span>
                )}
            </Link>
        </div>
    );
};

export default IconsMenu;
