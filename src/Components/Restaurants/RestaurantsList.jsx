import React, { useState } from "react";
import useRestaurantsList from "../../Hooks/useRestaurantsList";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-hot-toast";

export default function RestaurantsList() {
    const axiosPublic = useAxiosPublic();
    const [restaurantsList , refetch ] = useRestaurantsList();
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

    // Modal Open Function
    const openModal = (restaurant) => {
        setSelectedRestaurant(restaurant);
        setShowModal(true);
    };

    // Modal Close Function
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

    // Handle Input Change with Validation
    const handleChange = (e) => {
        let { name, value } = e.target;

        // Prevent negative values for price & stock
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
    
                // ✅ নতুন ফুড লিস্টে যোগ করুন (UI-তে সাথে সাথে দেখাবে)
                setSelectedRestaurant(prev => ({
                    ...prev,
                    foods: [...prev.foods, response.data.newFood] // ✅ নতুন ফুড যোগ
                }));
    
                // ✅ রেস্টুরেন্ট লিস্ট রিফ্রেশ করুন
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
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-semibold text-left mb-4">Restaurants List</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200 text-gray-800 font-bold">
                        <tr>
                            <th className="py-3 px-4 text-left">Image</th>
                            <th className="py-3 px-4 text-left">Restaurant Name</th>
                            <th className="py-3 px-4 text-left">Location</th>
                            <th className="py-3 px-4 text-left">Total Foods</th>
                            <th className="py-3 px-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurantsList?.map((restaurant) => (
                            <tr key={restaurant._id} className="border-b hover:bg-gray-100 transition">
                                <td className="py-3 px-2">
                                    <img
                                        src={restaurant.image || "https://via.placeholder.com/50"}
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
                                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
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
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-md">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">
                            Add Food to {selectedRestaurant?.restaurantName}
                        </h2>
                        <div className="space-y-2">
                            <input type="text" name="name" placeholder="Food Name" value={foodData.name} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required />
                            <input type="number" name="price" placeholder="Price" value={foodData.price} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required />
                            <input type="text" name="description" placeholder="Description" value={foodData.description} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />
                            <input type="text" name="category" placeholder="Category" value={foodData.category} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />
                            <input type="text" name="imageUrl" placeholder="Image URL" value={foodData.imageUrl} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />
                            <input type="number" name="stock" placeholder="Stock" value={foodData.stock} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required />
                            <input type="number" name="discount" placeholder="Discount" value={foodData.discount} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />
                        </div>
                        <div className="flex justify-end mt-4">
                            <button onClick={closeModal} className="mr-2 bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500 transition">Cancel</button>
                            <button onClick={handleAddFood} className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition">Add</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
