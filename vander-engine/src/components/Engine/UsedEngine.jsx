import React from 'react'
import UsedEngineSlide from './UsedEngineSlide'
import Link from 'next/link'

export default function UsedEngine() {
    return (
        <div>
            <div className="find-transmission-head mt-3 head1">
                <h3 className="text-center">
                    About Our Used
                    <span> Engine</span>
                </h3>
                <div className="find-engine">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="find-engine__content">
                                    <p>
                                        Vander Engines Transmissions provides you the high
                                        quality used & remanufactured Engines. Vander Engines
                                        Transmissions is one of the most trusted supplier of the
                                        used engines in the United States and around the world.
                                        We have wide range of second hand engines at our yards,
                                        you can find second hand motors for every make and
                                        model. Our engines are highly tested and inspected
                                        before we deliver it to you. Vander engines
                                        transmissions provide you used engines at an affordable
                                        price. We also offer you upto 5 years warranty on our
                                        used engines. Our range includes remanufactured engines
                                        for brands like BMW, Ford, GMC, Nissan, Acura, Audi,
                                        Dodge, Hyundai, Honda, Kia, Jeep, Bentley, and many
                                        more.
                                    </p>
                                </div>
                                <Link href="/engine">
                                    <button className="btn theme-btn my-3">
                                        Discover More &#8594;
                                    </button>
                                </Link>
                            </div>
                            <div className="col-lg-6">
                              <UsedEngineSlide/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
