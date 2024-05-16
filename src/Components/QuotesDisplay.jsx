import React from "react";
import "./QuotesDisplay.css";

const QuotesDisplay = ({ quote, onNext, onPrevious, prevIndex, nextIndex }) => {
  return (
    <>
      <div className="quote-container">
        <p className="quote">{quote}</p>
        <div className="button-container">
          <button onClick={onPrevious} disabled={prevIndex}>
            Previous
          </button>
          <button onClick={onNext} disabled={nextIndex}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default QuotesDisplay;
