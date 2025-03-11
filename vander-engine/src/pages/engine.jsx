import React, { useEffect, useState } from "react";
import "../components/Engine/Engine.css"
import axios from "axios"; 
import AOS from "aos";
import { useRouter } from "next/router";
import EngineForm from "@/components/Engine/EngineForm";
import ReadMore from "@/components/Transmission/ReadMore";
import EngineList from "@/components/Home/EngineList";
export default function Engine({ handleAddToCart, showproduct }) {
  const [years, setYears] = useState([]);
  const [makes, setMakes] = useState([]);
  const [data, setData] = useState(null);
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({});
  useEffect(() => {
    AOS.init();
  }, []);
  const [formData, setFormData] = useState({
    part: "",
    make: "",
    model: "",
    year: "",
    variant: "",
    name: "",
    phone: "+1",
    email: "",
    message: "",
    agreed: "",
  });
  useEffect(() => {
    if (formData.part) {
      const apiURL =
        formData.part === "Engine"
          ? "https://backend.vanderengines.com/api/engines"
          : "https://backend.vanderengines.com/api/transmission";

      axios
        .get(apiURL)
        .then((response) => {
          setData(response.data);
          const allMakes = new Set();
          Object.keys(response.data).forEach((year) => {
            Object.keys(response.data[year]).forEach((make) => {
              allMakes.add(make);
            });
          });
          setMakes([...allMakes]);
          setYears(Object.keys(response.data)); 
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [formData.part]);
  const { year, make, model } = router.query;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://backend.vanderengines.com/api/engines/${year}/${make}/${model}`
        );
        console.log("Engine Data:", response.data);
      } catch (error) {
        console.error("Error fetching engine data:", error);
      }
    };

    if (year && make && model) {
      fetchData();
    }
  }, [year, make, model]);
  const content1 =
    "Vander Engines offers top-quality used engines across the United States. We collaborate with junkyards and salvage yards nationwide to ensure a wide selection of parts. When a customer requests an engine, our mechanical team carefully inspects all available options to find the perfect match, delivering the best deals, highest warranties, affordable prices, and quality engines. Vander Engines also frequently provides free shipping, helping you save between $100 and $250 on each part you need.";
  const content2 =
    "Our system also reviews post-delivery terms and conditions to ensure that if any part is defective or damaged, you have the option for returns and refunds. At Vander Engines, we ensure that you find the best-used engine with just a click, taking advantage of the best available offers. Don’t delay—fill out the form and receive a quote in your email instantly.";
  const content3 =
    "The engine is the core of your vehicle and essential for its longevity. Proper maintenance is crucial to keep it running smoothly. While high-quality engines can be costly, we offer a solution through our online support in the USA. At Vander Engines, you can explore a wide range of premium engines to suit any budget.";
  const content4 =
    "Rather than spending a fortune on a new engine, you can save both time and money by purchasing a used engine online. Vander Engines is a leading online seller of used engines, providing customized products at some of the most competitive prices in the industry.";

  return (
    <>
        <title>Vander Engines | Quality Used & Remanufactured Engines </title>
      <div className="engine-upper d-flex flex-column">
        <div className="engine-hero "></div>
        </div>
      {/*-------------------------Engine Hero Section-----------------------*/}

      <div className=" d-flex flex-column h-100 justify-content-end">
        <EngineForm
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          handleAddToCart={handleAddToCart}
          showproduct={showproduct}
          origin="Engine"
        />
      </div>
      {/*-------------------------Content of Engine-----------------------*/}
      <div className="transmission-content mt-5">
        <div className="container h-100 d-flex align-items-center justify-content-center">
          <h5>
            Used Engines for Sale: Your Go-To Source for Quality Auto Parts
          </h5>
        </div>
      </div>
      <div className="transmission-para my-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 mb-3">
              <div className="card p-3 h-100">
                <ReadMore text={content1} />
              </div>
            </div>
            <div className="col-lg-3 mb-3">
              <div className="card p-3 h-100">
                <ReadMore text={content2} />
              </div>
            </div>
            <div className="col-lg-3 mb-3">
              <div className="card p-3 h-100">
                <ReadMore text={content3} />
              </div>
            </div>
            <div className="col-lg-3 mb-3">
              <div className="card p-3 h-100">
                <ReadMore text={content4} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*-------------------------Search Engine------------------------*/}
      <div className="search-transmission my-5 head1">
        <h3 className="text-center mb-3">
          Search Your <span>Engine</span>
        </h3>
        <EngineList />
      </div>
    </>
  );
}




// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const EngineVariant = () => {
//   // Access the dynamic query parameters
//   const router = useRouter();
//   const { year, make, model, variant } = router.query;

//   const [engineDetails, setEngineDetails] = useState(null);

//   useEffect(() => {
//     if (!year || !make || !model || !variant) return;

//     const fetchEngineDetails = async () => {
//       try {
//         const response = await axios.get(
//           `https://backend.vanderengines.com/api/engines/${year}/${make}/${model}/${variant}`
//         );
//         setEngineDetails(response.data);
//       } catch (error) {
//         console.error("Error fetching engine details:", error);
//       }
//     };

//     fetchEngineDetails();
//   }, [year, make, model, variant]);

//   if (!engineDetails) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>{engineDetails.name}</h1>
//       <p><strong>Year:</strong> {engineDetails.year}</p>
//       <p><strong>Make:</strong> {engineDetails.make}</p>
//       <p><strong>Model:</strong> {engineDetails.model}</p>
//       <p><strong>Variant:</strong> {engineDetails.variant}</p>
//       <p><strong>Price:</strong> {engineDetails.pricing}</p>
//       <p><strong>Stock:</strong> {engineDetails.stock}</p>
//       <p><strong>Warranty:</strong> {engineDetails.warranty}</p>
//     </div>
//   );
// };

// export default EngineVariant;
