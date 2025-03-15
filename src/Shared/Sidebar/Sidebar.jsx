import { useState } from "react";
import { motion } from "framer-motion";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AiOutlineCoffee, AiOutlineClose } from "react-icons/ai";
import SidebarTopSection from "./SidebarTopSection";
import profile from "../../assets/icon/profile.png"
import order from "../../assets/icon/allOrders.png"
import food from "../../assets/icon/allProduct.png"
import restaurant from "../../assets/icon/branch.png"
import restaurantList from "../../assets/icon/management.png"
import useCurrentUser from "../../Hooks/useCurrentUser";


export default function Sidebar() {
    const { currentUser } = useCurrentUser()
    const role = currentUser?.data?.role;
    const [open, setOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { pathname } = useLocation();

    // Sidebar menu items
    const categories = [
        { name: "Profile", icon: <img src={profile} alt="Profile" className="w-7 h-7 rounded-full" />, route: "/dashboard" },
        role === "admin" && { name: "Food List", icon: <img src={food} alt="Food List" className="w-7 h-7 rounded-full" />, route: "/dashboard/food" },
        role === "admin" && { name: "Order Manage", icon: <img src={order} alt="Order" className="w-7 h-7 rounded-full" />, route: "/dashboard/admin/orders" },
        role === "user" && { name: "Order List", icon: <img src={order} alt="Order List" className="w-7 h-7 rounded-full" />, route: "/dashboard/user/orders" },
        role === "admin" && { name: "Create Restaurant", icon: <img src={restaurant} alt="Create Restaurant" className="w-7 h-7 rounded-full" />, route: "/dashboard/create/restaurant" },
        role === "admin" && { name: "Restaurant List", icon: <img src={restaurantList} alt="Restaurant List" className="w-7 h-7 rounded-full" />, route: "/dashboard/restaurant/list" },
    ].filter(Boolean); // Remove false/null values


    return (
        <div className="flex h-screen bg-gray-100">
            {/* ✅ Sidebar (Fixed & Responsive) */}

            <motion.div
                initial={{ x: -250 }}
                animate={{ x: isMobileMenuOpen ? 0 : 0 }}
                transition={{ duration: 0.3 }}
                className={`bg-white shadow-md text-gray-700 fixed top-0 left-0 w-60 h-full z-50 
                lg:static lg:w-60 lg:translate-x-0 ${isMobileMenuOpen ? "block" : "hidden lg:block"}`}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-300">
                    <Link to="/" className="text-xl font-semibold text-blue-600">
                        {open ? "Foodie Haven" : "FDH"}
                    </Link>
                    {/* Close button (only for mobile) */}
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="lg:hidden text-gray-600"
                    >
                        <AiOutlineClose size={22} />
                    </button>
                </div>

                {/* ✅ Sidebar Menu Items */}
                <div className="flex flex-col p-4">
                    {categories?.map((category) => (
                        <Link
                            key={category?.name}
                            to={category?.route}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-2 p-3 rounded hover:bg-blue-500 hover:text-white transition mb-2 ${pathname === category?.route ? "bg-blue-500 text-white" : ""
                                }`}
                        >
                            {category?.icon}
                            <span className={`font-medium ${open ? "text-md" : "text-sm"}`}>
                                {open && category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </motion.div>

            {/* ✅ Overlay (for mobile - clicking outside closes the menu) */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}

            {/* ✅ Main Content (Scrollable) */}
            <div className="flex-1 h-screen overflow-y-auto lg:px-2">
                <SidebarTopSection
                    isMobileMenuOpen={isMobileMenuOpen}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                />
                <div className="">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
