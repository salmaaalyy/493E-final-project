import React from "react";
import { useNavigate } from "react-router-dom";

export interface RestaurantItem {
  id: number;
  name: string;
}

export interface RestaurantProps {
  items: RestaurantItem[];
}

export default function RestaurantList({ items }: RestaurantProps) {
  const navigate = useNavigate();

  const handleRestaurantClick = (name: string) => {
    navigate(`/restaurant/${name}`, { state: { name: name } });
  };

  return (
    <div className="restaurant-list">
      {items.map((restaurant) => (
        <div
          key={restaurant.id}
          className="restaurant-item"
          onClick={() => handleRestaurantClick(restaurant.name)}
        >
          <h2>{restaurant.name}</h2>
        </div>
      ))}
    </div>
  );
}