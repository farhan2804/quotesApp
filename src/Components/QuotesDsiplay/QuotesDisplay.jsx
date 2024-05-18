import React, { useState } from "react";
import "./QuotesDisplay.css";
import RainbowCircle from "../ColorPalette/RainbowCircle";
const QuotesDisplay = ({ quote, onNext, onPrevious, prevIndex, nextIndex }) => {
  const [choice, setChoice] = useState("rgba(0, 0, 0, 0.6)");
  const [isOpen, setIsOpen] = useState(false);
  const changeColor = (color) => {
    setChoice(color);
    setIsOpen(false);
  };
  const togglePalette = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="quote-container" style={{ backgroundColor: choice }}>
        <RainbowCircle
          choice={choice}
          changeColor={changeColor}
          togglePalette={togglePalette}
          isOpen={isOpen}
        />
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
