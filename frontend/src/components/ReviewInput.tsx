import React from 'react';

// Reusable component to populate input boxes for users to leave a review

interface RatingInputProps {
    ratingCategory: string;
    ratingValue: string | number;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    reviewText: string;
    handleReviewChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}
const RatingInput : React.FC<RatingInputProps> = (
  { ratingCategory, ratingValue, handleInputChange, reviewText, handleReviewChange }
) => {
  const reviewName = `${ratingCategory}Review`;  
  return (
    <div>
      <label htmlFor={ratingCategory} className='rating-container'>
        <h2>{ratingCategory}: {ratingValue ? `${ratingValue}/5` : ''}</h2>
        <input
          type="number"
          name={ratingCategory}
          min="1"
          max="5"
          value={ratingValue}
          onChange={handleInputChange}
          placeholder="?/5"
          className='rating-input'
        />
      </label>

      <div className="box">
        <form id={`${ratingCategory}Form`}>
          <input
            type="text"
            name={reviewName}
            value={reviewText}
            onChange={handleReviewChange}
            placeholder={`Share details of your own experience at this place for ${ratingCategory}`}
          />
        </form>
      </div>
    </div>
  );
};

export default RatingInput;