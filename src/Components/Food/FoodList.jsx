import React, { useState } from "react";
import useRestaurantsList from "../../Hooks/useRestaurantsList";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

export default function FoodList() {
    const axiosPublic = useAxiosPublic();
    const [restaurantsList, refetch] = useRestaurantsList();
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [deletedFoodIds, setDeletedFoodIds] = useState([]);

    // ✅ Filter out deleted foods before setting selectedRestaurant
    const handleCheckFoods = (restaurant) => {
        const updatedFoods = restaurant.foods.filter(food => !deletedFoodIds.includes(food._id));
        setSelectedRestaurant({ ...restaurant, foods: updatedFoods });
    };

    // ✅ Handle food deletion and update UI instantly
    const handleDeleteFood = async (foodId) => {
        try {
            const response = await axiosPublic.delete(`/admin/foods/delete/${foodId}`);

            if (response?.data?.success) {
                toast.success("Food deleted successfully!");

                setDeletedFoodIds((prev) => [...prev, foodId]);

                setSelectedRestaurant((prev) => ({
                    ...prev,
                    foods: prev.foods.filter((food) => food._id !== foodId),
                }));

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
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🍽️ Restaurants & Their Foods</h2>

            <div className="flex justify-center mb-6">
                <button
                    onClick={refetch}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                    🔄 Refresh Data
                </button>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="w-full min-w-[600px]">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-lg">📍 Restaurant Name</th>
                            <th className="px-6 py-3 text-left text-lg  md:table-cell">🏙️ Location</th>
                            <th className="px-6 py-3 text-left text-lg">🍔 Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurantsList?.map((restaurant, index) => (
                            <tr key={restaurant._id} className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
                                <td className="px-6 py-4 text-lg font-semibold text-gray-800">{restaurant.restaurantName}</td>
                                <td className="px-6 py-4 text-gray-600  md:table-cell">{restaurant.location}</td>
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl sm:max-w-md md:max-w-lg lg:max-w-2xl h-[80vh] flex flex-col">
            
            {/* ✅ Modal Header - Fixed at Top */}
            <div className="flex justify-between items-center pb-3 border-b mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                    {selectedRestaurant.restaurantName} - Foods
                </h3>
                <button 
                    onClick={() => setSelectedRestaurant(null)}
                    className="text-red-500 hover:text-red-700 text-2xl"
                >
                    ✖
                </button>
            </div>

            {/* ✅ Scrollable Content for Small Screens */}
            <div className="flex-1 overflow-y-auto space-y-4 px-2">
                {selectedRestaurant?.foods?.length > 0 ? (
                    selectedRestaurant?.foods?.map((food) => (
                        <div key={food?._id} className="p-4 border rounded-lg flex flex-col sm:flex-row items-center space-x-4 bg-gray-50 shadow-md">
                            
                            {/* ✅ Food Image */}
                            {food?.imageUrl && (
                                <img src={food?.imageUrl} alt={food?.name} className="w-16 h-16 rounded-md object-cover mb-3 sm:mb-0" />
                            )}

                            <div className="flex-1 text-center sm:text-left">
                                <h4 className="text-lg font-semibold text-gray-800">{food.name}</h4>

                                {/* ✅ Show 50 characters of description */}
                                <p className="text-gray-600 text-sm">
                                    <strong>Details : </strong>
                                    {food.description?.length > 80
                                        ? `${food?.description.substring(0, 80)}...`
                                        : food?.description}
                                </p>

                                <p className="text-gray-700 text-sm"><strong>Category : </strong> {food?.category}</p>

                                {/* ✅ Display Stock Information */}
                                <p className="text-gray-700 text-sm">
                                    <strong>Price:</strong> BDT {food?.price} {food?.discount ? `(Discount: ${food?.discount}%)` : ""}
                                </p>

                                <p className={`text-sm font-semibold ${food?.stock === 0 ? "text-red-600" : "text-green-600"}`}>
                                    {food?.stock === 0 ? "❌ Out of Stock" : `✅ In Stock (${food?.stock} available)`}
                                </p>

                                {food?.rating && (
                                    <p className="text-yellow-500 text-sm font-semibold">⭐ {food?.rating}/5 Rating</p>
                                )}
                            </div>

                            {/* ✅ Edit & Delete Buttons */}
                            <div className="flex space-x-3 mt-3 sm:mt-0">
                                {/* Update Icon */}
                                

                                {/* Delete Icon */}
                                <button 
                                    onClick={() => handleDeleteFood(food._id)}
                                    className="text-red-500 hover:text-red-700 transition"
                                >
                                    <AiOutlineDelete size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No foods available</p>
                )}
            </div>

            {/* ✅ Close Button for Mobile */}
            <div className="mt-4 text-center">
                <button 
                    onClick={() => setSelectedRestaurant(null)}
                    className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition w-full sm:w-auto"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
)}

        </div>
    );
}
