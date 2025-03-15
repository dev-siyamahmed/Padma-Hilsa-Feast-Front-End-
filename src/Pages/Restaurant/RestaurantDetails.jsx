import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useRestaurantsList from "../../Hooks/useRestaurantsList";
import useCurrentUser from "../../Hooks/useCurrentUser"; // Custom hook for user data
import axios from "axios";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-hot-toast";

export default function RestaurantDetails() {
    const axiosPublic = useAxiosPublic();
    const { currentUser } = useCurrentUser();
    const { id } = useParams();
    const [searchQuery, setSearchQuery] = useState(""); // State for food search query
    const [categoryFilter, setCategoryFilter] = useState(""); // State for category filter
    const [priceRange, setPriceRange] = useState([0, 100]); // State for price range filter

    const [restaurantsList] = useRestaurantsList();
    const restaurant = restaurantsList.find((r) => r._id === id);

    const maxPrice = restaurant?.foods?.reduce((max, food) => Math.max(max, food.price), 100);
    const categories = [...new Set(restaurant?.foods?.map(food => food.category))];

    useEffect(() => {
        setPriceRange([0, maxPrice]);
    }, [maxPrice]);

    const filteredFoods = restaurant?.foods?.filter((food) => {
        const isNameMatch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
        const isCategoryMatch = categoryFilter ? food.category === categoryFilter : true;
        const isPriceInRange = food.price >= priceRange[0] && food.price <= priceRange[1];
        return isNameMatch && isCategoryMatch && isPriceInRange;
    });



    const addToCart = async (foodId) => {
        if (!currentUser?.data?.email) {
            toast.error("You need to log in first!");
            return;
        }

        try {
            const response = await axiosPublic.post("/user/add-to-cart", {
                foodId,
                quantity: 1, // Default quantity 1
                email: currentUser?.data?.email,
            });

            console.log(response);

            if (response.data.success) {
                toast.success("Item added to cart successfully!");
            }
        } catch (error) {
            console.error("Error adding item to cart!", error);
            toast.error("Failed to add item to cart, please try again.");
        }
    };



    if (!restaurant) {
        return <div className="text-center text-red-500">Restaurant not found!</div>;
    }

    return (
        <div className="lg:py-8 px-3">
            <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
                ← Back to Restaurants
            </Link>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between lg:mb-4 mb-2 space-y-2 lg:space-y-0">
                <div className="max-w-xl flex items-center gap-2 ">
                    <p className="text-gray-600 mb-2">Cuisine: {restaurant.cuisine}</p>
                    <p className="text-yellow-500 mb-4">⭐ {restaurant.rating}</p>
                </div>

                <div className="flex items-center space-x-1 bg-white p-2  w-full max-w-xs lg:max-w-xs  ">
                    <input
                        type="search"
                        className="w-full p-2  rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        placeholder="Search for food items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:gap-10 md:items-center justify-between mb-8 space-y-6 lg:space-y-0">
                <div className="flex flex-col space-y-2 w-full lg:w-1/4">
                    <label className="font-semibold text-gray-700">Category</label>
                    <select
                        className="p-2 border border-gray-300 rounded-md"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col space-y-2 w-full lg:w-1/4">
                    <label className="font-semibold text-gray-700">Price Range</label>
                    <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                        className="mt-2 w-full"
                    />
                    <div className="text-sm text-gray-500 mt-2">
                        ${priceRange[0]} - ${priceRange[1]}
                    </div>
                </div>
            </div>

            <h3 className="text-2xl font-semibold mb-4">Available Foods:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredFoods?.length > 0 ? (
                    filteredFoods?.map((food) => (
                        <div
                            key={food?._id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <img
                                className="w-full h-32 object-cover"
                                src={food?.imageUrl}
                                alt={food?.name}
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-bold">{food?.name}</h2>
                                <h4 className="text-sm text-gray-600">
                                    {food?.description?.length > 80
                                        ? `${food?.description?.substring(0, 70)}...`
                                        : food?.description}
                                </h4>

                                <p className="text-gray-600">BDT  {food?.price?.toFixed(2)}</p>

                                <button
                                    onClick={() => addToCart(food?._id)}
                                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center col-span-full pb-10 ">
                        <p className="text-xl font-semibold text-gray-700">No available food items at this time.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
