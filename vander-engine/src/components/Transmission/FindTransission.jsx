import React from 'react'
import FindTransmission2 from './FindTransmission2'

export default function FindTransission() {
    return (
        <div>

            <div className="find-transmission">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 text-center ">
                            <h4 className="">
                                Find Your <span>Transmission </span>
                            </h4>
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
                                <div className="card">
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
