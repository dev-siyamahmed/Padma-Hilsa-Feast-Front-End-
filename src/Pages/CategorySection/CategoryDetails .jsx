import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { foodCategories } from "../../data/Category";

export default function CategoryDetails() {
    const { categoryName } = useParams();
    const decodedCategoryName = decodeURIComponent(categoryName.toLowerCase());

    let itemsToShow = [];
    let categoryTitle = "";

    if (decodedCategoryName === "all") {
        // Show all items if "All" is selected
        itemsToShow = foodCategories.flatMap((c) => c.items);
        categoryTitle = "All Categories";
    } else {
        // Find specific category
        const category = foodCategories.find((c) => c.category.toLowerCase() === decodedCategoryName);
        if (category) {
            itemsToShow = category.items;
            categoryTitle = category.category;
        } else {
            return <div className="text-center text-red-500">Category not found!</div>;
        }
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
                ← Back to Categories
            </Link>
            <h2 className="text-2xl font-bold mb-4">{categoryTitle} Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {itemsToShow.map((item) => (
                    <motion.div
                        key={item.id}
                        className="p-4 border rounded-lg shadow-lg bg-gray-100 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            width={300}
                            height={200}
                            className="rounded-lg w-full h-40 object-cover"
                        />
                        <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
                        <div className="flex items-center mt-1 text-yellow-500">
                            <FaStar className="mr-1" />
                            {item.rating}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
