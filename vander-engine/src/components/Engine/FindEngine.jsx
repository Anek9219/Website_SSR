import React from 'react'
import FindTransmission2 from '../Transmission/FindTransmission2'
import styles from "@/components/Transmission/transmission.module.css"

export default function FindEngine() {
    return (
        <div>

            <div className={styles.find_transmission}>
                <div className="container">
                    <div className="row align-items-center">
                        <h4 className="text-center">
                            Buy High-Quality Used Engines for Sale <span>– Affordable & Reliable
                            </span>
                        </h4>
                        <p className='text-center'>Looking for used engines for sale? At VanderEngines, we provide top-quality second-hand motors for sale at affordable prices. Whether you need a rebuilt engine near me or a low-mileage auto engine for sale, we have a vast inventory that fits all vehicle makes and models.</p>
                        <div className="col-lg-6 text-center">


                            <FindTransmission2 />
                        </div>
                        <div className="col-lg-6">
                            <img
                                src="/assets/engine-page-2.jpg"
                                alt=""
                                className=" mb-4"
                                data-aos="fade-up"
                                data-aos-duration="1000"
                                data-aos-easing="ease-out-cubic"
                                style={{ width: "75%" }}
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
