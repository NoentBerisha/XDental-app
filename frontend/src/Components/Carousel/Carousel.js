    import React, { useState } from 'react';
    import Slider from 'react-slick';
    import CarouselImagesList from '../../util/Lists/CarouselImagesList.json';
    import './Carousel.css';
    import "slick-carousel/slick/slick.css";
    import "slick-carousel/slick/slick-theme.css";


    const CarouselComponent = () => {
        const [images] = useState(CarouselImagesList);

        const settings = {
            dots: true,
            infinite: true,
            speed: 3000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 7000,
            arrows: false,
            fade:true,
            pauseOnHover: false,
        };

        return (
            <Slider {...settings}>
                {images?.map((image, index) => (
                    <div key={index}>
                        <img src={`${process.env.PUBLIC_URL}/${image}`} alt={`Slide ${index}`} />
                    </div>
                ))}
            </Slider>
        );
    }

    export default CarouselComponent;
