import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { foodCategories } from "../../data/Category";

export default function CategoryList() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", ...foodCategories.map((c) => c.category)];

    const filteredFoods =
        selectedCategory === "All"
            ? foodCategories.flatMap((c) => c.items)
            : foodCategories.find((c) => c.category === selectedCategory)?.items || [];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Popular Foods</h2>

            {/* Category Buttons */}
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                {categories?.map((category, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors duration-300 whitespace-nowrap 
                            ${selectedCategory === category
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Food Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {filteredFoods?.slice(0, 8).map((food, id) => (
                    <Link
                        to={`/category/${encodeURIComponent(selectedCategory.toLowerCase())}`}
                        key={food?.id}
                    >
                        <motion.div
                            className="p-4 border rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:scale-105"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="relative">
                                <img
                                    src={food?.image}
                                    alt={food.name}
                                    className="rounded-lg w-full h-48 object-cover"
                                />
                                <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-semibold text-yellow-600 shadow-sm">
                                    ⭐ {food?.rating}
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold mt-3 text-gray-800 truncate">
                                {food?.name}
                            </h3>
                            <div className="flex items-center mt-1 text-yellow-500">
                                <FaStar className="mr-1" />
                                <span className="text-sm">{food.rating}</span>
                            </div>
                            <button
                                className="mt-3 px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300">
                                View Details
                            </button>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
