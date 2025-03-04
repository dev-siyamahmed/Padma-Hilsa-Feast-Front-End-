import React from 'react';
import delivery from "../../assets/svg/delivery.svg";
import location from "../../assets/svg/location.svg";
import mobile from "../../assets/svg/mobile.svg";

const data = [
  {
    title: 'Super Fast Delivery',
    description: 'Faster than your cravings can blink. Experience the super-fast delivery and get fresh food.',
    rating: 5,
    image: delivery
  },
  {
    title: 'Live Order Tracking',
    description: 'Track your order while it is delivered to your doorstep from the restaurant.',
    rating: 4,
    image: location
  },
  {
    title: 'Your Favorite Restaurant',
    description: 'Find the best and nearest top your favorite restaurants from your selected location.    ',
    rating: 5,
    image: mobile
  }
];

// Reusable Card Component
const Card = ({ title, description, rating, image }) => (
  <div className=" p-4 text-center transition-transform transform hover:scale-105 ">
    <img
      src={image}
      alt={title}
      className="w-48 h-40 mx-auto mb-4 "
    />
    <h3 className="text-xl font-bold text-blue-600 mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>

  </div>
);

export default function Delivery() {
  return (
    <section className=" px-4 py-12 md:py-24">
      <div className="max-w-screen-xl mx-auto text-center mb-12">
        <h2 className="font-black text-black text-3xl md:text-4xl leading-tight uppercase">
          Why Choose Us
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Experience the best food delivery service with fast delivery, your favorite restaurants, and real-time tracking.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data?.map((review, index) => (
          <Card
            key={index}
            title={review.title}
            description={review.description}
            rating={review.rating}
            image={review.image}
          />
        ))}
      </div>
    </section>
  );
}
