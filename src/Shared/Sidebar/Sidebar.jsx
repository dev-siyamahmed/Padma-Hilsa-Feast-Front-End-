import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { MdMenu, MdExpandMore, MdExpandLess } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineRobot, AiOutlineCode, AiOutlineBgColors, AiOutlineSound, AiOutlineDollar, AiOutlineCoffee, AiOutlineTool } from "react-icons/ai";
import { FaRobot, FaPenFancy, FaPaintBrush, FaRegClock, FaBalanceScale, FaKey, FaLock, FaQrcode, FaIdBadge, FaCalendarAlt, FaCode, FaPalette, FaFillDrip, FaGuitar, FaMusic, FaCalculator, FaPiggyBank, FaGamepad, FaMagic, FaBook } from "react-icons/fa";

import { IoGameControllerOutline } from "react-icons/io5"
import { SiGitignoredotio } from "react-icons/si";
import ProfileSection from "../Header/ProfileSection";

export default function Sidebar() {
    const [open, setOpen] = useState(true);
    const [expandedSections, setExpandedSections] = useState({});
    const { pathname } = useLocation();

    const toggleSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const Nav_animation = {
        open: { width: "18rem", transition: { damping: 40 } },
        closed: { width: "0rem", transition: { damping: 40 } },
    };



    const categories = [
        {
            name: "Food",
            icon: <AiOutlineRobot size={20} />,
            items: [
                { name: "Coffee", icon: <FaRobot size={18} />, route: "/food/coffee" },
                { name: "Pizza", icon: <FaPenFancy size={18} />, route: "/food/pizza" },
                { name: "Burger", icon: <FaPaintBrush size={18} />, route: "/food/burger" },
            ],
        },
       
    ];


    return (
        <div>
            <motion.div
                variants={Nav_animation}
                initial={{ width: "4rem" }}
                animate={open ? "open" : "closed"}
                className="bg-gray-50 text-gray-700 shadow-md md:max-w-[16rem]  max-w-[16rem] overflow-hidden h-screen fixed z-[999] lg:relative "
            >
                <div className="flex items-center justify-between p-5 border-b border-gray-300">
                    <Link to="/" className="text-xl font-semibold text-blue-600">
                    Padma Hilsa Feast
                    </Link>
                    <IoIosArrowBack
                        onClick={() => setOpen(!open)}
                        className=" lg:hidden cursor-pointer text-gray-500"
                        size={24}
                    />
                </div>

                <div className="flex flex-col h-full overflow-y-auto p-4">
                    {categories.map((category) => (
                        <div key={category.name} className="mb-4">
                            <div
                                className="flex items-center justify-between cursor-pointer p-2 md:p-3 rounded hover:bg-gray-200"
                                onClick={() => toggleSection(category.name)}
                            >
                                <div className="flex items-center gap-2">
                                    {category.icon}
                                    <span className="font-medium text-[18px] md:text-xl ">{category.name}</span>
                                </div>
                                {expandedSections[category.name] ? (
                                    <MdExpandLess size={20} />
                                ) : (
                                    <MdExpandMore size={20} />
                                )}
                            </div>
                            <motion.ul
                                initial={false}
                                animate={expandedSections[category.name] ? "open" : "closed"}
                                variants={{
                                    open: { opacity: 1, height: "auto" },
                                    closed: { opacity: 0, height: 0 },
                                }}
                                transition={{ duration: 0.3 }}
                                className="pl-4 overflow-hidden"
                            >
                                {category.items.map((item) => (
                                    <li key={item.name} className="py-1">
                                        <Link
                                            to={item.route}
                                            className={`flex items-center gap-2 p-2 rounded hover:bg-blue-500 hover:text-white ${pathname === item.route ? "bg-blue-500 text-white" : ""
                                                }`}
                                        >
                                            {item.icon}
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </motion.ul>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Sidebar toggle for small devices */}
            <div className="flex justify-between items-center py-1 px-3 md:py-2 md:px-3">
                <div className=" text-gray-800 lg:hidden" onClick={() => setOpen(true)}>
                    <MdMenu size={25} />
                </div>
                <div className="relative w-10 h-10 lg:hidden mr-2 md:mr-6 ">
                    <ProfileSection />
                </div>
            </div>
        </div>
    );
}
