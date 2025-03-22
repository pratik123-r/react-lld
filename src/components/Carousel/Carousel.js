import React, { useState, useEffect } from 'react';
import './Carousel.css';

const CarouselConfig = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide functionality (optional)
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    // Navigation Handlers
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="carousel-container">
            <div className="carousel-slide">
                {images.map((url, index) => (
                    <img
                        src={url}
                        alt={`Slide ${index + 1}`}
                        className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
                        key={index} 
                    />
                ))}
            </div>

            <div className="carousel-controls">
                <button onClick={prevSlide} className="carousel-btn">❮</button>
                <button onClick={nextSlide} className="carousel-btn">❯</button>
            </div>
        </div>
    );
};

const Carousel = () => {
    const images = [
        'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ];

    return <CarouselConfig images={images} />;
};

export default Carousel;
