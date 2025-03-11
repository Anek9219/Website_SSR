import React from "react";
export default function WhyChoose() {
  const card = [
    {
      imgSrc: "/assets/icon3.svg",
      head: "The Lowest Rates",
      para: "Engines & Transmissions Cost Starts At $800",
    },
    {
      imgSrc: "/assets/icon2.svg",
      head: "Standard Warranty",
      para: "We Offer A Warranty On All The Engines, Transmissions At No Addional Cost",
    },
    {
      imgSrc: "/assets/icon11.svg",
      head: "Free Shipping",
      para: "Free Shipping All Over US",
    },
    {
      imgSrc: "/assets/icon6.svg",
      head: "Grade A Quality",
      para: "Grade A Quality Parts - All The Engines Will Be Inspected By Certified Mechanics Before Shipped Out",
    },
  ];
  return (
    <>
      <div className="text-center why-text head1">
        <h3>
          Why Choose <span> Us</span>
        </h3>
      </div>
      <div className="why-choose  mt-3">
        <div className="container">
          <div className="row">
            {card.map((item, index) => (
              <div className="col-lg-3 mb-5" key={index}>
                <div className="card d-flex flex-column  align-items-center text-center h-100 pt-2 border-0">
                  <div className="card-img">
                    <img src={item.imgSrc} alt="img" />
                  </div>
                  <h5>{item.head}</h5>
                  <p>{item.para}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
