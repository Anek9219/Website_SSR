import React from 'react'
// import './transmission.css'
import styles from "./transmission.module.css"
export default function FindTransmission2() {
  return (
    <div className={`${styles.find_transmission} row `} >
    <div className="col-lg-6 mb-4 ">
      <div className={`${styles.transmission_card} border rounded`}>
        <i class="fa-solid fa-truck-droplet"></i>
        <div className="card-body">
          <h5 className="card-title">
            Flat Rate Shipping (Commercial address)
          </h5>
        </div>
      </div>
    </div>
    <div className="col-lg-6 mb-4">
      <div className={`${styles.transmission_card}  h-100 border rounded`}>
        <i class="fa-solid fa-award"></i>
        <div className="card-body">
          <h5 className="card-title">Up to 5 Years Warranty</h5>
        </div>
      </div>
    </div>
    <div className="col-lg-6 mb-4">
      <div className={`${styles.transmission_card} border rounded`}>
        <i class="fa-solid fa-headset"></i>
        <div className="card-body">
          <h5 className="card-title">Excellent Customer Support 24*7</h5>
        </div>
      </div>
    </div>
    <div className="col-lg-6 mb-4">
      <div className={`${styles.transmission_card} h-100 border rounded`}>
        <i class="fa-solid fa-dollar-sign"></i>
        <div className="card-body">
          <h5 className="card-title">No Core Charges</h5>
        </div>
      </div>
    </div>
  </div>
  )
}
