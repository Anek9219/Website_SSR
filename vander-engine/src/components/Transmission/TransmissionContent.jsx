import React from 'react'
import ReadMore from './ReadMore';
import styles from "./transmission.module.css"

export default function TransmissionContent() {
    const content1 =
            "Buying a new transmission can be expensive, but our cheap used transmissions near me provide a cost-effective alternative. Each used transmission for sale undergoes rigorous testing to ensure reliability and efficiency.";
        const content2 =
            "We provide transmissions for sale for all makes and models. Whether you drive a sedan, truck, SUV, or luxury vehicle, we have the right used transmission for sale to fit your needs.";
        const content3 =
            "All our used transmissions with warranty offer peace of mind. We ensure that every transmission for sale meets industry standards for performance and longevity.";
        const content4 =
            "Looking for used transmissions for sale near me? We provide quick and secure shipping across the U.S., ensuring you receive your cheap transmission without delays.";
  return (
    <div>

         <div className={styles.transmission_content}>
                <div className="container h-100 d-flex align-items-center justify-content-center">
                    <h5>
                        Discover Affordable, High-Quality Car Transmissions with Vander
                        Engines
                    </h5>
                </div>
            </div>
            <div className="transmission-para mt-5">
                <div className="container-fluid">
                    <div className="row">
                    <h3 className='fs-1 fw-bold text-center mb-4'>Why Choose Vander Engines ?</h3>
                        <div className="col-lg-3 mb-3">
                            <div className="card p-3">
                            <h5 className='text-center fw-bold'>Affordable & High-Quality Used Transmissions</h5>
                                <ReadMore text={content1} />
                            </div>
                        </div>
                        <div className="col-lg-3 mb-3">
                            <div className="card p-3 h-100">
                            <h5 className='text-center fw-bold'>Extensive Inventory for Every Vehicle</h5>
                                <ReadMore text={content2} />
                            </div>
                        </div>
                        <div className="col-lg-3 mb-3">
                            <div className="card p-3 h-100">
                            <h5 className='text-center fw-bold'>Warranty & Quality Assurance</h5>
                                <ReadMore text={content3} />
                            </div>
                        </div>
                        <div className="col-lg-3 mb-3">
                            <div className="card p-3 h-100">
                            <h5 className='text-center fw-bold'>Fast & Reliable Nationwide Shipping</h5>
                                <ReadMore text={content4} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}
