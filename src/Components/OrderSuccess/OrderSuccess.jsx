import { Link } from "react-router-dom";

export default function OrderSuccess() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-bold text-green-600">🎉 Payment Successful!</h1>
            <p className="mt-4 text-gray-600">Thank you for your order. Your payment has been processed successfully.</p>
            <Link to="/dashboard/user/orders" className="mt-6 bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition">
                View Orders
            </Link>
        </div>
    );
}
