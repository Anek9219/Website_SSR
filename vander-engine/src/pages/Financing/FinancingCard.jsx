import React from "react";

export default function FinancingCard() {
  const Card = [
    {
      imgSrc: "/assets/1.webp",
      head: "AFFIRM",
      para: "Buy now and pay later with affirm - get approved up to $6500.00",
      link: "https://www.affirm.com/user/signup",
    },
    {
      imgSrc: "/assets/2.webp",
      head: "SNAP",
      para: "Buy now and pay later with SNAP - get approved up to $5000.00",
      link: "https://snapfinance.com/",
    },
    {
      imgSrc: "/assets/3.webp",
      head: "PAY TOMORROW",
      para: "Buy now and pay later with PAY TOMORROW - get approved up to $6500.00",
      link: "https://www.paytomorrow.com/consumer-how-it-works",
    },
  ];
  return (
    <>
      <div className="financing-card my-5">
        <div className="container">
          <div className="row">
            {Card.map((item, index) => (
              <div className="col-lg-4 mb-5" key={index}>
                <div className="card d-flex flex-column justify-content-center align-items-center text-center pb-3">
                  <div className="card-img mb-3">
                    <img src={item.imgSrc} alt="" />
                  </div>
                  <div className="head fw-bold fs-4">{item.head}</div>
                  <div className="para">{item.para}</div>
                  <a href={item.link}>
                    <button className="btn theme-btn mt-4">Apply Here</button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pay p-4 about-content d-flex flex-column align-items-center my-5">
        <img
          src="/assets/paypal.webp"
          alt=""
          className="w-100 py-3"
          style={{ borderRadius: "40px" }}
        />
        <h4>PAY PAL CREDIT</h4>
        <p>Pay at your own pace with your PAY PAL account</p>
        <div className="d-grid">
          <a href="https://www.paypal.com/us/digital-wallet/ways-to-pay/credit-services/paypal-credit">
            <button type="button" className="btn click-btn">
              Click Here
            </button>
          </a>
        </div>
      </div>

      <div className="finance-content">
        <div className="container">
          <p>
            We’re thrilled to announce that we now offer PayPal as a payment
            option! Please note that all transactions processed through PayPal
            will be subject to a 2.9% processing fee. Feel free to give us a
            call for more information and details.
          </p>
        </div>
      </div>

      <div className="finance-plan process my-5">
        <div className="container">
          <h3>VANDER ENGINE PRICE FREEZE PLAN</h3>
          <div className="row align-items-center">
            <div className="col-lg-8">
              <p>
                Introducing the Vander Engine Freeze Plan, an exclusive
                opportunity for our valued customers. With the Vander Engine
                Freeze Plan, you can secure current pricing on our premium
                Vander Engine Products. This plan allows you to lock in the
                current price and make convenient payments towards your selected
                product, whether it’s an engine, transmission, transfer case,
                rear differential, or cylinder heads. The Vander Plan provides
                you with the flexibility to pay for your chosen product at your
                own pace until it’s fully paid off. Once your product is
                completely paid for, Vander Engines will promptly ship the item
                to you, ensuring you benefit from the exceptional value of the
                vander engine price. This unique offering allows you to take
                advantage of the great prices Vander Engines offers while
                providing a flexible payment option tailored to your needs.
                Experience the convenience and peace of mind with the Vander
                Engine Freeze Plan, securing your desired product at a locked-in
                price. Embrace this opportunity to invest in top-quality
                products from Vander Engines with ease and confidence. For
                further details and to enroll in the Vander Freeze Plan, please
                contact our dedicated team.
              </p>
            </div>
            <div className="col-lg-4">
              <img src="/assets/logo.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="finance-content mb-5">
        <div className="container">
          <p>
            If the product has NOT been shipped, a fee is $250 is assessed. Fees
            MUST be paid via bank or wire transfer.
          </p>
          <p>
            To utilize AFFIRM financing, a processing fee of $199.99 is incurred
            per complete order financed. If the product has NOT been shipped, a
            fee is $250 is assessed. Fees MUST be paid via bank or wire
            transfer.
          </p>
          <p>
            To utilize PAY TOMORROW financing, a processing fee of $199.99 is
            incurred per complete order financed. If the product has NOT been
            shipped, a fee of $250 is assessed. Fees MUST be paid via bank or
            wire transfer.
          </p>
        </div>
      </div>
    </>
  );
}
