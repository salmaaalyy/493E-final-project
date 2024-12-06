import React, { useState, useEffect } from "react";
import RatingInput from "../components/ReviewInput";
import { useNavigate, useParams } from "react-router-dom";
import { HOST, PORT } from "../constants/BackendConstants";

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
  token: string;
  review: string;
  ratings: Record<ReviewCategory, number>;
}

export default function WriteReview({ userToken } : any) {
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

  const navigator = useNavigate();
  const { name } = useParams();
  const [errorMessage, setErrorMessage] = useState("");

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

  const getUserData = useEffect(() => {
    if(userToken < 0) {
      navigator("/login");
    }
  },
  [userToken]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRatings((prevRatings) => ({
      ...prevRatings,
      [name as ReviewCategory]: value,
    }));
  }

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviews((prevReviews) => ({
      ...prevReviews,
      [name as ReviewCategory]: value,
    }))
  };
  

  const handleSubmit = () => {
    const newReview: Review = {
      token: userToken,
      review: Object.values(reviews).join(" "),
      ratings: Object.fromEntries(
        Object.entries(ratings).map(([key, value]) => [key.toUpperCase(), value === "" ? -1 : Number(value)])
      ) as Record<ReviewCategory, number>,
    };

    fetch(`http://${HOST}:${PORT}/add_review?restaurant=${name}`, {
      method: 'POST',
      body: JSON.stringify(newReview),
      headers: {
          'Content-type': 'application/json; charset=UTF-8'
      }
    });
    setErrorMessage("");
    alert("Review submitted successfully!");

    // Clear the form
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

    navigator(`/restaurants/${name}`);
  };

  if(userToken < 0) {
    navigator("/login");
    return (<div></div>);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Write a Review</h1>

      {/*  Name Input */}
      <div style={{ marginBottom: "20px" }}>
        {/* Here goes the user name */}
      </div>

      
      <div style={{ marginBottom: "20px" }}>
        {/** Here goes the restaurant name */}
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
    </div>
  );
}
