import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/Home.module.css"
export default function Counter() {
  const [isCounting, setIsCounting] = useState(false);
  const counterRef = useRef(null);
  const counter1Ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsCounting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (isCounting) {
      const duration = 6000;
      const targetCount = 250;
      const targetPercent = 100;
      const startTime = Date.now();
      const updateCount = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentCount = Math.floor(targetCount * progress);
        const currentPercent = Math.floor(targetPercent * progress);
        if (counterRef.current) {
          counterRef.current.innerHTML = currentCount + "+";
        }
        if (counter1Ref.current) {
          counter1Ref.current.innerHTML = currentPercent + "%";
        }
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };
      updateCount();
    }
  }, [isCounting]);
  return (
    <div className="counter py-2 my-4">
      <div className="container my-1 text-center ">
        <h1 className="fw-bolder text-center acheived">
          Advanced Digital<span >  Marketing Course </span>
        </h1>
        <p className=" text-black fw-medium animate__animated animate__fadeInUp my-3">
          SS Tech Services is one of the leading Digital Marketing Agencies in USA. We
          are one of the most trusted digital marketing companies that have
          helped our 100+ customers generate high-quality leads through
          different sources like SEO, SMO, Google Ads, Facebook Ads, etc.
        </p>
        <div className="row mt-5 justify-content-around mb-5 m-0">
          <div
            className={`col-lg-3 col-sm-4 d-flex flex-column justify-content-center ${styles.counter_card}`}
          >
            <img
              src="/assets/count-1.avif"
              alt=""
            />
            <h3
              style={{ fontSize: "40px" }}
              className="fw-bold my-3"
              ref={counterRef}
            ></h3>
            <p className="text-center">Happy Clients</p>
          </div>
          <div
            className={`col-lg-3 col-sm-4 d-flex flex-column justify-content-center ${styles.counter_card}`}    
          >
            <img
              src="/assets/count-2.png"
              alt=""
            />
            <h3
              style={{ fontSize: "40px" }}
              className="fw-bold mb-3"
              ref={counter1Ref}
            ></h3>
            <p className="text-center">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
}