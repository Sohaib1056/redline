"use client";

import { useState, useEffect } from "react";

const BASE_IMAGES = [
  { src: "/hero section.png", alt: "Hero 1" },
  { src: "/hero 2.png", alt: "Hero 2" },
  { src: "/hero 3.png", alt: "Hero 3" },
];

const SLIDES = [...BASE_IMAGES, BASE_IMAGES[0]];

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [withTransition, setWithTransition] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentIndex === BASE_IMAGES.length) {
      const resetTimeout = setTimeout(() => {
        setWithTransition(false);
        setCurrentIndex(0);
      }, 700);

      return () => clearTimeout(resetTimeout);
    } else {
      setWithTransition(true);
    }
  }, [currentIndex]);

  const handlePrev = () => {
    if (currentIndex === 0) {
      setWithTransition(false);
      setCurrentIndex(BASE_IMAGES.length - 1);
    } else {
      setWithTransition(true);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const activeDotIndex = currentIndex % BASE_IMAGES.length;

  return (
    <section className="hero-slider-section" aria-label="Hero Showcase">
      <div className="hero-slider-viewport">
        <div
          className="hero-slider-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: withTransition ? "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
          }}
        >
          {SLIDES.map((image, index) => (
            <div key={index} className="hero-slide-item">
              <img
                src={image.src}
                alt={image.alt}
                className="hero-slide-img"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          className="hero-slider-btn prev"
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          className="hero-slider-btn next"
          onClick={handleNext}
          aria-label="Next slide"
        >
          ›
        </button>

        {/* Indicators */}
        <div className="hero-slider-indicators">
          {BASE_IMAGES.map((_, index) => (
            <button
              key={index}
              className={`hero-dot${index === activeDotIndex ? " active" : ""}`}
              onClick={() => {
                setWithTransition(true);
                setCurrentIndex(index);
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
