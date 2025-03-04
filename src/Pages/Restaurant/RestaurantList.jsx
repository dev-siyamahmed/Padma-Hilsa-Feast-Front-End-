import React from "react";
import { Link } from "react-router-dom";
import { restaurantsData } from "../../data/Restaurant";

export default function RestaurantList() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Find us in these cities and many more!</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {restaurantsData?.map((restaurant) => (
                    <Link
                        to={`/restaurant/${restaurant.id}`}
                        key={restaurant.id}
                        className="group"
                    >
                        <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
                            <div className="relative">
                                <img
                                    className="w-full h-52 object-cover group-hover:opacity-90 transition-opacity duration-300"
                                    src={restaurant.image}
                                    alt={restaurant.name}
                                />
                                <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-sm font-semibold text-yellow-600 shadow-md">
                                    ⭐ {restaurant.rating}
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 truncate">
                                    {restaurant.name}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1 truncate">{restaurant.cuisine}</p>
                                <div className="mt-2 flex items-center">
                                    <span className="text-sm text-gray-500">View Details</span>
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
        </div>
    );
}
