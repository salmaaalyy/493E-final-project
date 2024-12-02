import {useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function RestaurantDetails() {
  const location = useLocation();
  const { name } = location.state || {};
  const stateName = location.state?.name || name;

  const navigate = useNavigate();

  const [restaurantData, setRestaurantData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Modifies category so each word's first letter is capitalized and removes underscores.
  //    Input: category (String) 
  //    Output: modified category (String)
  //    Example: 
  //      input: SERVICE_ANIMALS
  //      output: Service Animals
  const formatCategory = (category: String) => {
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Scrolls back to top of page
  const handleBackToTop = () => {
    window.scrollTo(0, 0);
  };

  // Returns to previous page
  const handleReturnToHomepage = () => {
    navigate(`/restaurants`);
  };

  // Routes to review page
  const handleWriteReview = () => {
    navigate(`/restaurants/${name}/review`);
  };

  useEffect(() => {
    setLoading(true);
    setRestaurantData(null);
    
    // Encode restaurant name to match URL standards
    //   Sidenote: call to backend does not work with '%20' replacing spaces so normal
    //     call to 'encodeURIComponent' doesn't work
    const encodedName = encodeURIComponent(stateName).replace(/%20/g, '+');
    
    // Fetch restaurant data from Flask API when the component loads
    axios.get(`http://localhost:3500/get_data?restaurant=${encodedName}`)
      .then((response) => {
        setRestaurantData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching restaurant data:", error);
        setLoading(false);
      });
  }, [stateName]); // Re-fetch if the name changes

  // Shows loading message while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handles case where no data is returned
  if (!restaurantData) {
    return <div>Restaurant not found.</div>;
  }

  const { summary, restaurant_info, accessibility_summary, review_summary, reviews } = restaurantData;

  return (
    <div>
      <h1>{stateName || "Restaurant Name"}</h1>
      
      {/* Note: Not sure if the average rating is already built in the  API calls*/}
      <h2>Rating: {accessibility_summary?.average_rating/5 || "No rating available"}</h2> 

      <p>(# of ratings: {reviews.length})</p>
      <h2>type of food</h2>

      {/* Table of Content */}
      <ul>
        <li>Overview</li>
        <li><a href="#accessibility-summary">Accessibility Summary</a></li>
        <li><a href="#restaurant-summary">Restaurant Summary</a></li>
        <li><a href="#ask-the-community">Ask the Community</a></li>
        <li><a href="#review-summaries">Review Summaries</a></li>
        <li><a href="#reviews-in-detail">Reviews in Detail</a></li>
      </ul>

      <p>{summary}</p>

      {/* Accessibility Summary */}
      <section id="accessibility-summary">
        <h2>Accessibility Summary</h2>
        {Object.keys(accessibility_summary).map((category) => {
          return (
            <h3>{formatCategory(category)}: {accessibility_summary[category]}/5</h3>
          );
        })}
      </section>

      {/* Restaurant Summary */}
      <section id="restaurant-summary">
        <h2>Restaurant Summary</h2>
        <h3>Price Range: </h3>
        {Object.keys(restaurant_info).map((category) => {
          return (
            <h3>{formatCategory(category)}: {restaurant_info[category]}</h3>
          );
        })}
        <h3>Menu: </h3>
      </section>

      {/* Review Summaries */}
      <section id="review-summaries">
        <h2>Review Summary</h2>
        <p>"{review_summary || "quotes placeholder Torem ipsum dolor sit amet, consectetur adipiscing elit."}"</p>
      </section>

      {/* Reviews */}
      <section id="reviews">
        <h2>Reviews</h2>
        <button onClick={handleWriteReview}>Write a review</button>
        {reviews && reviews.length > 0 ? (
          reviews.map((review: any, index: any) => (
            <div key={index} className="box">
              <p>{review.user}</p>
              <p>Ratings:</p>
              <ul>
                {Object.keys(review.ratings).map((category) => (
                  <li key={category}>
                    {formatCategory(category)}: {review.ratings[category]}
                  </li>
                ))}
              </ul>
              <p><strong>Review:</strong> {review.review}</p>
            </div>
          ))
        ) : (
          <p>No reviews available</p>
        )}
        <button onClick={handleWriteReview}>Write a review</button>
      </section>

      {/* Ask the Community */}
      <section id="ask-community">
        <h2>Ask the Community</h2>
        <div className="box">
          <h3>Placeholder question</h3>
          <h4>Answers</h4>
          <p>more..</p>
        </div>
        <div className="box">
          <h3>Placeholder question</h3>
          <h4>Answers</h4>
          <p>more..</p>
        </div>
        <button>Ask a question</button>
      </section>

      {/* Buttons for Navigation */}
      <section>
        <button onClick={handleBackToTop}>Back to the top</button>
        <br></br>
        <button onClick={handleReturnToHomepage}>Return to restaurant homepage</button>
      </section>
    </div>
  );
}