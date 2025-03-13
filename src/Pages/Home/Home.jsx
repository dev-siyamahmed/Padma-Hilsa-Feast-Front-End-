import React, { useState } from 'react';
import { HeroSection } from './HeroSection';
import RestaurantList from '../Restaurant/RestaurantList';
import CategoryList from '../CategorySection/CategoryList';
import Delivery from '../Delivery/Delivery';

export default function Home() {

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection setSearchQuery={setSearchQuery} />

      {/* Restaurant Cards */}
      <RestaurantList searchQuery={searchQuery} />
      {/* Category Section */}
      <CategoryList />


      <Delivery />
    </div>
  );
}