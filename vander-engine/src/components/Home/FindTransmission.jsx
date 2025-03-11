import React, { useEffect } from "react";
import Link from "next/link";
import Script from "next/script";

export default function FindTransmission() {
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
    <>
      <div className="find-transmission mb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="find-transmission__content">
                Vander Engines Transmissions provides you the high quality used &
                remanufactured Transmissions. Vander Engines Transmissions is one of
                the most trusted suppliers of used transmissions in the United States
                and around the world. We have a wide range of second-hand transmissions at
                our yards; you can find second-hand motors for every make and model.
                Our transmissions are highly tested and inspected before we deliver them
                to you. Vander Engines Transmissions provide you used transmissions at
                an affordable price. We also offer you up to 5 years warranty on
                our used transmissions. Our range includes remanufactured transmissions for
                brands like BMW, Ford, GMC, Nissan, Acura, Audi, Dodge, Hyundai,
                Honda, Kia, Jeep, Bentley, and many more.
              </div>
              <Link href="/transmission">
                <button className="btn theme-btn my-3">
                  Discover More &#8594;
                </button>
              </Link>
            </div>
            <div className="col-lg-6">
              <div
                className="find-transmission__img owl-carousel"
                id="findtransmission" // <-- Fixed ID here
              >
                <img src="/assets/find-transmission-1.png" alt="" />
                <img src="/assets/find-transmission-2.jpg" alt="" />
                <img src="/assets/find-transmission-3.jpg" alt="" />
                <img src="/assets/find-transmission-4.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
