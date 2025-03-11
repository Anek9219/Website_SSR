import React, { useEffect } from "react";
import AOS from "aos";

export default function Achievement() {
  useEffect(() => {
    // Initialize AOS
    AOS.init();
  }, []);
  const acheivecard = [
    {
      imgSrc: "/assets/40k.avif",
      head: "40k",
      head2: "Engines Sale",
    },
    {
      imgSrc: "/assets/4000plus.jpeg",
      head: "40,000+",
      head2: "Satisfied Customers",
    },
    {
      imgSrc: "/assets/oem.jpg",
      head: "Over 40",
      head2: "Million Used OEM Parts",
    },
    {
      imgSrc: "/assets/2000+.png",
      head: "2000+",
      head2: "Inventory Yards",
    },
  ];
  return (
    <>
      <div className="achivement my-3">
        <div className="container-fluid">
          <div className="row">
            {acheivecard.map((item, index) => (
              <div className="col-lg-3 mb-3" key={index}>
                <div
                  className="card d-flex flex-column align-items-center "
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-easing="ease-out-cubic"
                >
                  <div className="card-top" style={{ height: "100px" }}>
                    <img
                      src={item.imgSrc}
                      alt=""
                      className="img-fluid"
                      style={{ width: "100px" }}
                    />
                  </div>
                  <h5>{item.head}</h5>
                  <h6>{item.head2}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
