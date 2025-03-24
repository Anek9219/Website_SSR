import React, { useEffect, useState } from "react";
// import "./home.css";
import styles from "./home.module.css";
import Link from "next/link";

export default function AboutUs() {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Create the IntersectionObserver instance
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the element is in the viewport, add the 'animate' class
        if (entry.isIntersecting) {
          setIsAnimated(true);
          observer.disconnect(); // Stop observing once it has been animated
        }
      },
      {
        threshold: 0.1, // Trigger when 50% of the element is in view
      }
    );

    // Target the element we want to observe
    const element = document.querySelector(".aboutus .container-fluid");
    if (element) {
      observer.observe(element);
    }

    // Clean up the observer on component unmount
    return () => {
      if (element) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div className={styles.aboutus}>
      <div className={`container-fluid head1 ${isAnimated ? "animate" : ""}`}>
        <h3 className="about-head fw-bold text-center ">
          About <span>Us</span>
        </h3>

        <div className="row align-items-center">
          <div className="col-lg-5 ps-5">
            <h4>We Make Sure That You Get The Product You Want</h4>
            <p>
            Vander engines transmissions is of the most trusted supplier of the used engines and 
            used transmissions in United States. We offer high quality products that fits your vehicles. 
            All the remanufactured engines and transmissions that we sell are highly inspected and tested 
            by our mechanics before we deliver it to you. We have second hand engines and second hand transmissions
             for every make and model at the right price. We also offer upto 5 years warranty on our engines and 
             transmissions. Vander Engines Transmissions ship your orders directly to your business, residential 
             or mechanical workshop to expedite your repiar process.
            </p>
            <ul>
              <li>Tested & Reliable Engines and Transmissions.</li>
              <li>
              Offer Used Engines and Transmissions for all make and models
              </li>
              <li>
              Affordable Price on every products
              </li>
              <li>
              We offer complete coverage of engine parts and other external components.
              </li>
            </ul>
            <Link href="/about">
              <button className="theme-btn btn mt-2" type="submit">
                Discover More &#8594;
              </button>
            </Link>
          </div>
          <div className="col-lg-7">
            <img src="/assets/car-2.webp" alt="Car" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
}
