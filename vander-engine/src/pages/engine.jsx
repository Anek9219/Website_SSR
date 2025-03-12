import React, { useEffect, useState } from "react";
import "../components/Engine/Engine.css"
import axios from "axios"; 
import AOS from "aos";
import { useRouter } from "next/router";
import EngineForm from "@/components/Engine/EngineForm";
import ReadMore from "@/components/Transmission/ReadMore";
import EngineList from "@/components/Home/EngineList";
import Variant from "./[category]/[year]/[make]/[model]/[variant]";
import EngineContent from "@/components/Engine/EngineContent";
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
     <EngineContent/>

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
