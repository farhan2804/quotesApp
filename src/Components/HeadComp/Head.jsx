import React, { useState, useEffect } from "react";
import { quotesData, quotesImages } from "../../quotesData";
import QuotesDisplay from "../QuotesDsiplay/QuotesDisplay";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FadeLoader } from "react-spinners";
import "./Head.css";
import { toPng } from "html-to-image";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Head = () => {
  const [index, setIndex] = useState(0);
  const [isRainbowVisible, setIsRainbowVisible] = useState(true);
  const [isFontVisible, setIsFontVisible] = useState(true);
  const [createActive, setCreateActive] = useState(false);
  const [hideButtons, setHideButtons] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let [color, setColor] = useState("red");
  const [isOpen, setIsOpen] = useState(false);
  const [isFontOpen, setIsFontOpen] = useState(false);

  const handleNext = () => {
    setIndex(index + 1);
    setCreateActive(false);
  };

  const handlePrev = () => {
    setIndex(index - 1);
    setCreateActive(false);
  };

  const handleEdit = () => {
    setCreateActive(true);
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
    setIsRainbowVisible(false);
    setIsFontVisible(false);
    setCreateActive(false);
    setIsLoading(true);
    toPng(headContainer, {
      backgroundImage: quotesImages[index],
    })
      .then((dataUrl) => {
        downloadImage(dataUrl);
        setIsRainbowVisible(true);
        setIsFontVisible(true);
        setCreateActive(false);
        setHideButtons(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error capturing image: ", error);
        setIsRainbowVisible(true);
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
          isFontVisible={isFontVisible}
          createActive={createActive}
          hide={hideButtons}
          isLoading={isLoading}
          isOpen={isOpen}
          isFontOpen={isFontOpen}
          setIsOpen={setIsOpen}
          setIsFontOpen={setIsFontOpen}
        />
      </div>
      <div className="Loader-container">
        <FadeLoader
          loading={isLoading}
          size={50}
          color={color}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      <div
        className="button-cont"
        style={{
          display: "flex",
          flexDirection: "column",
          position:  "absolute",
          gap: "10px",
          top: isOpen || isFontOpen ? "85%" : "75%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <button className="download-button" onClick={captureAndDownload}>
          Download
        </button>
        <button onClick={handleEdit} className="create-button">
          Create your own Quote
        </button>
      </div>
    </>
  );
};

export default Head;
