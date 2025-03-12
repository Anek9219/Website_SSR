import React from "react";
import './financing.css'
import FinancingCard from "./FinancingCard";
import { Helmet } from "react-helmet";
export default function Financing() {
  return (
    <>
     <Helmet>
    <title>Vander Engines | Financing</title>
  </Helmet>
    <div className="finance d-flex align-items-center justify-content-center mb-5">
    <div className="container">
          <h1 className="about-head-1 text-center">Financing</h1>
        </div>
    </div>
      <div className="financing">
        <div className="container about-content">
          <h3>Vander Financing</h3>
          <p>Vander Financing
          Vander Engines offers multiple financing options to help get your vehicle back on the road. You can even get pre-approved over the phone by calling us at +1 8448931760. To ease our customers minds, inquiries for most of our financing options do not affect your credit score.</p>
          <p>PLEASE NOTE: Our sales and finance team will assist you throughout the financing application procedure. Once your application is accepted, the financing company will make the payment to Vander Engines. If you choose to cancel the transaction after the payment has been processed by the financing company, a Transaction Cancellation Fee will be incurred.</p>
        </div>
      </div>
      <FinancingCard/>
    </>
  );
}
