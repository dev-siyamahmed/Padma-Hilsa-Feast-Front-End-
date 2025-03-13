import React, { useState } from "react";
import useRestaurantsList from "../../Hooks/useRestaurantsList";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

export default function FoodList() {
    const axiosPublic = useAxiosPublic();
    const [restaurantsList, refetch] = useRestaurantsList();
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [deletedFoodIds, setDeletedFoodIds] = useState([]); // ✅ Track deleted food IDs

    // ✅ Handle Checking Foods
    const handleCheckFoods = (restaurant) => {
        // Filter out previously deleted foods before setting selectedRestaurant
        const updatedFoods = restaurant.foods.filter(food => !deletedFoodIds.includes(food._id));
        setSelectedRestaurant({ ...restaurant, foods: updatedFoods });
    };

    // ✅ Handle Deleting Food
    const handleDeleteFood = async (foodId) => {
        try {
            // API Call to delete food
            const response = await axiosPublic.delete(`/admin/foods/delete/${foodId}`);

            if (response?.data?.success) {
                toast.success("Food deleted successfully!");

                // ✅ Store deleted food ID
                setDeletedFoodIds((prev) => [...prev, foodId]);

                // ✅ Remove deleted food from UI without refetching
                setSelectedRestaurant((prev) => ({
                    ...prev,
                    foods: prev.foods.filter((food) => food._id !== foodId)
                }));

                // ✅ Ensure refetch exists before calling
                if (typeof refetch === "function") {
                    refetch();
                }
            } else {
                toast.error("Failed to delete food.");
            }
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🍽️ Restaurants & Their Foods</h2>

            <div className="flex justify-center mb-6">
                <button 
                    onClick={refetch} 
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                    🔄 Refresh Data
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-lg">📍 Restaurant Name</th>
                            <th className="px-6 py-3 text-left text-lg">🏙️ Location</th>
                            <th className="px-6 py-3 text-left text-lg">🍔 Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurantsList?.map((restaurant, index) => (
                            <tr key={restaurant._id} className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
                                <td className="px-6 py-4 text-lg font-semibold text-gray-800">{restaurant.restaurantName}</td>
                                <td className="px-6 py-4 text-gray-600">{restaurant.location}</td>
                                <td className="px-6 py-4">
                                    <button 
                                        onClick={() => handleCheckFoods(restaurant)}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
                                    >
                                        🍽️ Check Foods
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Food Details Modal */}
            {selectedRestaurant && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg mx-auto w-full sm:w-2/4 max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold text-gray-800">{selectedRestaurant.restaurantName} - Foods</h3>
                            <button 
                                onClick={() => setSelectedRestaurant(null)}
                                className="text-red-500 hover:text-red-700 text-2xl"
                            >
                                ✖
                            </button>
                        </div>

                        {selectedRestaurant.foods?.length > 0 ? (
                            <ul className="space-y-4">
                                {selectedRestaurant.foods.map((food, index) => (
                                    <li key={index} className="p-4 border border-gray-300 rounded-lg flex items-center space-x-4 bg-gray-100 shadow">
                                        {food.imageUrl && (
                                            <img src={food.imageUrl} alt={food.name} className="w-16 h-16 rounded-md object-cover" />
                                        )}
                                        <div className="flex-1">
                                            <h4 className="text-lg font-semibold text-gray-800">{food.name}</h4>
                                            <p className="text-gray-600 text-sm">{food.description}</p>
                                            <p className="text-gray-700 text-sm"><strong>Category:</strong> {food.category}</p>
                                            <p className="text-gray-700 text-sm">
                                                <strong>Price:</strong> ${food.price} {food.discount ? `(Discount: ${food.discount}%)` : ""}
                                            </p>
                                            <p className={`text-sm font-semibold ${food.isAvailable ? "text-green-600" : "text-red-600"}`}>
                                                {food.isAvailable ? "✅ Available" : "❌ Out of Stock"}
                                            </p>
                                            {food.rating && (
                                                <p className="text-yellow-500 text-sm font-semibold">⭐ {food.rating}/5 Rating</p>
                                            )}
                                        </div>

                                        {/* Edit & Delete Buttons */}
                                        <div className="flex space-x-3">
                                            {/* Update Icon */}
                                            <button className="text-blue-500 hover:text-blue-700 transition">
                                                <AiOutlineEdit size={20} />
                                            </button>

                                            {/* Delete Icon */}
                                            <button 
                                                onClick={() => handleDeleteFood(food._id)}
                                                className="text-red-500 hover:text-red-700 transition"
                                            >
                                                <AiOutlineDelete size={20} />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 text-center">No foods available</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
