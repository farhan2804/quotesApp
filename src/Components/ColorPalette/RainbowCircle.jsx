import React, { useState } from "react";
import "./RainbowCircle.css"; // Import the CSS file for styling
const colors = [
  "rgba(0, 0, 0, 0.6)",
  "rgba(243, 88, 88, 0.66)", // Semi-transparent red
  "rgba(117, 21, 243, 0.656)", // Semi-transparent green
  "rgba(241, 84, 152, 0.656)", // Semi-transparent blue
  "rgba(152, 0, 39, 0.652)", // Semi-transparent yellow
  "rgba(0, 190, 200, 0.6)", // Semi-transparent cyan
  "rgba(170, 0,165, 0.6)", // Semi-transparent magenta
  "rgba(128, 0, 128, 0.6)", // Semi-transparent purple
  "rgba(213, 165, 0, 0.6)", // Semi-transparent orange
  "rgba(0, 128, 128, 0.6)", // Semi-transparent teal
  "rgba(128, 128, 128, 0.6)", // Semi-transparent grey
];

const RainbowCircle = ({ choice, changeColor, togglePalette,isOpen }) => {
  return (
    <>
      <div onClick={togglePalette} className="rainbow-circle"></div>
      {isOpen && (
        <div className="colors">
          {colors.map((color, index) => (
            <div
              onClick={() => changeColor(color)}
              key={index}
              className="color"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      )}
    </>
  );
};

export default RainbowCircle;
