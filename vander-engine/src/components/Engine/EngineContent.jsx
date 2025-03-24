import React from 'react'
import ReadMore from '../Transmission/ReadMore';
import styles from "@/components/Transmission/transmission.module.css"

export default function EngineContent() {
    const content1 =
        "Buying a new engine can be expensive, but our 2nd hand engines sale offers a cost-effective alternative. Each used engine motors for sale undergoes rigorous testing to ensure reliability and efficiency.";
    const content2 =
        "We provide car engines for sale for all makes and models. Whether you drive a sedan, truck, SUV, or luxury vehicle, we have the right motor engine for sale to fit your needs.";
    const content3 =
        "All our used engines for sale come with a warranty, offering peace of mind. We ensure every used motor engines for sale meets industry standards for performance and durability.";
    const content4 =
        "Looking for engines for sale near me? We provide quick and secure shipping across the U.S., ensuring you receive your auto engine for sale without delays.";
    return (
        <div>
            <div className={`${styles.transmission_content} mt-5`} >
                <div className="container h-100 d-flex align-items-center justify-content-center">
                    <h5>
                        Used Engines for Sale: Your Go-To Source for Quality Auto Parts
                    </h5>
                </div>
            </div>
            <div className="transmission-para my-5">
                <div className="container-fluid">
                    <div className="row">
                        <h3 className='fs-1 fw-bold text-center mb-4'>Why Choose Vander Engines ?</h3>
                        <div className="col-lg-3 mb-3">
                            <div className="card p-3 h-100">
                                <h5 className='text-center fw-bold'>Affordable & High-Quality Used Engines</h5>
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
            </div></div>
    )
}
