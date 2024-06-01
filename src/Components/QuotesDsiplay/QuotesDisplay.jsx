import React, { useState, useEffect } from "react";
import "./QuotesDisplay.css";
import RainbowCircle from "../ColorPalette/RainbowCircle";
import FontStyle from "../FontComponent/FontStyle";

const QuotesDisplay = ({
  quote,
  onNext,
  onPrevious,
  prevIndex,
  nextIndex,
  isRainbowVisible,
  createActive,
  hide,
  isFontVisible,
  isLoading,
  isOpen,
  isFontOpen,
  setIsOpen,
  setIsFontOpen,
}) => {
  const [choice, setChoice] = useState("rgba(0, 0, 0, 0.6)");
  const [originalQuote, setOriginalQuote] = useState(quote);
  const [editedQuote, setEditedQuote] = useState("");
  const [editing, setEditing] = useState(createActive);
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [errorData, setErrorData] = useState("");

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
    if (!isOpen) {
      setIsFontOpen(false);
    }
    setIsOpen(!isOpen);
  };

  const toggleFont = () => {
    if (!isFontOpen) {
      setIsOpen(false);
    }
    setIsFontOpen(!isFontOpen);
  };

  const changeFont = (font) => {
    setSelectedFont(font);
    setIsFontOpen(false);
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
        {isFontVisible && (
          <FontStyle
            toggleFont={toggleFont}
            isFontOpen={isFontOpen}
            changeFont={changeFont}
          />
        )}

        {editing ? (
          <>
            <textarea
              className="userInput"
              type="text"
              value={editedQuote}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length > 100) {
                  setErrorData(
                    "Input exceeds the maximum length of 100 characters!!!"
                  );
                } else {
                  setErrorData(""); // Clear the error message
                  setEditedQuote(value);
                }
              }}
            />
            <p className="error">{errorData}</p>
          </>
        ) : (
          <p className="quote" style={{ fontFamily: selectedFont }}>
            {originalQuote}
          </p>
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
          {createActive && (
            <button onClick={handleEdit}>{editing ? "Save" : "Edit"}</button>
          )}
        </div>
      </div>
    </>
  );
};

export default QuotesDisplay;
