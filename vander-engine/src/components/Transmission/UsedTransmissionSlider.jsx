import React, { useEffect } from 'react'

export default function UsedTransmissionSlider() {
    useEffect(() => {
        const initCarousel = () => {
            if (window.$ && window.$.fn && window.$.fn.owlCarousel) {
                $("#findtransmission").owlCarousel({
                    loop: true,
                    autoplay: true,
                    autoplayTimeout: 1000,
                    autoplayHoverPause: true,
                    items: 1,
                    dots: false,
                    nav: false,
                    animateOut: "fadeOut",
                    animateIn: "fadeIn",
                });
            } else {
                console.error("OwlCarousel or jQuery not available");
            }
        };

        // Delay the init to make sure scripts are loaded
        setTimeout(initCarousel, 500);
    }, []);
    return (
        <div> <div
            className="find-transmission__img owl-carousel"
            id="findtransmission"
        >
            <img src="/assets/find-transmission-1.png" alt="" />
            <img src="/assets/find-transmission-2.jpg" alt="" />
            <img src="/assets/find-transmission-3.jpg" alt="" />
            <img src="/assets/find-transmission-4.jpg" alt="" />
        </div></div>
    )
}
