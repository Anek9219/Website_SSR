import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";


export default function EngineTransmission() {
  useEffect(() => {
    // Initialize AOS
    AOS.init();
  }, []);

  return (
    <div className="engine-transmission my-5 element">
      <div className="container head1">
        <h3 className="enginetransmission-head fw-bold text-center">
          USED <span>ENGINES AND TRANSMISSIONS</span> FOR SALE
        </h3>
        <div className="row my-3">
          <div className="col-lg-6 mb-5">
            <div
              className="card d-flex flex-column align-items-center border-0"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-easing="ease-out-cubic"
            >
              <img
                className="img-fluid engine-trans1"
                src="/assets/add2.svg"
                alt="Used Mercedes Engine"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
              <h4>USED ENGINES</h4>
              <Link href='/engine#engine-form'>
              <button
                className="btn btn-info text-white"
                aria-label="Learn more about used engines"
              >
                Learn More &#8594;
              </button>
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="card d-flex flex-column align-items-center h-100 border-0"
              data-aos="fade-down"
              data-aos-duration="1000"
              data-aos-easing="ease-out-cubic"
            >
              <img
              src="/assets/transmission.webp"
                // src=""
                alt="Used Transmissions"
                style={{ maxHeight: "300px", objectFit: "cover" }}
                className="img-fluid engine-trans2 mb-1"
              />
              <h4>USED TRANSMISSIONS</h4>
              <Link href='/transmission#trans-form'>
              
              <button
                className="btn btn-info text-white"
                aria-label="Learn more about used transmissions"
              >
                Learn More &#8594;
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
