import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "../../Hooks/useCurrentUser";
import useCartList from "../../Hooks/useCartList";

export default function CheckoutForm({ orderId, clientSecret, refetch }) {
    const { currentUser } = useCurrentUser()
    const email = currentUser?.data?.email
    const navigate = useNavigate()
    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(false);
    const [cartList, , refetchCart] = useCartList(); 


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card: cardElement },
        });

        if (error) {
            toast.error(error.message);
            setLoading(false);
        } else if (paymentIntent.status === "succeeded") {
            await axiosPublic.post("/user/order/update-payment", { orderId, email });
            toast.success("Payment Successful!");
            refetch(); // ✅ Refresh order list
            refetchCart(); // ✅ Immediately clear cart UI
            // navigate("/order-success")
            cartList.length = 0;

            setTimeout(() => navigate("/order-success"), 1000);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Enter Payment Details</h2>
            <CardElement className="p-3 border rounded-md" />
            <button
                type="submit"
                disabled={!stripe || loading}
                className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>
        </form>
    );
}
