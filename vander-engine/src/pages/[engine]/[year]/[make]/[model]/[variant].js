import { useEffect, useState } from "react";
import "@/components/Engine/Engine.css"
import Achievement from '@/components/Contact/Achievement';
import FindTransmission2 from '@/components/Transmission/FindTransmission2';
import Link from 'next/link';
import { useRouter } from "next/router";
import axios from "axios";
import "@/components/Engine/EngineForm.css"
import EngineList from "@/components/Home/EngineList";
import ReadMore from "@/components/Transmission/ReadMore";

export default function variant({
    showproduct,
    searchParams,
    setSearchParams,
    origin }) {
    const [phoneError, setPhoneError] = useState(""); // Error message for phone
    const [name, setName] = useState("");  // Correct initial state
    const [email, setEmail] = useState(""); // Correct initial state

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

    const [form1SuccessMessage, setForm1SuccessMessage] = useState("");
    const [loading, setLoading] = useState(false); // Added loading state

    const handleAddToCart = (product) => {
        // Logic to add the product to the cart
        console.log(product);
        // router.push("/addtocart")
    };
    const router = useRouter();
    const { year, make, model, variant } = router.query;
    const [engineDetails, setEngineDetails] = useState(null);
    useEffect(() => {
        // If all required parameters are available
        if (year && make && model) {
            const fetchProducts = async () => {
                try {
                    // Mock data structure to be replaced with actual API call
                    const transmissionData = await axios.get('https://backend.vanderengines.com/api/engines');

                    let data = [];

                    if (variant === "Display All") {
                        // If "Display All" is selected, fetch all variants for the selected year, make, and model
                        Object.entries(
                            transmissionData.data[year][make][model] || {}
                        ).forEach(([variantName, product]) => {
                            if (product) {
                                data.push({
                                    ...product,
                                    variant: variantName,
                                    year,
                                    make,
                                    model,
                                });
                            }
                        });
                    } else {
                        // If a specific variant is selected
                        const selectedVariantData = transmissionData.data[year][make][model][variant];
                        if (selectedVariantData) {
                            data.push({
                                ...selectedVariantData,
                                variant,
                                year,
                                make,
                                model,
                            });
                        }
                    }

                    setEngineDetails(data);
                } catch (error) {
                    console.error('Error fetching products:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchProducts();
        }
    }, [year, make, model, variant]);
    // useEffect(() => {
    //     if (!year || !make || !model || !variant) return;

    //     const fetchEngineDetails = async () => {
    //         try {
    //             const response = await axios.get(
    //                 `https://backend.vanderengines.com/api/engines/${year}/${make}/${model}/${variant}`
    //             );
    //             setEngineDetails(response.data);
    //             console.log(response.data)
    //         } catch (error) {
    //             console.error("Error fetching engine details:", error);
    //         }
    //     };

    //     fetchEngineDetails();
    // }, [year, make, model, variant]);

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
        axios
            .get("https://backend.vanderengines.com/api/engines")
            .then((response) => {
                const data = response.data;
                setTransmissionData(data);

                const uniqueYears = Object.keys(data);
                setYears(uniqueYears.filter((year) => year).sort());
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        if (selectedYear) {
            const yearData = transmissionData[selectedYear];
            setMakes(Object.keys(yearData || {}).filter((make) => make));
            setModels([]);
            setVariants([]);
            setSelectedMake("");
            setSelectedModel("");
            setSelectedVariant("");
        }
    }, [selectedYear, transmissionData]);

    useEffect(() => {
        if (selectedYear && selectedMake) {
            const makeData = transmissionData[selectedYear][selectedMake];
            setModels(Object.keys(makeData || {}).filter((model) => model));
            setVariants([]);
            setSelectedModel("");
            setSelectedVariant("");
        }
    }, [selectedYear, selectedMake, transmissionData]);

    useEffect(() => {
        if (selectedYear && selectedMake && selectedModel) {
            const modelData =
                transmissionData[selectedYear][selectedMake][selectedModel];
            const variantOptions = Object.keys(modelData || {}).filter(
                (variant) => variant
            );
            setVariants([...variantOptions, "Display All"]);
            setSelectedVariant("");
        }
    }, [selectedYear, selectedMake, selectedModel, transmissionData]);

    const handleSearch = (e) => {
        e.preventDefault();

        if (!selectedYear || !selectedMake || !selectedModel || !selectedVariant) {
            alert("Please select all fields before searching.");
            return;
        }
        //handlePhoneSubmit();
        // Skip phone validation if we are already on the product page (or if we are not submitting the form)
        const path = `/engine/${selectedYear}/${selectedMake}/${selectedModel}/${selectedVariant}`;

        router.push(path); // Navigate to the dynamic route based on selections

    };

    const handlePhoneSubmit = async () => {
        const error = validatePhoneNumber(phoneNumber);
        if (error) {
            alert(error); // Show the validation error directly
            return;
        }
        // Ensure the variant field is selected as part of the form submission
        if (!selectedVariant) {

            return;
        }

        if (phoneNumber.trim()) {
            setShowModal(false);
            const isPopupHandled = sessionStorage.getItem("hasSeenPopup");
            if (!isPopupHandled && isFirstSubmit) {
                await submitForm(); // Submit the form only the first time in this session
                sessionStorage.setItem("hasSeenPopup", "true"); // Mark the popup as handled for this session
                setIsFirstSubmit(false); // Mark as not the first submission
            }

            performSearch(); // Perform the search\
            setForm1SuccessMessage("Form submitted successfully! Thank you.");
        } else {
            alert("Please enter a valid phone number");
        }
    };

    const handlePhoneInputChange = (e) => {
        let value = e.target.value;

        // Ensure '+1' is always at the start
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

        // Map through the products to ensure proper values even if some are missing
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
    useEffect(() => {
        const initCarousel = () => {
            if (window.$ && window.$.fn && window.$.fn.owlCarousel) {
                $("#findengine").owlCarousel({
                    loop: true,
                    autoplay: true,
                    autoplayTimeout: 1000,
                    autoplayHoverPause: true,
                    items: 1,
                    dots: false,
                    nav: false,
                    animateOut: "fadeOut",
                    animateIn: "fadeIn",
                });
            } else {
                console.error("OwlCarousel or jQuery not available");
            }
        };

        // Delay the init to make sure scripts are loaded
        setTimeout(initCarousel, 500);
    }, []);
    const handleSubmite = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Perform form validation
        if (
            !selectedYear ||
            !selectedMake ||
            !selectedModel ||
            !selectedVariant ||
            !phoneNumber ||
            !name ||
            !email
        ) {
            // You can show an error message or alert if any required field is empty
            alert("Please fill out all fields before submitting.");
            return; // Stop further execution if validation fails
        }

        setLoading(true); // Start loading
        try {
            const formData = {
                part: "Engine",
                year: selectedYear,
                make: selectedMake,
                model: selectedModel,
                variant: selectedVariant,
                phone: phoneNumber,
                name: name,
                email: email,
                message: "",  // You can add a message if needed
                agreed: "Homepage1", // Adjust accordingly
            };

            const response = await axios.post(
                "https://backend.vanderengines.com/api/leads",
                formData
            );
            console.log(response.data);
            router.push('/thankyou'); // Navigate to thank you page after successful submission

            // Reset form fields after successful submission
            setSelectedYear("");
            setSelectedMake("");
            setSelectedModel("");
            setSelectedVariant("");
            setPhoneNumber("");
            setName("");
            setEmail("");
            setPhoneError(""); // Reset phone error state
        } catch (error) {
            console.error("There was an error submitting the form!", error);
            alert("There was an error submitting the form!");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleSubmitButtonClick = (e) => {
        e.preventDefault(); // Prevent any default behavior (in case you're inside a form)

        // Call the handleSubmit function when the button is clicked
        handleSubmite(e);
    };
    const content1 =
        "Vander Engines offers top-quality used engines across the United States. We collaborate with junkyards and salvage yards nationwide to ensure a wide selection of parts. When a customer requests an engine, our mechanical team carefully inspects all available options to find the perfect match, delivering the best deals, highest warranties, affordable prices, and quality engines. Vander Engines also frequently provides free shipping, helping you save between $100 and $250 on each part you need.";
    const content2 =
        "Our system also reviews post-delivery terms and conditions to ensure that if any part is defective or damaged, you have the option for returns and refunds. At Vander Engines, we ensure that you find the best-used engine with just a click, taking advantage of the best available offers. Don’t delay—fill out the form and receive a quote in your email instantly.";
    const content3 =
        "The engine is the core of your vehicle and essential for its longevity. Proper maintenance is crucial to keep it running smoothly. While high-quality engines can be costly, we offer a solution through our online support in the USA. At Vander Engines, you can explore a wide range of premium engines to suit any budget.";
    const content4 =
        "Rather than spending a fortune on a new engine, you can save both time and money by purchasing a used engine online. Vander Engines is a leading online seller of used engines, providing customized products at some of the most competitive prices in the industry.";
    return (
        <div>
            <title>Vander Engines | Quality Used & Remanufactured Engines </title>
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
                                    className="btn btn-block transmission-btn w-100 mt-4 text-white"
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

                {displayedProducts.length > 0 ? (
                    <div className="product-card-container">
                        {displayedProducts.map((product, index) => (
                            <div className="col-lg-3 mb-4" key={index}>
                                <div className="card product-card mx-2">
                                    <img
                                        src={product.image}
                                        alt="Product"
                                        className="img-fluid"
                                        style={{ height: "200px" }}
                                    />
                                    <div className="card-info">
                                        <h4>
                                            {product.year} {product.make} {product.model} Engine
                                        </h4>
                                        <p>
                                            <strong>Variant:</strong> {product.variant}
                                        </p>
                                        <p>
                                            <strong>Stock:</strong> {product.Stock}
                                        </p>
                                        <p>
                                            <strong>Warranty:</strong> {product.warranty}
                                        </p>
                                        <p>
                                            <strong>Price:</strong> {product.pricing}
                                        </p>
                                        <p>
                                            <strong>Miles:</strong> {product.miles}
                                        </p>
                                        <button
                                            className="btn buy-now-btn"
                                            onClick={() => {
                                                handleAddToCart({
                                                    id: product.Stock,
                                                    name: `${product.year} ${product.make} ${product.model} Engine`,
                                                    price: product.pricing,
                                                    model: product.model,
                                                    stockNumber: product.Stock,
                                                    variant: product.variant,
                                                    imageURL: product.image,
                                                    quantity: 1,
                                                });
                                                router.push("/addtocart");
                                            }}
                                        >
                                            Buy Now
                                        </button>



                                        <button
                                            className="add-to-cart-btn btn theme-btn"
                                            onClick={() => {

                                                handleAddToCart({
                                                    id: product.Stock,
                                                    name: `${product.year} ${product.make} ${product.model} Engine`,
                                                    price: product.pricing,
                                                    variant: product.variant,
                                                    stockNumber: product.Stock,
                                                    imageURL: product.image,
                                                    quantity: 1,
                                                });
                                            }}
                                        >
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p></p>
                )}

                {/*-------------------------Engine Transmission------------------------*/}
                <div className="find-transmission">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 text-center">
                                <h4 className="">
                                    Find Your <span>Engine </span>
                                </h4>
                                <FindTransmission2 />
                            </div>
                            <div className="col-lg-6">
                                <img
                                    src="/assets/engine-page-2.jpg"
                                    alt=""
                                    className=" mb-4"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-easing="ease-out-cubic"
                                    style={{ width: "75%" }}
                                />
                                <div className="col-lg-12">
                                    <div className="card">
                                        <a
                                            href="tel:+18448931760"
                                            target="_self"
                                            aria-label="call us now"
                                        >
                                            <i class="fa-solid fa-phone"></i>
                                        </a>
                                        <div className="card-body">
                                            <div className="card-title">
                                                <h6>SPEAK WITH A SPECIALIST NOW</h6>

                                                <h6 className="fs-4 text-center">+1 8448931760</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*-------------------------Achievements------------------------*/}
                <Achievement />
                {/*-------------------------About used Engine------------------------*/}
                {/* Show the introductory text first */}
                {displayedProducts.length === 0 ? (
                    <div className="find-transmission-head mt-3 head1">
                        <h3 className="text-center">
                            About Our Used
                            <span> Engine</span>
                        </h3>
                        <div className="find-engine">
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-lg-6">
                                        <div className="find-engine__content">
                                            <p>
                                                Vander Engines Transmissions provides you the high
                                                quality used & remanufactured Engines. Vander Engines
                                                Transmissions is one of the most trusted supplier of the
                                                used engines in the United States and around the world.
                                                We have wide range of second hand engines at our yards,
                                                you can find second hand motors for every make and
                                                model. Our engines are highly tested and inspected
                                                before we deliver it to you. Vander engines
                                                transmissions provide you used engines at an affordable
                                                price. We also offer you upto 5 years warranty on our
                                                used engines. Our range includes remanufactured engines
                                                for brands like BMW, Ford, GMC, Nissan, Acura, Audi,
                                                Dodge, Hyundai, Honda, Kia, Jeep, Bentley, and many
                                                more.
                                            </p>
                                        </div>
                                        <Link href="/engine">
                                            <button className="btn theme-btn my-3">
                                                Discover More &#8594;
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="col-lg-6">
                                        <div
                                            className="find-engine__img owl-carousel"
                                            id="findengine"
                                        >
                                            <img src="/assets/find-engine-1.jpg" alt="" />
                                            <img src="/assets/find-engine-2.jpg" alt="" />
                                            <img src="/assets/find-engine-3.jpg" alt="" />
                                            <img src="/assets/find-engine-4.jpg" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="find-transmission mt-3">
                        <h4 className="text-center">
                            About Our Used {displayedProducts[0].year}{" "}
                            {displayedProducts[0].make} <span>Engine</span>
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
                                                    {displayedProducts[0].year}{" "}
                                                    {displayedProducts[0].make}{" "}
                                                    {displayedProducts[0].model} Engine{" "}
                                                </span>
                                                AT Vander Engines Transmissions we have top quality used{" "}
                                                <span className="text-black fw-bold">
                                                    {" "}
                                                    {displayedProducts[0].make}{" "}
                                                    {displayedProducts[0].model} Engine for{" "}
                                                    {displayedProducts[0].year} variants
                                                </span>{" "}
                                                All the used engines that we sell are highly tested and
                                                inspected before we deliver it to you. At Vander Engines
                                                Transmissions we also offer you 1 year warranty at no
                                                extra cost. Vander Engines Transmissions team offer you
                                                24x7 support. We make sure to provide you with high
                                                performing engines for
                                                <span className="text-black fw-bold">
                                                    {" "}
                                                    {displayedProducts[0].make}{" "}
                                                    {displayedProducts[0].model}{" "}
                                                    {displayedProducts[0].year} .
                                                </span>
                                                We take pride in improving your online buying experience
                                                at Vander Engines Transmissions.
                                            </p>
                                        </div>
                                        <Link href="/engine">
                                            <button className="btn theme-btn my-3">
                                                Discover More &#8594;
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="col-lg-6">
                                        <div
                                            className="find-engine__img owl-carousel"
                                            id="findengine"
                                        >
                                            <img src="/assets/find-engine-1.jpg" alt="" />
                                            <img src="/assets/find-engine-2.jpg" alt="" />
                                            <img src="/assets/find-engine-3.jpg" alt="" />
                                            <img src="/assets/find-engine-4.jpg" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}{" "}


            </div >
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
        </div>
    )
}
