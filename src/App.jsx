import React, { useState } from "react";
import { quotesData, quotesImages } from "./quotesData";
import QuotesDisplay from "./Components/QuotesDisplay";
import "./App.css";
const App = () => {
  const [index, setIndex] = useState(0);
  const handleNext = () => {
    setIndex(index + 1);
  };
  const handlePrev = () => {
    setIndex(index - 1);
  };

  const nextDisabled = index === quotesData.length - 1;
  const prevDisabled = index === 0;
  const backgroundImage = quotesImages[index];

  return (
    <>
      <div className="appContainer">
        <img
          alt={`Background for quote ${index}`}
          src={backgroundImage}
          effect="blur"
          loading="lazy"
          className="backgroundImage"
        />
        <QuotesDisplay
          quote={quotesData[index]}
          onNext={handleNext}
          onPrevious={handlePrev}
          prevIndex={prevDisabled}
          nextIndex={nextDisabled}
        />
      </div>
    </>
  );
};

export default App;
