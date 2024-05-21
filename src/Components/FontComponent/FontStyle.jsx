import React, { useState } from "react";
import { fonts } from "./Fonts";
import "./FontStyle.css";
import IMAGE from "../../assets/Images/fonts.png";

const FontStyle = ({ toggleFont, isFontOpen, changeFont }) => {
  return (
    <>
      <div onClick={toggleFont} className="font-container">
        <img className="font-image" src={IMAGE} alt="fonts image"></img>
      </div>
      {isFontOpen && (
        <div className="fonts">
          {fonts.map((font, index) => (
            <div
              onClick={() => changeFont(font)}
              key={index}
              className="font"
              style={{ fontFamily: font }}
            >
              {font}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FontStyle;
