import React, { useState, useEffect } from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export const GaleriaImagenes = (props) => {
    var slider_settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1920,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1366,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
            }
        ]
    }

    return (
        <>
            <Slider {...slider_settings}>
                {props.media && props.media.length > 0 && props.media.map(imagen =>
                    <div key={imagen.id}>
                        <a href={imagen.original_url}  target='_blank' rel='noreferrer'>
                            <img src={imagen.original_url} alt={imagen.file_name} width={320} height={320}/>
                        </a>
                    </div>
                )}
            </Slider>
        </>
    )
}