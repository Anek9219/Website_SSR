import React from "react";

export default function Shipping() {
  const shipping = [
    { imgSrc: "/assets/shipping-1.webp", head: "Top-Quality OEM Parts" },
    { imgSrc: "/assets/shipping-2.webp", head: "Free Shipping" },
    { imgSrc: "/assets/shipping-3.webp", head: "Return & Replacement Guarantee" },
  ];
  return (
    <>
     
      <div className="shipping mb-5 text-white">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-3">
              <p className="mb-0">Top & Trusted Supplier of used Engines & Transmissions .</p>
            </div>
            <div className="col-lg-9 bg-black">
              <div className="row">
                {shipping.map((item, index) => (
                  <div className="col-lg-4 text-center shipping-col" key={index} style={{ borderLeft: "1px solid #fff" }}>

                    <img src={item.imgSrc} alt="" width={50} />
                    <h6>{item.head}</h6>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
