import React, { useEffect } from "react";
import Link from "next/link";
import styles from "./home.module.css"

export default function FindEngine() {
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
    <>
      <div className="find-engine">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="find-engine__content">
              At VanderEngines, we specialize in offering used motor engines for sale that are thoroughly inspected and tested for reliability. Our engine motors for sale come from trusted sources, ensuring high performance and longevity. We provide engines for every make and model, including Ford, Chevrolet, Toyota, Honda, BMW, Mercedes, and more. Whether you need a vehicle engine for sale or motors for sale near me, we have the perfect match for your vehicle.
              </div>
              <Link href="/engine">
                <button className={`${styles.theme_btn} my-3 btn`} >
                  Discover More &#8594;
                </button>
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="find-engine__img owl-carousel" id="findengine">
                <img src="/assets/find-engine-1.jpg" alt="" />
                <img src="/assets/find-engine-2.jpg" alt="" />
                <img src="/assets/find-engine-3.jpg" alt="" />
                <img src="/assets/find-engine-4.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
