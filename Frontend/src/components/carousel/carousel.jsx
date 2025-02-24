import React, { useState } from 'react';
import '../../pages/games/games.css'

const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    '/img/imgC1.jpg',
    '/img/imgC2.jpg',
    '/img/imgC3.jpg',
    '/img/imgC4.jpg',
    '/img/imgC5.jpg'
  ];

  const showImage = (index) => {
    setCurrentImageIndex(index);
  };

  const prevImage = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage(newIndex);
  };

  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    showImage(newIndex);
  };

  const getImagesToDisplay = () => {
    if (currentImageIndex === images.length - 2) {
      return [images[images.length - 2], images[images.length - 1], images[0]];
    }
    if (currentImageIndex === images.length - 1) {
      return [images[images.length - 1], images[0], images[1]];
    }
    return images.slice(currentImageIndex, currentImageIndex + 3);
  };

  return (
    <>
        <div className="carousel-container">
          <div className='item1C'></div>
          <div className='item2C'></div>
        <div className="carousel">
        {getImagesToDisplay().map((image, index) => (
            <img key={index} src={image} alt={`Imagem ${index + 1}`} />
            ))}
        </div>
        <div className="carousel-thumbnails">
            {images.map((image, index) => (
            <img
                key={index}
                src={image}
                alt={`Miniatura ${index + 1}`}
                className={currentImageIndex === index ? 'active' : ''}
                onClick={() => showImage(index)}
            />
            ))}
        </div>
        </div>
        <div className="carousel-buttons">
            <button className='btnant' onClick={prevImage}><img  src="https://img.icons8.com/ios-filled/50/FFFFFF/less-than.png" alt="less-than"/></button>
            <button className='btnpro' onClick={nextImage}><img  src="https://img.icons8.com/ios-filled/50/FFFFFF/more-than.png" alt="more-than"/></button>
        </div>
    </>
  );
};

export default Carousel;