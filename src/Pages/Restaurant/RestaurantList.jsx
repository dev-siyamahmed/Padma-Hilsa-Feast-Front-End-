import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaMapMarkerAlt, FaStar } from "react-icons/fa"; // Using FontAwesome Icons for location and rating
import useRestaurantsList from "../../Hooks/useRestaurantsList";

export default function RestaurantList({ searchQuery }) {
    const [restaurantsList] = useRestaurantsList();
    console.log("restaurantsList", restaurantsList);

    const filteredRestaurants = restaurantsList?.filter(restaurant => {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();
        return (
            restaurant?.restaurantName.toLowerCase().includes(lowerCaseSearchQuery) ||
            restaurant?.location.toLowerCase().includes(lowerCaseSearchQuery)
        );
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Find us in these cities and many more!
            </h2>
            <div>
                {filteredRestaurants?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredRestaurants.map((restaurant) => (
                            <Link
                                to={`/restaurant/${restaurant?._id}`}
                                key={restaurant._id}
                                className="group"
                            >
                                <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
                                    <div className="relative">
                                        <img
                                            className="w-full h-52 object-cover group-hover:opacity-90 transition-opacity duration-300"
                                            src={restaurant?.image}
                                            alt={restaurant?.restaurantName}
                                        />
                                        <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-sm font-semibold text-yellow-600 shadow-md">
                                            <FaStar className="inline mr-1" /> {restaurant?.rating}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-800 truncate">
                                            {restaurant?.restaurantName}
                                        </h3>
                                        <div className="flex items-center text-sm text-gray-600 mt-1">
                                            <FaMapMarkerAlt className="mr-2 text-red-600" />
                                            {restaurant?.location}
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1 truncate">
                                            {restaurant?.cuisine}
                                        </p>
                                        <div className="mt-2 flex items-center text-sm text-gray-500">
                                            <span>View Details</span>
                                            <svg
                                                className="ml-2 w-4 h-4 text-yellow-500 transition-transform duration-300 group-hover:translate-x-1"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 5l7 7-7 7"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center text-red-500 py-10 mx-auto w-full h-full">
                        <FaExclamationTriangle className="text-4xl mr-4" />
                        <span className="text-xl font-semibold">No restaurants found matching your search.</span>
                    </div>
                )}
            </div>
        </div>
    );
}
