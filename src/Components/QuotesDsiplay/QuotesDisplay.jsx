import React, { useState, useEffect } from "react";
import "./QuotesDisplay.css";
import RainbowCircle from "../ColorPalette/RainbowCircle";

const QuotesDisplay = ({
  quote,
  onNext,
  onPrevious,
  prevIndex,
  nextIndex,
  isRainbowVisible,
  createActive,
  hide,
}) => {
  const [choice, setChoice] = useState("rgba(0, 0, 0, 0.6)");
  const [isOpen, setIsOpen] = useState(false);
  const [isInputHidden, setIsInputHidden] = useState(false);
  const [originalQuote, setOriginalQuote] = useState(quote);
  const [editedQuote, setEditedQuote] = useState("");
  const [editing, setEditing] = useState(createActive);
  // Update currentQuote state whenever the quote prop changes
  useEffect(() => {
    setOriginalQuote(quote);
    setEditing(createActive);
  }, [quote, createActive]);

  const handleEdit = () => {
    setEditing(!editing);
    if (!editing) {
      setEditedQuote(originalQuote);
    } else {
      setOriginalQuote(editedQuote);
    }
  };

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
        {isRainbowVisible && (
          <RainbowCircle
            choice={choice}
            changeColor={changeColor}
            togglePalette={togglePalette}
            isOpen={isOpen}
          />
        )}
        {editing ? (
          <input
            className="userInput"
            type="text"
            value={editedQuote}
            onChange={(e) => setEditedQuote(e.target.value)}
          />
        ) : (
          <p className="quote">{originalQuote}</p>
        )}
        <div className="button-container">
          {!hide && (
            <button onClick={onPrevious} disabled={prevIndex}>
              Previous
            </button>
          )}

          {!hide && (
            <button onClick={onNext} disabled={nextIndex}>
              Next
            </button>
          )}

          {createActive && !isInputHidden && (
            <button onClick={handleEdit}>{editing ? "Save" : "Edit"}</button>
          )}
        </div>
      </div>
    </>
  );
};

export default QuotesDisplay;
