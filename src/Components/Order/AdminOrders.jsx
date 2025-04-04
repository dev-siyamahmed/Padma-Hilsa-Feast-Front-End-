import React, { useState } from "react";
import useAdminOrderList from "../../Hooks/useAdminOrderList";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

export default function AdminOrders() {
    const axiosPublic = useAxiosPublic();
    const [adminOrderList, AdminOrderRefetch] = useAdminOrderList();
    const [localOrderList, setLocalOrderList] = useState(adminOrderList); // Add local state for immediate UI update

    // Status Colors Mapping
    const statusColors = {
        pending: "bg-yellow-200",
        delivery: "bg-blue-200",
        completed: "bg-green-200",
        rejected: "bg-red-200",
    };

    const handleStatusChange = async (orderId, newStatus) => {
        console.log("Updating Order:", orderId, "to", newStatus);

        // Find the index of the order in the local state
        const updatedOrders = localOrderList.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
        );

        // Optimistic UI Update (Before API Call)
        setLocalOrderList(updatedOrders);

        try {
            const response = await axiosPublic.patch(
                `/admin/update/order/status/${orderId}`,
                { status: newStatus }
            );

            if (response.status === 200) {
                console.log("✅ Order Updated Successfully:", response.data);
                if (typeof AdminOrderRefetch === "function") {
                    AdminOrderRefetch();
                  }
                // AdminOrderRefetch(); // Fetch fresh data after API success
            } else {
                console.error("❌ Failed to update status, Rolling back...");
                setLocalOrderList(adminOrderList); // Rollback if API fails
            }
        } catch (error) {
            console.error("❌ Error updating status:", error.response?.data || error);
            setLocalOrderList(adminOrderList); // Rollback on error
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Admin Orders</h2>

            {localOrderList?.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-3 text-left">Order ID</th>
                                <th className="border p-3 text-left">Email</th>
                                <th className="border p-3 text-left">Total Price</th>
                                <th className="border p-3 text-left">Payment Status</th>
                                <th className="border p-3 text-left">Order Status</th>
                                <th className="border p-3 text-left">Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            {localOrderList?.map((order) => (
                                <tr key={order._id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="border p-3">{order._id}</td>
                                    <td className="border p-3">{order.email}</td>
                                    <td className="border p-3">${order.totalPrice}</td>
                                    <td
                                        className={`border p-3 font-semibold text-${order.paymentStatus === "paid" ? "green" : "red"}-500`}
                                    >
                                        {order.paymentStatus}
                                    </td>
                                    <td className="border p-3">
                                        <select
                                            className={`p-2 border rounded-md text-gray-900 font-semibold ${statusColors[order.status]}`}
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        >
                                            <option className="bg-yellow-200" value="pending">
                                                Pending
                                            </option>
                                            <option className="bg-blue-200" value="delivery">
                                                Delivery
                                            </option>
                                            <option className="bg-green-200" value="completed">
                                                Completed
                                            </option>
                                            <option className="bg-red-200" value="rejected">
                                                Rejected
                                            </option>
                                        </select>
                                    </td>
                                    <td className="border p-3">
                                        <ul className="space-y-2">
                                            {order?.items?.map((item) => (
                                                <li key={item?._id} className="flex items-center space-x-4">
                                                    <img
                                                        src={item?.foodId?.imageUrl}
                                                        alt={item?.foodId?.name}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                    <div>
                                                        <p className="font-semibold">{item?.foodId?.name}</p>
                                                        <p className="text-gray-500">Qty: {item?.quantity}</p>
                                                        <p className="text-gray-500">Price: ${item?.foodId?.price}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500">No orders available</p>
            )}
        </div>
    );
}
