import React, { useEffect, useState } from 'react';

const Carousel = () => {
  const images = [
    "/img/Carousel/img_1.jpg",
    "/img/Carousel/img_2.jpg",
    "/img/Carousel/img_3.jpg",
    "/img/Carousel/img_4.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  useEffect(() => {
    const intervalId = setInterval(nextImage, 3000); // Change slide every 3 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);
  return (
    <div className="relative max-w-3xl h-auto mx-auto my-28">
      <img src={images[currentIndex]}   alt={`Slide ${currentIndex + 1}`} className="w-full h-auto rounded-lg" />
      <button
        onClick={prevImage}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 rounded-full p-2 shadow-lg focus:outline-none"
      >
        &#10094;
      </button>
      <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 rounded-full p-2 shadow-lg focus:outline-none"
      >
        &#10095;
      </button>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_,index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;