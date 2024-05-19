import React, { useState } from "react";
import { quotesData, quotesImages } from "../../quotesData";
import QuotesDisplay from "../QuotesDsiplay/QuotesDisplay";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./Head.css";
import { toPng } from "html-to-image";
const Head = () => {
  const [index, setIndex] = useState(0);
  const handleNext = () => {
    setIndex(index + 1);
  };
  const handlePrev = () => {
    setIndex(index - 1);
  };
  function downloadImage(dataUrl) {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "my-quotes-app.png";
    link.click();
  }

  const captureAndDownload = () => {
    const headContainer = document.querySelector(".HeadContainer");
    // console.log("appContainer:", appContainer);
    toPng(headContainer, {
      backgroundImage: quotesImages[index], // Adjust background color if needed
    }).then(downloadImage);
  };

  const nextDisabled = index === quotesData.length - 1;
  const prevDisabled = index === 0;
  const backgroundImage = quotesImages[index];

  return (
    <>
      <div className="HeadContainer">
        <LazyLoadImage
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
      <button className="download-button" onClick={captureAndDownload}>
        Download
      </button>
    </>
  );
};

export default Head;
