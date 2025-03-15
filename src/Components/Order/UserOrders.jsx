import React from "react";
import useUserOrderList from "../../Hooks/useUserOrderList";

export default function UserOrders() {
  const [userOrderList] = useUserOrderList();

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Your Orders</h2>

      {userOrderList.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          {/* 📌 Table for Large Screens with Scroll */}
          <div className="w-full overflow-x-auto">
            <table className="min-w-[700px] w-full bg-white shadow-md rounded-lg border border-gray-200">
              <thead className="bg-gray-100 text-gray-800">
                <tr>
                  <th className="p-4 text-left">Order ID</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Total Price</th>
                  <th className="p-4 text-left">Payment</th>
                  <th className="p-4 text-left">Items</th>
                </tr>
              </thead>
              <tbody>
                {userOrderList.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition duration-200"
                  >
                    <td className="p-4 text-gray-700 w-20 ">{order?.paymentIntentId}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-2 rounded-md text-lg font-medium ${
                          order.status === "pending"
                            ? "bg-yellow-700 text-white"
                            : order.status === "completed"
                            ? "bg-green-700 text-white"
                            : order.status === "rejected"
                            ? "bg-red-600 text-white"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-gray-800">${order?.totalPrice}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-2 rounded-full text-lg font-medium ${
                          order?.paymentStatus === "paid"
                            ? "bg-green-600 text-gray-100"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order?.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      <ul>
                        {order?.items?.map((item) => (
                          <li
                            key={item._id}
                            className="flex items-center gap-3 mb-2 bg-gray-50 p-2 rounded-md shadow-sm"
                          >
                            <img
                              src={item?.foodId?.imageUrl}
                              alt={item?.foodId?.name}
                              className="w-12 h-12 object-cover rounded-md border border-gray-300"
                            />
                            <div>
                              <p className="font-bold text-gray-800">{item?.foodId?.name}</p>
                              <p className="text-sm text-gray-600">Qty: {item?.quantity}</p>
                              <p className="text-sm text-gray-600">Price: ${item?.foodId?.price}</p>
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

          {/* 📌 Responsive Card Layout for Small Screens */}
          <div className="md:hidden">
            {userOrderList.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
              >
                <p className="text-gray-800 w-20  font-semibold">Order ID: {order.paymentIntentId}</p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Total Price:</span> ${order.totalPrice}
                </p>
                <p>
                  <span className="font-semibold">Payment:</span>{" "}
                  <span
                    className={`px-3 py-1 rounded-full text-sm md:text-lg lg:text-xl font-medium ${
                      order?.paymentStatus === "paid"
                        ? "bg-green-600 "
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order?.paymentStatus}
                  </span>
                </p>
                <div className="mt-3">
                  <p className="font-semibold">Items:</p>
                  <ul>
                    {order?.items?.map((item) => (
                      <li
                        key={item?._id}
                        className="flex items-center gap-3 mb-2 bg-gray-50 p-2 rounded-md shadow-sm"
                      >
                        <img
                          src={item.foodId?.imageUrl}
                          alt={item.foodId.name}
                          className="w-12 h-12 object-cover rounded-md border border-gray-300"
                        />
                        <div>
                          <p className="font-bold text-gray-800">{item?.foodId?.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item?.quantity}</p>
                          <p className="text-sm text-gray-600">Price: ${item?.foodId?.price}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
