import React from 'react'
import Link from 'next/link'
import UsedTransmissionSlider from './UsedTransmissionSlider'

export default function UsedTransmission() {
    return (
        <div>

            <div className="find-transmission-head mt-3 head1">
                <h3 className="text-center">
                    About Our Used <span>Transmissions</span>{" "}
                </h3>

                <div className="find-transmission mb-5">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="find-transmission__content">
                                    Vander Engines Transmissions provides you the high quality
                                    used & remanufactured Transmissions. Vander Engines
                                    Transmissions is one of the most trusted supplier of the
                                    used transmissions in the United States and around the
                                    world. We have wide range of second hand transmissions at
                                    our yards, you can find second hand motors for every make
                                    and model. Our transmissions are highly tested and inspected
                                    before we deliver it to you. Vander engines transmissions
                                    provide you used transmissions at an affordable price. We
                                    also offer you upto 5 years warranty on our used
                                    transmissions. Our range includes remanufactured
                                    transmissions for brands like BMW, Ford, GMC, Nissan, Acura,
                                    Audi, Dodge, Hyundai, Honda, Kia, Jeep, Bentley, and many
                                    more.
                                </div>
                                <Link href="/transmission">
                                    <button className="btn theme-btn my-3">
                                        Discover More &#8594;
                                    </button>
                                </Link>
                            </div>
                            <div className="col-lg-6">
                               <UsedTransmissionSlider/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
