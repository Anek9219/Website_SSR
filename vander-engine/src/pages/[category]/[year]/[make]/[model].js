import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";

export async function getServerSideProps({ params }) {
    const { category, year, make, model } = params;

    // Construct the canonical URL
    const canonicalUrl = `https://vanderengines.com/${category}/${year}/${make}/${model}`;

    // Fetch product data from API
    let product = null;
    try {
        const apiUrl =
            category === "engine"
                ? "https://backend.vanderengines.com/api/engines"
                : "https://backend.vanderengines.com/api/transmission";

        const response = await axios.get(`${apiUrl}/${year}/${make}/${model}`);
        product = response.data;
    } catch (error) {
        console.error(`Error fetching ${category} data:`, error);
    }

    return {
        props: { canonicalUrl, category, year, make, model, product },
    };
}


import { useEffect, useState } from "react";
import "@/components/Engine/Engine.css"
import Achievement from '@/components/Contact/Achievement';
import Link from 'next/link';
// import { useRouter } from "next/router";
// import axios from "axios";
import "@/components/Engine/EngineForm.css"
import EngineList from "@/components/Home/EngineList";
import TransmissionList from "@/components/Home/TransmissionList";
import EngineContent from "@/components/Engine/EngineContent";
import TransmissionContent from "@/components/Transmission/TransmissionContent";
import FindTransission from "@/components/Transmission/FindTransission";
import AchievementTransmission from "@/components/Contact/AchievementTransmission";
import FindEngine from "@/components/Engine/FindEngine";
import UsedEngine from "@/components/Engine/UsedEngine";
import UsedEngineSlide from "@/components/Engine/UsedEngineSlide";
import UsedTransmission from "@/components/Transmission/UsedTransmission";
import UsedTransmissionSlider from "@/components/Transmission/UsedTransmissionSlider";
import OrderEngine from "@/components/Engine/OrderEngine";
import OrderTransmission from "@/components/Transmission/OrderTransmission";
// import Head from "next/head";
export default function Model({ origin, canonicalUrl, category, year, make, model }) {
    const [phoneError, setPhoneError] = useState(""); // Error message for phone
    const [years, setYears] = useState([]);
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [variants, setVariants] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedVariant, setSelectedVariant] = useState("");
    const [transmissionData, setTransmissionData] = useState({});
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState("");
    const [isFirstSubmit, setIsFirstSubmit] = useState(true);
    const [product, setProduct] = useState(null);
    const [form1SuccessMessage, setForm1SuccessMessage] = useState("");
    const [loading, setLoading] = useState(false); // Added loading state
    const [variant, setVariant] = useState([]);
    const router = useRouter();
    // const { category, year, make, model } = router.query;


    useEffect(() => {
        if (category && year && make && model && variant) {
            const apiUrl =
                category === "engine"
                    ? "https://backend.vanderengines.com/api/engines"
                    : "https://backend.vanderengines.com/api/transmission";

            let requestUrl = `${apiUrl}/${year}/${make}/${model}`;

            // Append variant only if it's not "Display All"

            axios
                .get(requestUrl)
                .then((response) => {
                    setProduct(response.data);
                    setLoading(false);
                    console.log(response.data)
                })
                .catch((error) => {
                    console.error(`Error fetching ${category} data:`, error);
                    setLoading(false);
                });
        }
    }, [category, year, make, model, variant]);

    console.log("Received props:", origin);

    const validatePhoneNumber = (number) => {
        // Ensure the number always starts with '+1'
        if (!number.startsWith("+1")) {
            return "Phone number must start with +1.";
        }
        const numberWithoutPrefix = number.slice(2); // Remove '+1'

        const isValidLength = numberWithoutPrefix.length === 10; // Check for exactly 10 digits
        const isDigitsOnly = /^[0-9]+$/.test(numberWithoutPrefix); // Ensure only digits
        const noRepeatedDigits = /^(?!.*(\d)\1{6}).*$/; // Prevent more than 2 repeated digits
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
        return ""; // Valid number
    };
    useEffect(() => {
        const fetchYears = async () => {
            try {
                const apiUrl = category === 'engine'
                    ? 'https://backend.vanderengines.com/api/engines'
                    : 'https://backend.vanderengines.com/api/transmission';

                const response = await axios.get(apiUrl);
                const data = response.data;
                setTransmissionData(data);
                const uniqueYears = Object.keys(data);
                setYears(uniqueYears.filter(year => year).sort());
            } catch (error) {
                console.error('Error fetching years:', error);
            }
        };

        if (category) {
            fetchYears();
        }
    }, [category]);

    useEffect(() => {
        if (selectedYear) {
            const yearData = transmissionData[selectedYear];
            setMakes(Object.keys(yearData || {}).filter(make => make));
            setModels([]);
            setVariants([]);
            setSelectedMake('');
            setSelectedModel('');
            setSelectedVariant('');
        }
    }, [selectedYear, transmissionData]);

    useEffect(() => {
        if (selectedYear && selectedMake) {
            const makeData = transmissionData[selectedYear][selectedMake];
            setModels(Object.keys(makeData || {}).filter(model => model));
            setVariants([]);
            setSelectedModel('');
            setSelectedVariant('');
        }
    }, [selectedYear, selectedMake, transmissionData]);

    useEffect(() => {
        if (selectedYear && selectedMake && selectedModel) {
            const modelData = transmissionData[selectedYear][selectedMake][selectedModel];
            const variantOptions = Object.keys(modelData || {}).filter(variant => variant);
            setVariants([...variantOptions, 'Display All']);
            setSelectedVariant('');
        }
    }, [selectedYear, selectedMake, selectedModel, transmissionData]);

    const handleSearch = (e) => {
        e.preventDefault();

        if (!selectedYear || !selectedMake || !selectedModel || !selectedVariant) {
            alert('Please select all fields before searching.');
            return;
        }

        const path = category === 'engine'
            ? `/engine/${selectedYear}/${selectedMake}/${selectedModel}`
            : `/transmission/${selectedYear}/${selectedMake}/${selectedModel}`;
        router.push(path);
    };

    const handlePhoneSubmit = async () => {
        const error = validatePhoneNumber(phoneNumber);
        if (error) {
            alert(error);
            return;
        }
        if (!selectedVariant) {

            return;
        }
        if (phoneNumber.trim()) {
            setShowModal(false);
            const isPopupHandled = sessionStorage.getItem("hasSeenPopup");
            if (!isPopupHandled && isFirstSubmit) {
                await submitForm();
                sessionStorage.setItem("hasSeenPopup", "true");
                setIsFirstSubmit(false);
            }

            performSearch();
            setForm1SuccessMessage("Form submitted successfully! Thank you.");
        } else {
            alert("Please enter a valid phone number");
        }
    };

    const handlePhoneInputChange = (e) => {
        let value = e.target.value;
        if (!value.startsWith("+1")) {
            value = "+1" + value.replace(/[^0-9]/g, ""); // Re-add '+1' if missing and remove invalid characters
        } else {
            value = "+1" + value.slice(2).replace(/[^0-9]/g, ""); // Ensure only digits after '+1'
        }

        setPhoneNumber(value);
        setPhoneError(validatePhoneNumber(value)); // Update phoneError state dynamically
    };
    const performSearch = () => {
        let products = [];
        // Check if we are in "Display All" mode
        if (selectedVariant === "Display All") {
            // Iterate over all variants for the selected year, make, and model
            Object.entries(
                transmissionData[selectedYear][selectedMake][selectedModel] || {}
            ).forEach(([variant, product]) => {
                if (product) {
                    products.push({
                        ...product,
                        year: selectedYear,
                        make: selectedMake,
                        model: selectedModel,
                        variant,
                    });
                }
            });
        } else {
            // If a specific variant is selected, fetch data for that variant only
            const selectedProduct =
                transmissionData[selectedYear][selectedMake][selectedModel][selectedVariant];
            if (selectedProduct) {
                products.push({
                    ...selectedProduct,
                    year: selectedYear,
                    make: selectedMake,
                    model: selectedModel,
                    variant: selectedVariant,
                });
            }
        }
        products = products.map((product) => ({
            name: product.name || "N/A",
            Stock: product.Stock || "N/A",
            warranty: product.warranty || "N/A",
            tested_checked: product.tested_checked || "N/A",
            pricing: product.pricing || "N/A",
            image: product.image || "assets/img/default.jpg", // Default image if none exists
            miles: product.miles || "N/A",
            description: product.description || "N/A",
            variant: product.variant || "N/A",
            year: product.year || "N/A",
            make: product.make || "N/A",
            model: product.model || "N/A",
        }));

        // Update the state with the fetched products
        setDisplayedProducts(products);
    };


    const submitForm = async () => {
        const formData = {
            part: "MyformEngine",
            year: selectedYear,
            make: selectedMake,
            model: selectedModel,
            variant: selectedVariant,
            phone: phoneNumber,
        };

        try {
            const response = await axios.post(
                "https://backend.vanderengines.com/api/leads",
                formData
            );
            console.log(formData)
            console.log(response.data);
            setForm1SuccessMessage("Form submitted successfully! Thank you.");
            setSelectedYear("");
            setSelectedMake("");
            setSelectedModel("");
            setSelectedVariant("");
            setPhoneNumber("");
        } catch (error) {
            console.error("There was an error submitting the form!", error);
            // Swal.fire("Error", "There was an error submitting the form!", "error");
        }
    };

    const handleYearChange = (e) => {
        const year = e.target.value;
        setSelectedYear(year); // Update selected year
        setSelectedMake(""); // Reset make
        setSelectedModel(""); // Reset model
        setSelectedVariant(""); // Reset variant
        setMakes([]); // Clear makes
        setModels([]); // Clear models
        setVariants([]); // Clear variants
    };
    //-------------------------------------------------
    if (category == "engine") {
        const handleAddToCart = (item) => {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProduct = cartItems.find(cartItem => cartItem.id === item.Stock);

            console.log(item);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cartItems.push({
                    id: item.Stock,
                    name: `${year} ${item.make} ${item.model} Engine`,
                    price: item.pricing,
                    variant: item.variant,
                    stockNumber: item.Stock,
                    imageURL: item.image || "assets/img/default.jpg",
                    quantity: 1,
                });
            }

            localStorage.setItem('cart', JSON.stringify(cartItems));
            alert('Product added to cart!');
        };
        return (
            <div>
                <Head>
                    <title>Vander Engines | Quality Used & Remanufactured Engines </title>
                    <link rel="canonical" href={canonicalUrl} />
                </Head>
                <div className="engine-upper d-flex flex-column">
                    <div className="engine-hero "></div>
                </div>
                <div className="container">
                    <div className="transmission-form text-white container mt-4" id="engine-form">
                        <div className="row">
                            <div className="col-lg-6">
                                <span className="me-3">Search Your Engine Here</span>
                            </div>
                        </div>
                        <form onSubmit={handleSearch} >
                            <div className="row">
                                <div className="col-md-3 col-6 mb-3">
                                    <select
                                        className="form-select"
                                        value={selectedYear}
                                        onChange={handleYearChange}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select a year
                                        </option>
                                        {years.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-3 col-6 mb-3">
                                    <select
                                        className="form-select"
                                        value={selectedMake}
                                        onChange={(e) => setSelectedMake(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select a make
                                        </option>
                                        {makes.map((make) => (
                                            <option key={make} value={make}>
                                                {make}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-3 col-6 mb-3">
                                    <select
                                        className="form-select"
                                        value={selectedModel}
                                        onChange={(e) => setSelectedModel(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select a model
                                        </option>
                                        {models.map((model) => (
                                            <option key={model} value={model}>
                                                {model}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-3 col-6 mb-3">
                                    <select
                                        className="form-select "
                                        value={selectedVariant}
                                        onChange={(e) => setSelectedVariant(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select a variant
                                        </option>
                                        {variants.map((variant) => (
                                            <option key={variant} value={variant}>
                                                {variant}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="modal-body col-md-6 px-3">
                                    <p className="modal-title" style={{ color: "black" }}>
                                        Enter your Phone Number
                                    </p>
                                    <input
                                        type="tel"
                                        className={`form-control ${phoneError ? "is-invalid" : ""}`}
                                        placeholder="Enter your phone number"
                                        value={phoneNumber || "+1"} // Default to '+1'
                                        onChange={handlePhoneInputChange}
                                        required
                                        maxLength="12" // Include '+1' in the length
                                        style={{
                                            border: "none",
                                            borderRadius: "0",
                                            borderBottom: "1px solid #cccdd1",
                                        }}
                                    />
                                    {phoneError && <div className="text-danger">{phoneError}</div>}
                                </div>
                                <div className="col-md-4">
                                    <button
                                        type="submit"
                                        className="btn btn-block  w-100 mt-4 text-white bg-dark"
                                        onClick={handlePhoneSubmit}
                                        style={{ background: "black !important" }}
                                    >
                                        Search
                                    </button>
                                    <div>
                                        {form1SuccessMessage && <p className="text-success">{form1SuccessMessage}</p>}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : product && product.length > 0 ? (
                        <div className="product-card-container">
                            {product.map((item) => (
                                <div className="col-lg-3 mb-4" key={item.Stock}>
                                    <div className="card product-card mx-2 h-100">
                                        <img
                                            src={item.image || "assets/img/default.jpg"}
                                            alt="Product"
                                            className="img-fluid"
                                            style={{ height: "200px" }}
                                        />
                                        <div className="card-info">
                                            <h4>
                                                {year} {item.make} {item.model} Engine
                                            </h4>
                                            <p>
                                                <strong>Variant:</strong> {item.variant || "N/A"}
                                            </p>
                                            <p>
                                                <strong>Stock:</strong> {item.Stock}
                                            </p>
                                            <p>
                                                <strong>Warranty:</strong> {item.warranty}
                                            </p>
                                            <p>
                                                <strong>Price:</strong> {item.pricing}
                                            </p>
                                            <p>
                                                <strong>Miles:</strong> {item.miles || "N/A"}
                                            </p>
                                            <button
                                                className="btn buy-now-btn"
                                                onClick={() => {
                                                    handleAddToCart(item);
                                                    router.push("/addtocart");
                                                }}
                                            >
                                                Buy Now
                                            </button>
                                            <button
                                                className="add-to-cart-btn btn theme-btn"
                                                onClick={() => {
                                                    handleAddToCart(item)
                                                    router.push("/addtocart");
                                                }
                                                }
                                            >
                                                Add To Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Engine details not found.</p>
                    )}
                    {/*-------------------------Engine Transmission------------------------*/}
                    <FindEngine />
                    {/*-------------------------Achievements------------------------*/}
                    <Achievement />
                    {/*-------------------------About used Engine------------------------*/}
                    {/* Show the introductory text first */}
                    {product === 0 ? (
                        <>
                            <UsedEngine />
                        </>
                    ) : (
                        <div className="find-transmission mt-3">
                            <h4 className="text-center">
                                About Our Used {year}{" "}
                                {make} <span>Engine</span>
                            </h4>

                            <div className="find-engine">
                                <div className="container">
                                    <div className="row align-items-center">
                                        <div className="col-lg-6">
                                            <div className="find-engine__content">

                                                <p>
                                                    Find high quality
                                                    <span className="text-black fw-bold">
                                                        {" "}
                                                        {year}{" "}
                                                        {make}{" "}
                                                        {model} Engine{" "}
                                                    </span>
                                                    At VanderEngines, we specialize in offering used{" "}
                                                    <span className="text-black fw-bold">
                                                        {" "}
                                                        {make}{" "}
                                                        {model} Engine for{" "}
                                                        {year} variants
                                                    </span>{" "}
                                                    that are thoroughly inspected and tested for reliability. Our engine motors for sale come from trusted sources, ensuring high performance and longevity. We provide engines for
                                                    <span className="text-black fw-bold">
                                                        {" "}
                                                        {make}{" "}
                                                        {model}{" "}
                                                        {year} ,
                                                    </span>
                                                    we have the perfect match for your vehicle.
                                                </p>
                                            </div>
                                            <Link href="/engine">
                                                <button className="btn theme-btn my-3">
                                                    Discover More &#8594;
                                                </button>
                                            </Link>
                                        </div>
                                        <div className="col-lg-6">
                                            <UsedEngineSlide />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}{" "}


                </div >
                {/*-------------------------Content of Engine-----------------------*/}
                <EngineContent />
                {/*-------------------------Search Engine------------------------*/}
                <div className="search-transmission my-4 head1">
                    <h3 className="text-center mb-3">
                        Search Your <span>Engine</span>
                    </h3>
                    <EngineList />
                </div>
                <OrderEngine />
            </div>
        )
    }
    else if (category === "transmission") {

        const handleAddToCart = (item) => {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProduct = cartItems.find(cartItem => cartItem.id === item.Stock);

            console.log(item);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cartItems.push({
                    id: item.Stock,
                    name: `${year} ${item.make} ${item.model} Transmission`,
                    price: item.pricing,
                    variant: item.variant,
                    stockNumber: item.Stock,
                    imageURL: item.image || "assets/img/default.jpg",
                    quantity: 1,
                });
            }

            localStorage.setItem('cart', JSON.stringify(cartItems));
            alert('Product added to cart!');
        };
        return (
            <>
                <div>
                    <Head>
                        <title>
                            Vander Engines | Quality Used & Remanufactured Transmissions
                        </title>
                        <link rel="canonical" href={canonicalUrl} />
                    </Head>
                    <div className="transmission-upper d-flex flex-column">
                        <div className="transmission-hero"></div>
                    </div>
                    <div className="container">
                        <div className="transmission-form text-white container mb-5 mt-4" id="trans-form">
                            <div className="row">
                                <div className="col-lg-6">
                                    <span className="me-3">Search Your Transmission Here</span>
                                </div>
                            </div>
                            <form onSubmit={handleSearch}>
                                <div className="row">
                                    {/* Form Inputs */}
                                    <div className="col-md-3 col-6 mb-3">
                                        <select
                                            className="form-select"
                                            value={selectedYear}
                                            onChange={handleYearChange} // Use the new handler here
                                            required
                                        >
                                            <option value="" disabled>
                                                Select a year
                                            </option>
                                            {years.map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-3 col-6 mb-3">
                                        <select
                                            className="form-select"
                                            value={selectedMake}
                                            onChange={(e) => setSelectedMake(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>
                                                Select a make
                                            </option>
                                            {makes.map((make) => (
                                                <option key={make} value={make}>
                                                    {make}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-3 col-6 mb-3">
                                        <select
                                            className="form-select"
                                            value={selectedModel}
                                            onChange={(e) => setSelectedModel(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>
                                                Select a model
                                            </option>
                                            {models.map((model) => (
                                                <option key={model} value={model}>
                                                    {model}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-3 col-6 mb-3">
                                        <select
                                            className="form-select"
                                            value={selectedVariant}
                                            onChange={(e) => setSelectedVariant(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>
                                                Select a variant
                                            </option>
                                            {variants.map((variant) => (
                                                <option key={variant} value={variant}>
                                                    {variant}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="modal-body col-md-6 px-3">
                                        <p className="modal-title" style={{ color: "black" }}>
                                            Enter your Phone Number
                                        </p>
                                        <input
                                            type="tel"
                                            className={`form-control ${phoneError ? "is-invalid" : ""}`}
                                            placeholder="Enter your phone number"
                                            value={phoneNumber || "+1"} // Default to '+1'
                                            onChange={handlePhoneInputChange}
                                            required
                                            maxLength="12" // Include '+1' in the length
                                            style={{
                                                border: "none",
                                                borderRadius: "0",
                                                borderBottom: "1px solid #cccdd1",
                                            }}
                                        />
                                        {phoneError && <div className="text-danger">{phoneError}</div>}
                                    </div>
                                    <div className="col-md-4">
                                        <button
                                            type="submit"
                                            className="btn btn-block transmission-btn w-100 mt-4 text-white bg-dark"
                                            onClick={handlePhoneSubmit}
                                        >
                                            Search
                                        </button>
                                        <div>
                                            {form1SuccessMessage && <p className="text-success">{form1SuccessMessage}</p>}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {loading ? (
                            <p>Loading...</p>
                        ) : product && product.length > 0 ? (
                            <div className="product-card-container">
                                {product.map((item) => (
                                    <div className="col-lg-3 mb-4" key={item.Stock}>
                                        <div className="card product-card mx-2">
                                            <img
                                                src={item.image || "assets/img/default.jpg"}
                                                alt="Product"
                                                className="img-fluid"
                                                style={{ height: "200px" }}
                                            />
                                            <div className="card-info">
                                                <h4>
                                                    {year} {item.make} {item.model} Transmission
                                                </h4>
                                                <p>
                                                    <strong>Variant:</strong> {item.variant || "N/A"}
                                                </p>
                                                <p>
                                                    <strong>Stock:</strong> {item.Stock}
                                                </p>
                                                <p>
                                                    <strong>Warranty:</strong> {item.warranty}
                                                </p>
                                                <p>
                                                    <strong>Price:</strong> {item.pricing}
                                                </p>
                                                <p>
                                                    <strong>Miles:</strong> {item.miles || "N/A"}
                                                </p>
                                                <button
                                                    className="btn buy-now-btn"
                                                    onClick={() => {
                                                        handleAddToCart(item);
                                                        router.push("/addtocart");
                                                    }}
                                                >
                                                    Buy Now
                                                </button>
                                                <button
                                                    className="add-to-cart-btn btn theme-btn"
                                                    onClick={() => {
                                                        handleAddToCart(item)
                                                        router.push("/addtocart");
                                                    }
                                                    }

                                                >
                                                    Add To Cart
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Transmission details not found.</p>
                        )}



                        {/*-------------------------Engine Transmission------------------------*/}
                        <FindTransission />
                        {/*-------------------------Achievements------------------------*/}
                        <AchievementTransmission />
                        {/*-------------------------About used Engine------------------------*/}
                        {/* Show the introductory text first */}
                        {product === 0 ? (
                            <UsedTransmission />
                        ) : (
                            <div className="find-transmission mt-3">
                                <h4 className="text-center">
                                    About Our Used {year}{" "}
                                    {make} <span> Transmission</span>
                                </h4>
                                <div className="find-transmission ">
                                    <div className="container">
                                        <div className="row align-items-center">
                                            <div className="col-lg-6">
                                                <div className="find-transmission__content">
                                                    <p>
                                                        Find high quality
                                                        <span className="text-black fw-bold">
                                                            {" "}
                                                            {year} {make}{" "}
                                                            {model} Transmission{" "}
                                                        </span>
                                                        At VanderEngines, we specialize in offering used{" "}
                                                        <span className="text-black fw-bold">
                                                            {" "}
                                                            {make} {model}{" "}
                                                            transmission for {year} variants
                                                        </span>{" "}
                                                        that are thoroughly inspected and tested for durability. Our transmission for sale options include automatic and manual transmissions for
                                                        <span className="text-black fw-bold">
                                                            {" "}
                                                            {" "}
                                                            {make} {model}{" "}
                                                            {year} , {" "}
                                                        </span>
                                                        we have a solution tailored to your needs.
                                                    </p>
                                                </div>

                                                <Link href="/engine">
                                                    <button className="btn theme-btn my-3">
                                                        Discover More &#8594;
                                                    </button>
                                                </Link>
                                            </div>
                                            <div className="col-lg-6">
                                                <UsedTransmissionSlider />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}{" "}
                    </div >
                    {/*-------------------------Content of Engine-----------------------*/}
                    <TransmissionContent />
                    {/*-------------------------Search Engine------------------------*/}
                    <div className="search-transmission my-5 head1">
                        <h3 className="text-center mb-3">
                            Search Your <span>Transmission</span>
                        </h3>
                        <TransmissionList />
                    </div>
                    <OrderTransmission />
                </div>
            </>
        )
    }
}
