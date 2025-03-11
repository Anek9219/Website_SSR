import React, { useState } from "react";

export default function EngineList() {
  const enginelist = [
    { id: 1, imgSrc: "/assets/brand/15.png", name: "Acura Engines" },
    { id: 2, imgSrc: "/assets/brand/12.png", name: "Audi Engines" },
    { id: 3, imgSrc: "/assets/brand/13.png", name: "BMW Engines" },
    { id: 4, imgSrc: "/assets/brand/Buick-logo.png", name: "Buick Engines" },
    { id: 5, imgSrc: "/assets/brand/chevy.png", name: "Chevy Engines" },
    { id: 6, imgSrc: "/assets/brand/chrysler.png", name: "Chrysler Engines" },
    { id: 7, imgSrc: "/assets/brand/dodge.png", name: "Dodge Engines" },
    { id: 8, imgSrc: "/assets/brand/ford.png", name: "Ford Engines" },
    { id: 9, imgSrc: "/assets/brand/fiat.jpg", name: "Fiat Engines" },
    { id: 10, imgSrc: "/assets/brand/16.png", name: "Honda Engines" },
    { id: 11, imgSrc: "/assets/brand/hummer.png", name: "Hummer Engines" },
    { id: 12, imgSrc: "/assets/brand/8.png", name: "Hyundai Engines" },
    { id: 13, imgSrc: "/assets/brand/isuzu.png", name: "Isuzu Engines" },
    { id: 14, imgSrc: "/assets/brand/17.png", name: "Jaguar Engines" },
    { id: 15, imgSrc: "/assets/brand/jeep.png", name: "Jeep Engines" },
    { id: 16, imgSrc: "/assets/brand/7.png", name: "Kia Engines" },
    { id: 17, imgSrc: "/assets/brand/20.png", name: "Lexus Engines" },
    { id: 18, imgSrc: "/assets/brand/lin.png", name: "Lincoln Engines" },
    { id: 19, imgSrc: "/assets/brand/21.png", name: "Mazda Engines" },
    { id: 20, imgSrc: "/assets/brand/5.png", name: "Mercedes Engines" },
    { id: 21, imgSrc: "/assets/brand/4.png", name: "MINI Engines" },
    { id: 22, imgSrc: "/assets/brand/3.png", name: "Mitsubishi Engines" },
    { id: 23, imgSrc: "/assets/brand/2.png", name: "Nissan Engines" },
    { id: 24, imgSrc: "/assets/brand/olds.png", name: "Oldsmobile Engines" },
    { id: 25, imgSrc: "/assets/brand/pontiac.png", name: "Pontiac Engines" },
    { id: 26, imgSrc: "/assets/brand/1.png", name: "Porsche Engines" },
    { id: 27, imgSrc: "/assets/brand/saab.png", name: "Saab Engines" },
    { id: 28, imgSrc: "/assets/brand/27.png", name: "Saturn Engines" },
    { id: 29, imgSrc: "/assets/brand/25.png", name: "Subaru Engines" },
    { id: 30, imgSrc: "/assets/brand/24.png", name: "Suzuki Engines" },
    { id: 31, imgSrc: "/assets/brand/23.png", name: "Toyota Engines" },
    { id: 32, imgSrc: "/assets/brand/volks.png", name: "Volkswagen Engines" },
    { id: 33, imgSrc: "/assets/brand/cad.png", name: "Cadillac Engines" },
    { id: 34, imgSrc: "/assets/brand/gmc.png", name: "GMC Engines" },
    { id: 35, imgSrc: "/assets/brand/18.png", name: "Infiniti Engines" },
    { id: 36, imgSrc: "/assets/brand/6.png", name: "Land Rover Engines" },
    { id: 37, imgSrc: "/assets/brand/Mercury.png", name: "Mercury Engines" },
    { id: 38, imgSrc: "/assets/brand/ply.png", name: "Plymouth Engines" },
    { id: 39, imgSrc: "/assets/brand/26.png", name: "Scion Engines" },
    { id: 40, imgSrc: "/assets/brand/22.png", name: "Volvo Engines" },
  ];
  return (
    <div className="engine-list py-4">
      <div className="container-fluid">
        <div className="row align-items-center justify-content-center px-3">
          {enginelist.map((item, index) => (
            <div key={item.id} className="col-lg-3 col-md-4 mb-3">
              {" "}
              <div className="card d-flex flex-row align-items-center justify-content-center" style={{height:"3rem"}}>
                <img
                  src={item.imgSrc}
                  alt={item.name}
                    className="img-fluid"
                  style={{
                    height:"100%",
                    width:"2.5rem",
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
