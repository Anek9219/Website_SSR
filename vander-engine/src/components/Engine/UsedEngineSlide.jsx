import React, { useEffect } from 'react'

export default function UsedEngineSlide() {
    useEffect(() => {
        const initCarousel = () => {
            if (window.$ && window.$.fn && window.$.fn.owlCarousel) {
                $("#findengine").owlCarousel({
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
        <div>
            <div
                className="find-engine__img owl-carousel"
                id="findengine"
            >
                <img src="/assets/find-engine-1.jpg" alt="" />
                <img src="/assets/find-engine-2.jpg" alt="" />
                <img src="/assets/find-engine-3.jpg" alt="" />
                <img src="/assets/find-engine-4.jpg" alt="" />
            </div>
        </div>
    )
}
