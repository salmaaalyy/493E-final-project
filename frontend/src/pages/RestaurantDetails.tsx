import React from "react";
import { useParams, useLocation } from "react-router-dom";

export default function RestaurantDetails() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { name } = location.state || {};
  const stateName = location.state?.name;

  return (
    <div>
      <h1>{stateName || name || "Restaurant Name"}</h1>

      <h2>Ratings: 3/5</h2> 
      <p>(#of ratings)</p>
      <h2>type of food</h2>

      <ul>
        <li>Overview</li>
        <li><a href="#accessibility-summary">Accessibility Summary</a></li>
        <li><a href="#restaurant-summary">Restaurant Summary</a></li>
        <li><a href="#ask-the-community">Ask the Community</a></li>
        <li><a href="#review-summaries">Review Summaries</a></li>
        <li><a href="#reviews-in-detail">Reviews in Detail</a></li>
      </ul>

      <p>restaurant introduction paragraphs placeholder Yorem ipsum dolor sit amet, consectetur adipiscing 
        elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>

      <section id="accessibility-summary">
        <h2>Accessibility Summary</h2>
        <h3>Ramp</h3>
        <h3>Waiting Area</h3>
        <h3>Seating</h3>
        <h3>Service Animals</h3>
        <h3>Food</h3>
        <h3>Staff Decorum</h3>
      </section>

      <section id="restaurant-summary">
        <h2>Restaurant Summary</h2>
        <h3>Price Range</h3>
        <h3>Opening Hours</h3>
        <h3>Address</h3>
        <h3>Menu</h3>
        <h3>Phone Number</h3>
      </section>

      <section id="review-summaries">
        <h2>Review Summary</h2>
        <p>“quotes placeholder Torem ipsum dolor sit amet, consectetur adipiscing elit.”</p>
        <p>“quotes placeholder Torem ipsum dolor sit amet, consectetur adipiscing elit.”</p>
      </section>

      <section id="reviews">
        <h2>Reviews</h2>
      </section>
    </div>
  );
}