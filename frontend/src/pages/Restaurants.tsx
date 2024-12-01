import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Update with whatever server is running backend
    // Command to run server: python -m backend --port=3500
    axios.get("http://localhost:3500/search")
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
      });
  }, []);

  const handleRestaurantClick = (name: string) => {
    navigate(`/restaurant/${name}`, { state: { name } });
  };

  return (
    <div>
        <h1>Restaurants near UW</h1>
        {restaurants.map((restaurant) => (
        <div
          key={restaurant}
          onClick={() => handleRestaurantClick(restaurant)}
        >
          <h2>{restaurant}</h2>
        </div>
      ))}
    </div>
  );
}