import React from "react";
import RestaurantList, { RestaurantItem } from "../components/RestaurantList";

export default function RestaurantsPage() {
  const restaurants: RestaurantItem[] = [
    { id: 1, name: "Restaurant A" },
    { id: 2, name: "Restaurant B" },
    { id: 3, name: "Restaurant C" },
  ];

  return (
    <div>
      <h1>Restaurants near UW</h1>
      <RestaurantList items={restaurants} />
    </div>
  );
}