import React from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from './HeroSection';
import RestaurantList from '../Restaurant/RestaurantList';
import CategoryList from '../CategorySection/CategoryList';
import Delivery from '../Delivery/Delivery';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Category Section */}
      <CategoryList />

      {/* Restaurant Cards */}
      <RestaurantList />

      <Delivery />
    </div>
  );
}