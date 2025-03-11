import React, { useState } from "react";

export default function TransmissionList() {
  const Transmissionlist = [
    { id: 1, imgSrc: "/assets/brand/15.png", name: "Acura Transmissions" },
    { id: 2, imgSrc: "/assets/brand/12.png", name: "Audi Transmissions" },
    { id: 3, imgSrc: "/assets/brand/13.png", name: "BMW Transmissions" },
    { id: 4, imgSrc: "/assets/brand/Buick-logo.png", name: "Buick Transmissions" },
    { id: 5, imgSrc: "/assets/brand/chevy.png", name: "Chevy Transmissions" },
    { id: 6, imgSrc: "/assets/brand/chrysler.png", name: "Chrysler Transmissions" },
    { id: 7, imgSrc: "/assets/brand/dodge.png", name: "Dodge Transmissions" },
    { id: 8, imgSrc: "/assets/brand/ford.png", name: "Ford Transmissions" },
    { id: 9, imgSrc: "/assets/brand/fiat.jpg", name: "Fiat Transmissions" },
    { id: 10, imgSrc: "/assets/brand/16.png", name: "Honda Transmissions" },
    { id: 11, imgSrc: "/assets/brand/hummer.png", name: "Hummer Transmissions" },
    { id: 12, imgSrc: "/assets/brand/8.png", name: "Hyundai Transmissions" },
    { id: 13, imgSrc: "/assets/brand/isuzu.png", name: "Isuzu Transmissions" },
    { id: 14, imgSrc: "/assets/brand/17.png", name: "Jaguar Transmissions" },
    { id: 15, imgSrc: "/assets/brand/jeep.png", name: "Jeep Transmissions" },
    { id: 16, imgSrc: "/assets/brand/7.png", name: "Kia Transmissions" },
    { id: 17, imgSrc: "/assets/brand/20.png", name: "Lexus Transmissions" },
    { id: 18, imgSrc: "/assets/brand/lin.png", name: "Lincoln Transmissions" },
    { id: 19, imgSrc: "/assets/brand/21.png", name: "Mazda Transmissions" },
    { id: 20, imgSrc: "/assets/brand/5.png", name: "Mercedes Transmissions" },
    { id: 21, imgSrc: "/assets/brand/4.png", name: "MINI Transmissions" },
    { id: 22, imgSrc: "/assets/brand/3.png", name: "Mitsubishi Transmissions" },
    { id: 23, imgSrc: "/assets/brand/2.png", name: "Nissan Transmissions" },
    { id: 24, imgSrc: "/assets/brand/olds.png", name: "Oldsmobile Transmissions" },
    { id: 25, imgSrc: "/assets/brand/pontiac.png", name: "Pontiac Transmissions" },
    { id: 26, imgSrc: "/assets/brand/1.png", name: "Porsche Transmissions" },
    { id: 27, imgSrc: "/assets/brand/saab.png", name: "Saab Transmissions" },
    { id: 28, imgSrc: "/assets/brand/27.png", name: "Saturn Transmissions" },
    { id: 29, imgSrc: "/assets/brand/25.png", name: "Subaru Transmissions" },
    { id: 30, imgSrc: "/assets/brand/24.png", name: "Suzuki Transmissions" },
    { id: 31, imgSrc: "/assets/brand/23.png", name: "Toyota Transmissions" },
    { id: 32, imgSrc: "/assets/brand/volks.png", name: "Volkswagen Transmissions" },
    { id: 33, imgSrc: "/assets/brand/cad.png", name: "Cadillac Transmissions" },
    { id: 34, imgSrc: "/assets/brand/gmc.png", name: "GMC Transmissions" },
    { id: 35, imgSrc: "/assets/brand/18.png", name: "Infiniti Transmissions" },
    { id: 36, imgSrc: "/assets/brand/6.png", name: "Land Rover Transmissions" },
    { id: 37, imgSrc: "/assets/brand/Mercury.png", name: "Mercury Transmissions" },
    { id: 38, imgSrc: "/assets/brand/ply.png", name: "Plymouth Transmissions" },
    { id: 39, imgSrc: "/assets/brand/26.png", name: "Scion Transmissions" },
    { id: 40, imgSrc: "/assets/brand/22.png", name: "Volvo Transmissions" },
  ];



  return (
    <div className="Transmission-list py-4">
      <div className="container-fluid">
        <div className="row align-items-center justify-content-center px-3">
          {Transmissionlist.map((item, index) => (
            <div key={item.id} className="col-lg-3 col-md-4 mb-3">
              {" "}
              <div className="card d-flex flex-row align-items-center justify-content-center" style={{ height: "3rem" }}>
                <img
                  src={item.imgSrc}
                  alt={item.name}
                  className="img-fluid"
                  style={{
                    height: "100%",
                    width: "2.5rem",
                    objectFit: "contain",
                  }}
                />
                <h6 className="card-title">{item.name}</h6>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
