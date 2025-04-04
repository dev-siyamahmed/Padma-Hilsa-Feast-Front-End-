import React, { useEffect, useState } from "react";
import useCartList from "../../Hooks/useCartList";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_Payment_GateWay_PK);
const DELIVERY_CHARGE = 30;
const PLATFORM_FEE = 5;

export default function CartList() {
    const [cartList, isLoading, refetch] = useCartList();
    const [totalPrice, setTotalPrice] = useState(0);
    const [clientSecret, setClientSecret] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const total = cartList.reduce((sum, item) => sum + item.totalItemPrice, 0);
        setTotalPrice(total + DELIVERY_CHARGE + PLATFORM_FEE);
    }, [cartList]);

    const removeFromCart = async (foodId) => {
        if (!foodId || cartList.length === 0) return;

        try {
            const email = cartList[0]?.email;
            const response = await axiosPublic.delete(`/user/cart/remove/${foodId}/${email}`);

            if (response.data.success) {
                const updatedCart = cartList.filter((item) => item.foodId !== foodId);
                setTotalPrice(updatedCart.reduce((sum, item) => sum + item.totalItemPrice, 0) + DELIVERY_CHARGE + PLATFORM_FEE);

                toast.success("Item removed from cart!");
                refetch();
            }
        } catch (error) {
            console.error("Error removing item:", error);
            toast.error("Failed to remove item.");
        }
    };

    const placeOrder = async () => {
        if (cartList.length === 0) {
            toast.error("Your cart is empty!");
            return;
        }

        try {
            const response = await axiosPublic.post("/user/order/create", {
                email: cartList[0]?.email,
                items: cartList?.map(({ foodId, quantity }) => ({ foodId, quantity })),
                totalPrice,
            });

            if (response.data.success) {
                setClientSecret(response.data.clientSecret);
                setOrderId(response.data.orderId);
            }
        } catch (error) {
            toast.error("Failed to create order.");
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

            {isLoading ? (
                <p className="text-gray-500">Loading...</p>
            ) : cartList.length === 0 ? (
                <p className="text-gray-500 text-center">Your cart is empty.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cartList.map((item) => (
                        <div key={item.foodId} className="flex flex-col items-center p-4 border rounded-md shadow-sm bg-gray-50">
                            <img
                                src={item.foodDetails?.imageUrl || "https://via.placeholder.com/100"}
                                alt={item.foodDetails?.name || "Food Item"}
                                className="w-24 h-24 rounded-md object-cover"
                            />
                            <div className="text-center mt-3">
                                <h3 className="text-lg font-semibold">{item.foodDetails?.name}</h3>
                                <p className="text-gray-500">Price: BDT {item.foodDetails?.price}</p>
                                <p className="text-gray-500">Quantity: {item.quantity}</p>
                                <p className="font-bold text-green-600">Total: BDT {item.totalItemPrice}</p>
                            </div>

                            <button
                                onClick={() => removeFromCart(item?.foodId)}
                                className="mt-3 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition w-full"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {cartList?.length > 0 && (
                <div className="text-right mt-6">
                    <p className="text-lg">Subtotal: BDT {totalPrice - DELIVERY_CHARGE - PLATFORM_FEE}</p>
                    <p className="text-lg">Delivery Charge: BDT {DELIVERY_CHARGE}</p>
                    <p className="text-lg">Platform Fee: BDT {PLATFORM_FEE}</p>
                    <p className="text-xl font-bold">Total Price: BDT {totalPrice}</p>
                    <button
                        onClick={placeOrder}
                        className="mt-3 bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition w-full sm:w-auto"
                    >
                        Proceed to Payment
                    </button>
                </div>
            )}

            {clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm orderId={orderId} clientSecret={clientSecret} refetch={refetch} />
                </Elements>
            )}
        </div>
    );
}
