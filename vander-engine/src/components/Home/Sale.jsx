import React from "react";

export default function Sale() {
  return (
    <>
      <div className="sale__item text-center process mb-5 head1">
        <h3>Hurry Up! </h3>
        <h4>Sell Grade A Quality Engine & Transmission</h4>
      </div>
      <div className="sale my-5 py-4 text-white ">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-4">
              <h4>
                <a
                  href="tel:+18448931760"
                  target="_self"
                  aria-label="call us now"
                >
                  <i className="fas fa-phone me-2" id="phone"></i>
                </a>
                +1844-893-1760
              </h4>
            </div>
            <div className="col-lg-8">
              <div className="sale__content">
                <p>
                  Our Friendly Professionals Will Get the Part You Require! We
                  guarantee quick shipping of engines and transmissions, thanks
                  to our extensive inventory in our warehouse, getting you back
                  on the road in no time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
