import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOST, PORT } from "../constants/BackendConstants";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Update with whatever server is running backend
    fetch(`http://${HOST}:${PORT}/search`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setRestaurants(data);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
      });
  }, []);

  // Routes to details page of clicked restuarant
  const handleRestaurantClick = (name: string) => {
    navigate(`/restaurants/${name}`, { state: { name } });
  };

  return (
    <div>
        <h1>Restaurants near UW</h1>
        {restaurants.map((restaurant) => (
        <a
          href={restaurant}
          onClick={() => handleRestaurantClick(restaurant)}
        >
          <h2>{restaurant}</h2>
        </a>
      ))}
    </div>
  );
}