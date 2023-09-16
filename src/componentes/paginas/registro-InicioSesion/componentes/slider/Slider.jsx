import React, { useState, useEffect, useRef } from "react";
import "./slider.scss";

function Slider() {
  const banners = ['/img/Slide1.png', '/img/Slide2.png', '/img/Slide3.png', '/img/Slide4.png'];
  const delay = 2500;
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {

    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === banners.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  });
  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {banners.map((backgroundImage, index) => (
          <div className="slide" >
            <img className="slide" key={index} src={ backgroundImage } alt="" />
          </div>
        ))}
      </div>

      <div className="slideshowDots">
        {banners.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

Slider.propTypes = {};

export default Slider;
