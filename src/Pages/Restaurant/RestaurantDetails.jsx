import React from "react";
import { useParams, Link } from "react-router-dom";
import { restaurantsData } from "../../data/Restaurant";

export default function RestaurantDetails() {
    const { id } = useParams();
    const restaurant = restaurantsData.find((r) => r.id === parseInt(id));

    if (!restaurant) {
        return <div className="text-center text-red-500">Restaurant not found!</div>;
    }

    return (
        <div className="py-8 px-3">
            <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
                ← Back to Restaurants
            </Link>
            <h2 className="text-3xl font-bold mb-4">{restaurant.name}</h2>
            <p className="text-gray-600 mb-2">Cuisine: {restaurant.cuisine}</p>
            <p className="text-yellow-500 mb-4">⭐ {restaurant.rating}</p>

            <h3 className="text-2xl font-semibold mb-4">Available Foods:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {restaurant.foods.map((food) => (
                    <div
                        key={food.id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <img
                            className="w-full h-32 object-cover"
                            src={food.image}
                            alt={food.name}
                        />
                        <div className="p-4">
                            <h4 className="text-lg font-bold">{food.name}</h4>
                            <p className="text-gray-600">${food.price.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
