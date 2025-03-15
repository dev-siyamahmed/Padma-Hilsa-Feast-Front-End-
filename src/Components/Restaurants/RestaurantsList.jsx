import React, { useState } from "react";
import useRestaurantsList from "../../Hooks/useRestaurantsList";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-hot-toast";

export default function RestaurantsList() {
    const axiosPublic = useAxiosPublic();
    const [restaurantsList, refetch] = useRestaurantsList();
    console.log(restaurantsList);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [foodData, setFoodData] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        imageUrl: "",
        stock: "",
        discount: "",
    });

    // Open Modal
    const openModal = (restaurant) => {
        setSelectedRestaurant(restaurant);
        setShowModal(true);
    };

    // Close Modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedRestaurant(null);
        resetFoodData();
    };

    // Reset Food Data
    const resetFoodData = () => {
        setFoodData({
            name: "",
            price: "",
            description: "",
            category: "",
            imageUrl: "",
            stock: "",
            discount: "",
        });
    };

    // Handle Input Change
    const handleChange = (e) => {
        let { name, value } = e.target;
        if ((name === "price" || name === "stock" || name === "discount") && value < 0) {
            toast.error(`${name} cannot be negative!`);
            return;
        }
        setFoodData((prev) => ({ ...prev, [name]: value }));
    };



    const handleAddFood = async () => {
        if (!foodData.name.trim() || !foodData.price || !foodData.stock) {
            toast.error("Please fill in required fields!");
            return;
        }

        const newFood = {
            ...foodData,
            price: Number(foodData.price),
            stock: Number(foodData.stock),
            discount: Number(foodData.discount) || 0,
            restaurantId: selectedRestaurant._id,
        };

        try {
            const response = await axiosPublic.post(
                `/admin/restaurants/${selectedRestaurant._id}/foods/create`,
                { foods: [newFood] }
            );

            if (response.data.success) {
                toast.success("Food added successfully!");

                // ✅ 
                setSelectedRestaurant(prev => ({
                    ...prev,
                    foods: [...prev.foods, response.data.newFood] // ✅
                }));

                // ✅ 
                if (typeof refetch === "function") {
                    refetch();
                }

                closeModal();
            } else {
                toast.error("Failed to add food.");
            }
        } catch (error) {
            console.error("Error adding food:", error);
            toast.error("Something went wrong!");
        }
    };


    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Restaurants List</h2>

            {/* ✅ Table with Scrollable Feature for Mobile */}
            <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="w-full bg-white rounded-lg overflow-hidden min-w-[600px]">
                    <thead className="bg-gray-200 text-gray-800 font-bold">
                        <tr className="text-left">
                            <th className="py-3 px-4">Image</th>
                            <th className="py-3 px-4">Restaurant Name</th>
                            <th className="py-3 px-4">Location</th>
                            <th className="py-3 px-4">Total Foods</th>
                            <th className="py-3 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurantsList?.map((restaurant) => (
                            <tr key={restaurant._id} className="border-b hover:bg-gray-100 transition">
                                <td className="py-3 px-2">
                                    <img
                                        src={restaurant?.image || "https://via.placeholder.com/50"}
                                        alt={restaurant.restaurantName}
                                        className="w-12 h-12 rounded-md object-cover"
                                    />
                                </td>
                                <td className="py-3 px-4">{restaurant.restaurantName}</td>
                                <td className="py-3 px-4">{restaurant.location}</td>
                                <td className="py-3 px-4">{restaurant.foods?.length || 0}</td>
                                <td className="py-3 px-4">
                                    <button
                                        onClick={() => openModal(restaurant)}
                                        className="bg-blue-500 text-white px-4 py-1 lg:py-2 rounded-md hover:bg-blue-600 transition"
                                    >
                                        Add Food
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md p-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                        <h2 className="text-2xl font-semibold mb-4 text-center">
                            Add Food to {selectedRestaurant?.restaurantName}
                        </h2>

                        {/* ✅ Grid Layout: lg & md → 2 columns, sm → 1 column */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Food Name */}
                            <div>
                                <label className="text-gray-700 font-medium">Food Name</label>
                                <input type="text" name="name" placeholder="Food Name" value={foodData.name} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="text-gray-700 font-medium">Price (BDT)</label>
                                <input type="number" name="price" placeholder="Price" value={foodData.price} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="text-gray-700 font-medium">Description</label>
                                <textarea  type="text" name="description" placeholder="Short description" value={foodData.description} onChange={handleChange} className="w-full border rounded-md px-3 py-2 min-h-20 " />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="text-gray-700 font-medium">Category</label>
                                <input type="text" name="category" placeholder="Category" value={foodData.category} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="text-gray-700 font-medium">Image URL</label>
                                <input type="text" name="imageUrl" placeholder="Image URL" value={foodData.imageUrl} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />
                            </div>

                            {/* Stock */}
                            <div>
                                <label className="text-gray-700 font-medium">Stock</label>
                                <input type="number" name="stock" placeholder="Stock" value={foodData.stock} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required />
                            </div>

                            {/* Discount */}
                            <div>
                                <label className="text-gray-700 font-medium">Discount (%)</label>
                                <input type="number" name="discount" placeholder="Discount" value={foodData.discount} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />
                            </div>
                        </div>

                        {/* ✅ Buttons */}
                        <div className="flex justify-end mt-6 space-x-4">
                            <button onClick={closeModal} className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition">Cancel</button>
                            <button onClick={handleAddFood} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">Add</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
