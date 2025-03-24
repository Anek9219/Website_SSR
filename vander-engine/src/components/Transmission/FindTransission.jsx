import React from 'react'
import FindTransmission2 from './FindTransmission2'
import styles from "./transmission.module.css"

export default function FindTransission() {
    return (
        <div>

            <div className={styles.find_transmission}>
                <div className="container">
                    <div className="row align-items-center">
                        <h4 className="text-center">
                            Buy High-Quality Used Transmissions for Sale <span>– Affordable & Reliable
                            </span>
                        </h4>
                        <p className='text-center'>Looking for used transmissions for sale? At VanderEngines, we provide top-quality low mileage used transmissions at affordable prices. Whether you need a cheap transmission or a premium option, we have a vast inventory to meet your needs. We supply transmissions for every make and model, ensuring you get the perfect fit for your vehicle.</p>
                        <div className="col-lg-6 text-center ">
                            <FindTransmission2 />
                        </div>
                        <div className="col-lg-6">
                            <img
                                src="/assets/trans-2.jpg"
                                alt=""
                                className="img-fluid"
                                data-aos="fade-up"
                                data-aos-duration="1000"
                                data-aos-easing="ease-out-cubic"
                            />
                            <div className="col-lg-12">
                                <div className={`${styles.transmission_card} border rounded`}>
                                    <a
                                        href="tel:+18448931760"
                                        target="_self"
                                        aria-label="call us now"
                                    >
                                        <i class="fa-solid fa-phone"></i>
                                    </a>
                                    <div className="card-body">
                                        <div className="card-title">
                                            <h6>SPEAK WITH A SPECIALIST NOW</h6>
                                            <h6 className="fs-4 text-center">+1 8448931760</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
