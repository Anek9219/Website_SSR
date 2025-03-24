import React from 'react'
import UsedEngineSlide from './UsedEngineSlide'
import style from "@/components/Transmission/transmission.module.css"
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
                                    At VanderEngines, we specialize in offering used motor engines for sale that are thoroughly inspected and tested for reliability. Our engine motors for sale come from trusted sources, ensuring high performance and longevity. We provide engines for every make and model, including Ford, Chevrolet, Toyota, Honda, BMW, Mercedes, and more. Whether you need a vehicle engine for sale or motors for sale near me, we have the perfect match for your vehicle.
                                    </p>
                                </div>
                                <Link href="/engine">
                                    <button className={`${style.theme_btn} btn my-3`}>
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
