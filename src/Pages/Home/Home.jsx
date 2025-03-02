import React from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from './HeroSection';
import RestaurantList from '../Restaurant/RestaurantList';
import CategoryList from '../CategorySection/CategoryList';

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Category Section */}
      <CategoryList />

      {/* Restaurant Cards */}
      <RestaurantList />
    </div>
  );
}