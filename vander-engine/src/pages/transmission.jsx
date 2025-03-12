import React, { useEffect, useState } from "react";
import axios from "axios";
import "@/components/Transmission/transmission.css";
import "@/components/Transmission/Transmissionform";
import AOS from "aos";
import TransmissionList from "@/components/Home/TransmissionList";
import ReadMore from "@/components/Transmission/ReadMore";
import { useRouter } from "next/router";
import Transmissionform from "@/components/Transmission/Transmissionform";
import TransmissionContent from "@/components/Transmission/TransmissionContent";
export default function Transmission({ handleAddToCart, showproduct }) {
    const [phoneError, setPhoneError] = useState("");
    const [years, setYears] = useState([]);
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [variants, setVariants] = useState([]);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [searchParams, setSearchParams] = useState({});
    const validatePhoneNumber = (number) => {
        if (!number.startsWith("+1")) {
            return "Phone number must start with +1.";
        }
        const numberWithoutPrefix = number.slice(2);
        const isValidLength = numberWithoutPrefix.length === 10; 
        const isDigitsOnly = /^[0-9]+$/.test(numberWithoutPrefix);
        const noRepeatedDigits = /^(?!.*(\d)\1{6}).*$/;
        const dummyNumbers = [
            "1234567890",
            "9876543210",
            "1111111111",
            "2222222222",
        ];
        if (!isValidLength) {
            return "Phone number must be exactly 10 digits after +1.";
        }
        if (!isDigitsOnly) {
            return "Phone number can only contain digits.";
        }
        if (dummyNumbers.includes(numberWithoutPrefix)) {
            return "Phone number cannot be a common dummy number.";
        }
        if (!noRepeatedDigits.test(numberWithoutPrefix)) {
            return "Phone number cannot have more than 6 consecutive repeated digits.";
        }
        return "";
    };
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
    const { year, make, model, variant } = router.query;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://backend.vanderengines.com/api/transmission/${year}/${make}/${model}`
                );
                console.log("Transmission Data:", response.data);
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
            <title>
                Vander Engines | Quality Used & Remanufactured Transmissions
            </title>
            <div className="transmission-upper d-flex flex-column">
                <div className="transmission-hero"></div>
            </div>
            {/*-------------------------Transmission- Hero-----------------------*/}
            <div className="d-flex flex-column h-100 justify-content-end ">
                <Transmissionform
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    handleAddToCart={handleAddToCart}
                    showproduct={showproduct}
                />
            </div>
            {/*-------------------------Content of Transmission------------------------*/}
           <TransmissionContent/>
            {/*-------------------------Search Transmission------------------------*/}
            <div className="search-transmission my-4 head1">
                <h3 className="text-center mb-3">
                    Search Your <span>Transmission</span>
                </h3>
                <TransmissionList />
            </div>
        </>
    );
}
