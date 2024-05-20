import React, { useState } from "react";
import { quotesData, quotesImages } from "../../quotesData";
import QuotesDisplay from "../QuotesDsiplay/QuotesDisplay";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./Head.css";
import { toPng } from "html-to-image";
const Head = () => {
  const [index, setIndex] = useState(0);
  const [isRainbowVisible, setisRainbowVisible] = useState(true);
  const [createActive, isCreateActive] = useState(false);
  const [hideButtons,setHideButtons]=useState(false);
  const handleNext = () => {
    setIndex(index + 1);
    isCreateActive(false);
  };
  const handlePrev = () => {
    setIndex(index - 1);
    isCreateActive(false);
  };

  const handleEdit = () => {
    isCreateActive(true);
  };
  function downloadImage(dataUrl) {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "my-quotes-app.png";
    link.click();
  }

  const captureAndDownload = () => {
    const headContainer = document.querySelector(".HeadContainer");
    setHideButtons(true);
    setisRainbowVisible(false);
    isCreateActive(false);
    // Capture the image
    toPng(headContainer, {
      backgroundImage: quotesImages[index],
    })
      .then((dataUrl) => {
        downloadImage(dataUrl);
        setisRainbowVisible(true);
        isCreateActive(false);
        setHideButtons(false);
      })
      .catch((error) => {
        console.error("Error capturing image: ", error);
        setisRainbowVisible(true);
      });
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
          isRainbowVisible={isRainbowVisible}
          createActive={createActive}
          hide={hideButtons}
        />
      </div>
      <button className="download-button" onClick={captureAndDownload}>
        Download
      </button>
      <button onClick={handleEdit} className="create-button">
        Create your own Quote
      </button>
    </>
  );
};

export default Head;
