interface RatingInputProps {
  ratingCategory: string;
  displayName: string; 
  ratingValue: string | number;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reviewText: string;
  handleReviewChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const RatingInput: React.FC<RatingInputProps> = ({
  ratingCategory,
  displayName,
  ratingValue,
  handleInputChange,
  reviewText,
  handleReviewChange,
}) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      {/* Rating Input */}
      <label htmlFor={`${ratingCategory}-rating`} style={{ display: "block", marginBottom: "10px" }}>
        <h2 style={{ display: "inline-block", marginRight: "10px" }}>
          {displayName}: 
        </h2>
        <span style={{ display: "inline-flex", alignItems: "center" }}>
          <input
            id={`${ratingCategory}-rating`}
            type="number"
            name={ratingCategory}
            value={ratingValue}
            onChange={handleInputChange}
            placeholder="?"
            min="1"
            max="5"
            style={{
              width: "50px",
              padding: "5px",
              textAlign: "center",
              fontSize: "14px",
              marginRight: "5px",
              borderRadius: "3px",
              border: "1px solid black",
            }}
          />
          /5
        </span>
      </label>

      {/* Review Textarea */}
      <label htmlFor={`${ratingCategory}-review`} style={{ display: "block", marginBottom: "5px" }}>
      
      </label>
      <textarea
        id={`${ratingCategory}-review`}
        name={ratingCategory} 
        value={reviewText}
        onChange={handleReviewChange}
        placeholder={`Share details of your experience for at this place`}
        style={{
          width: "100%",
          height: "150px",
          padding: "10px",
          fontSize: "16px",
          border: "2px solid black",
          borderRadius: "3px",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
};

export default RatingInput;
