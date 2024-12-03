import React, { useState, useCallback } from "react";
import RatingInput from "../components/ReviewInput";

type ReviewCategory =
  | "overall"
  | "ramp"
  | "waitingArea"
  | "seating"
  | "menu"
  | "serviceAnimals"
  | "food"
  | "staffDecorum";

interface Review {
  user: string;
  restaurant: string;
  review: string;
  ratings: Record<ReviewCategory, number>;
}

export default function WriteReview() {
  const [ratings, setRatings] = useState<Record<ReviewCategory, string>>({
    overall: "",
    ramp: "",
    waitingArea: "",
    seating: "",
    menu: "",
    serviceAnimals: "",
    food: "",
    staffDecorum: "",
  });

  const [reviews, setReviews] = useState<Record<ReviewCategory, string>>({
    overall: "",
    ramp: "",
    waitingArea: "",
    seating: "",
    menu: "",
    serviceAnimals: "",
    food: "",
    staffDecorum: "",
  });

  const [restaurantName, setRestaurantName] = useState("");
  const [userName, setUserName] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");
  const [allReviews, setAllReviews] = useState<Review[]>([]); 

  const categories: { display: string; key: ReviewCategory }[] = [
    { display: "Overall Accessibility", key: "overall" },
    { display: "Ramp", key: "ramp" },
    { display: "Waiting Area", key: "waitingArea" },
    { display: "Seating", key: "seating" },
    { display: "Menu", key: "menu" },
    { display: "Service Animals", key: "serviceAnimals" },
    { display: "Food", key: "food" },
    { display: "Staff Decorum", key: "staffDecorum" },
  ];

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setRatings((prevRatings) => ({
        ...prevRatings,
        [name as ReviewCategory]: value,
      }));
    },
    []
  );

  const handleReviewChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setReviews((prevReviews) => ({
        ...prevReviews,
        [name as ReviewCategory]: value,
      }));
    },
    []
  );

  const handleSubmit = () => {
    if (!restaurantName || !userName) {
      setErrorMessage("Please enter a restaurant name and your name.");
      return;
    }

    const newReview: Review = {
      user: userName || "Anonymous",
      restaurant: restaurantName,
      review: Object.values(reviews).join(" "),
      ratings: Object.fromEntries(
        Object.entries(ratings).map(([key, value]) => [key, value === "" ? -1 : Number(value)])
      ) as Record<ReviewCategory, number>,
    };

    setAllReviews((prevReviews) => [...prevReviews, newReview]);
    setErrorMessage("");
    alert("Review submitted successfully!");

    // Clear the form
    setUserName("");
    setRestaurantName("");
    setRatings({
      overall: "",
      ramp: "",
      waitingArea: "",
      seating: "",
      menu: "",
      serviceAnimals: "",
      food: "",
      staffDecorum: "",
    });
    setReviews({
      overall: "",
      ramp: "",
      waitingArea: "",
      seating: "",
      menu: "",
      serviceAnimals: "",
      food: "",
      staffDecorum: "",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Write a Review</h1>

      {/*  Name Input */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="userNameInput">
          <strong>Your Name:</strong>
        </label>
        <input
          type="text"
          id="userNameInput"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="restaurantInput">
          <strong>Restaurant Name:</strong>
        </label>
        <input
          type="text"
          id="restaurantInput"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
          placeholder="Enter the restaurant name"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      
      {categories.map(({ display, key }) => (
  <RatingInput
    key={key} 
    ratingCategory={key} 
    displayName={display} 
    ratingValue={ratings[key]}
    handleInputChange={handleInputChange}
    reviewText={reviews[key]}
    handleReviewChange={handleReviewChange}
  />
))}


     
      <button onClick={handleSubmit} style={{ marginTop: "20px" }}>
        Submit 
      </button>

      
      {errorMessage && <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>}

      {/* Community Reviews  */}
      <div style={{ marginTop: "30px" }}>
        <h2>Community Reviews</h2>
        {allReviews.length === 0 ? (
          <p>No reviews yet. Be the first to review!</p>
        ) : (
          allReviews.map((review, index) => (
            <div key={index} style={{ borderBottom: "1px solid #ccc", marginBottom: "20px" }}>
              <p>
                <strong>User:</strong> {review.user}
              </p>
              <p>
                <strong>Restaurant:</strong> {review.restaurant}
              </p>
              <p>
                <strong>Review:</strong> {review.review}
              </p>
              <ul>
                {categories.map(({ display, key }) => (
                  <li key={key}>
                    {display}: {review.ratings[key] !== -1 ? review.ratings[key] : "N/A"}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
