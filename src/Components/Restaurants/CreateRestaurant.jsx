import React, { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-hot-toast";



export default function CreateRestaurant() {
  const axiosPublic = useAxiosPublic();
  const [formData, setFormData] = useState({
    restaurantName: "",
    image: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axiosPublic.post("/admin/restaurants/create", formData);
      setSuccess("Restaurant created successfully!");
      setFormData({ restaurantName: "", image: "", location: "" });
      toast.success("Restaurants Create Successfully")
      if (typeof refetch === "function") {
        refetch();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Create Restaurant
        </h2>

        {/* Restaurant Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Restaurant Name</label>
          <input
            type="text"
            name="restaurantName"
            value={formData.restaurantName}
            onChange={handleChange}
            placeholder="Enter restaurant name"
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        {/* Image URL Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        {/* Location Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        
        {/* Success Message */}
        {success && <p className="text-green-500 text-center mb-2">{success}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Restaurant"}
        </button>
      </form>
    </div>
  );
}