import React from 'react';
import { FaStar } from 'react-icons/fa';

const reviews = [
  {
    title: 'Super Fast Delivery',
    description: 'Get your favorite meals delivered to your door in no time, with real-time tracking.',
    rating: 5,
    image: 'https://i.ibb.co.com/pjpSjtZD/3696913-removebg-preview.png'
  },
  {
    title: 'Your Favorite Restaurant',
    description: 'Explore a wide variety of dishes from top-rated restaurants near you.',
    rating: 4,
    image: 'https://i.ibb.co.com/pjpSjtZD/3696913-removebg-preview.png'
  },
  {
    title: 'Live Order Tracking',
    description: 'Track your order every step of the way with our real-time tracking system.',
    rating: 5,
    image: 'https://i.ibb.co.com/pjpSjtZD/3696913-removebg-preview.png'
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
    <div className="flex items-center justify-center space-x-1 text-yellow-500 mb-2">
      {Array.from({ length: rating }).map((_, i) => (
        <FaStar key={i} />
      ))}
    </div>
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
        {reviews.map((review, index) => (
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
