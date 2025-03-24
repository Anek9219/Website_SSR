import React, { useEffect, useState } from "react";
import axios from "axios";
// import "@/components/Transmission/transmission.css";
import styles from "@/components/Transmission/transmission.module.css";
import "@/components/Transmission/Transmissionform";
import AOS from "aos";
import TransmissionList from "@/components/Home/TransmissionList";
import { useRouter } from "next/router";
import Transmissionform from "@/components/Transmission/Transmissionform";
import TransmissionContent from "@/components/Transmission/TransmissionContent";
import Head from "next/head";
import OrderTransmission from "@/components/Transmission/OrderTransmission";
export default function Transmission({ handleAddToCart, showproduct }) {
    const [years, setYears] = useState([]);
    const [makes, setMakes] = useState([]);
    const [data, setData] = useState(null);
    const router = useRouter();
    const canonicalUrl = `https://vanderengines.com${router.pathname}`;

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
            <Head>
                <title>Vander Engines | Quality Used & Remanufactured Transmissions</title>
                <meta name="description" content="Discover high-quality used and remanufactured transmissions at Vander Engines. Durable, performance-tested solutions for all vehicle types. Shop now!" />
                <link rel="canonical" href={canonicalUrl} />
            </Head>

            <main>
                <div className="transmission-upper d-flex flex-column">
                    <div className={styles.transmission_hero}></div>
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
                <TransmissionContent />
                {/*-------------------------Search Transmission------------------------*/}
                <div className="search-transmission my-4 head1">
                    <h3 className="text-center mb-3">
                        Search Your <span>Transmission</span>
                    </h3>
                    <TransmissionList />
                </div>
                <OrderTransmission />
            </main>

        </>
    );
}
