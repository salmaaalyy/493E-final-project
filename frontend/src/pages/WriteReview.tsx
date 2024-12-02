import React, { useState } from 'react';

import RatingInput from '../components/ReviewInput';

export default function WriteReview() {
  const [ratings, setRatings] = useState({
    overall: '',
    ramp: '',
    waitingArea: '',
    seating: '',
    menu: '',
    serviceAnimals: '',
    food: '',
    staffDecorum: ''
  });

  const [reviews, setReviews] = useState({
    overall: '',
    ramp: '',
    waitingArea: '',
    seating: '',
    menu: '',
    serviceAnimals: '',
    food: '',
    staffDecorum: ''
  });

  // Supposed to update ratings based on input. Not sure if it works 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRatings((prevRatings) => ({
      ...prevRatings,
      [name]: value
    }));
  };
  // Supposed to update reviews based on input. Not sure if it works
  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReviews((prevReviews) => ({
      ...prevReviews,
      [name]: value
    }));
  };

  return (
    <div id="review">
      <h1>Write a review</h1>
      <h3>Name of user</h3>

      {/* Accessibility Rating & Review */}
      <RatingInput
        ratingCategory="Overall score of accessibility"
        ratingValue={ratings.overall}
        handleInputChange={handleInputChange}
        reviewText={reviews.overall}
        handleReviewChange={handleReviewChange}
      />

      {/* Ramp Rating & Review */}
      <RatingInput
        ratingCategory="Ramp"
        ratingValue={ratings.ramp}
        handleInputChange={handleInputChange}
        reviewText={reviews.ramp}
        handleReviewChange={handleReviewChange}
      />

      {/* Waiting Area Rating & Review */}
      <RatingInput
        ratingCategory="Waiting Area"
        ratingValue={ratings.waitingArea}
        handleInputChange={handleInputChange}
        reviewText={reviews.waitingArea}
        handleReviewChange={handleReviewChange}
      />

      {/* Seating Rating & Review */}
      <RatingInput
        ratingCategory="Seating"
        ratingValue={ratings.seating}
        handleInputChange={handleInputChange}
        reviewText={reviews.seating}
        handleReviewChange={handleReviewChange}
      />
      
      {/* Menu Rating & Review */}
      <RatingInput
        ratingCategory="Overall score of accessibility"
        ratingValue={ratings.menu}
        handleInputChange={handleInputChange}
        reviewText={reviews.menu}
        handleReviewChange={handleReviewChange}
      />
     
      {/* Service Animals Rating & Review */}
      <RatingInput
        ratingCategory="Service Animals"
        ratingValue={ratings.serviceAnimals}
        handleInputChange={handleInputChange}
        reviewText={reviews.serviceAnimals}
        handleReviewChange={handleReviewChange}
      />

      {/* Food Rating & Review */}
      <RatingInput
        ratingCategory="Food"
        ratingValue={ratings.food}
        handleInputChange={handleInputChange}
        reviewText={reviews.food}
        handleReviewChange={handleReviewChange}
      />

      {/* Staff Decorum Rating & Review */}
      <RatingInput
        ratingCategory="Staff Decorum"
        ratingValue={ratings.staffDecorum}
        handleInputChange={handleInputChange}
        reviewText={reviews.staffDecorum}
        handleReviewChange={handleReviewChange}
      />
      
      <button>Submit Review</button>
    </div>
  );
}
