import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HOST, PORT } from "../constants/BackendConstants";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Update with whatever server is running backend
    // Command to run server: python -m backend --port=3500
    axios.get(`http://${HOST}:${PORT}/search`)
      .then((response : any) => {
        setRestaurants(response.data);
      })
      .catch((error : any) => {
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