import React, { useEffect } from "react";
import Link from "next/link";
import styles from "./home.module.css";

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
              At VanderEngines, we specialize in offering used transmissions that are thoroughly inspected and tested for durability. Our transmission for sale options include automatic and manual transmissions for all major brands, including Ford, Chevrolet, Honda, Toyota, BMW, Mercedes, and more. Whether you need a car transmission for sale or transmission sales near me, we have a solution tailored to your needs.
              </div>
              <Link href="/transmission">
                <button className={`${styles.theme_btn} my-3 btn`}>
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
