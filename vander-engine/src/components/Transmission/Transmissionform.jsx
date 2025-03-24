import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import FindTransmission2 from "./FindTransmission2";
import AchievementTransmission from "../Contact/AchievementTransmission";
// import "./TransmissionForm.css"
import styles from "./transmission.module.css";
import FindTransission from "./FindTransission";
export default function Transmissionform({
  handleAddToCart,
  origin
}) {
  const [phoneError, setPhoneError] = useState("");
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
  const router = useRouter();
  console.log("Received props:", origin);

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
    axios
      .get("https://backend.vanderengines.com/api/transmission")
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
    const path = `/transmission/${selectedYear}/${selectedMake}/${selectedModel}`;
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
      await submitForm();
      performSearch();
      setForm1SuccessMessage("Form submitted successfully! Thank you.");
    } else {
      alert("Please enter a valid phone number");
    }
  };
  const handlePhoneInputChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith("+1")) {
      value = "+1" + value.replace(/[^0-9]/g, "");
    } else {
      value = "+1" + value.slice(2).replace(/[^0-9]/g, "");
    }
    setPhoneNumber(value);
    setPhoneError(validatePhoneNumber(value));
  };
  const performSearch = () => {
    let products = [];
    if (selectedVariant === "Display All") {
      Object.entries(
        transmissionData[selectedYear][selectedMake][selectedModel] || {}
      ).forEach(([variant, product]) => {
        if (product)
          products.push({
            ...product,
            year: selectedYear,
            make: selectedMake,
            model: selectedModel,
            variant,
          });
      });
    } else {
      const selectedProduct =
        transmissionData[selectedYear][selectedMake][selectedModel][
        selectedVariant
        ];
      if (selectedProduct)
        products.push({
          ...selectedProduct,
          year: selectedYear,
          make: selectedMake,
          model: selectedModel,
          variant: selectedVariant,
        });
    }

    products = products.map((product) => ({
      name: product.name || "N/A",
      Stock: product.Stock || "N/A",
      warranty: product.warranty || "N/A",
      tested_checked: product.tested_checked || "N/A",
      pricing: product.pricing || "N/A",
      image: product.image || "assets/img/default.jpg",
      miles: product.miles || "N/A",
      description: product.description || "N/A",
      variant: product.variant || "N/A",
      year: product.year || "N/A",
      make: product.make || "N/A",
      model: product.model || "N/A",
    }));

    setDisplayedProducts(products);
  };

  const submitForm = async () => {
    const formData = {
      part: "MyformTransmission",
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
        $("#findtransmission").owlCarousel({
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
    setTimeout(initCarousel, 500);
  }, []);

  return (
    <div className="container">
      <div className={`${styles.transmission_form} text-white container mb-5 mt-4`} id="trans-form">
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
                className={styles.form_select}
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
                className={styles.form_select}
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
                className={styles.form_select}
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
                className={styles.form_select}
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
      {/* Product Cards */}
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
                    {product.year} {product.make} {product.model} Transmisison
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
                        name: `${product.year} ${product.make} ${product.model} Transmission`,
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
                      Swal.fire({
                        title: "Item Added to Cart!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000,
                      });

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
      {/* Modal for Phone Number */}
      {showModal && (
        <div
          className="modal"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog h-100 d-flex align-items-center">
            <div className="modal-content">
              <div className="modal-header justify-content-between">
                <h5 className="modal-title">Enter your Phone Number</h5>
              </div>
              <div className="modal-body">
                <input
                  type="tel"
                  className={`form-control ${phoneError ? "is-invalid" : ""}`}
                  placeholder="Enter your phone number"
                  value={phoneNumber || "+1"} // Default to '+1'
                  onChange={handlePhoneInputChange}
                  required
                  maxLength="12" // Include '+1' in the length
                />

                {phoneError && <div className="text-danger">{phoneError}</div>}
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button
                  type="button"
                  className="btn theme-btn"
                  onClick={handleSubmitButtonClick}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/*-------------------------Find Transmission------------------------*/}
      <FindTransission />
      {/*-------------------------Achievements------------------------*/}
      <AchievementTransmission />
      {/*-------------------------About used Transmission------------------------*/}
      {/* Show the introductory text first */}
      {displayedProducts.length === 0 ? (
        <div className="find-transmission-head mt-3 head1">
          <h3 className="text-center">
            About Our Used <span>Transmissions</span>{" "}
          </h3>

          <div className="find-transmission mb-5">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="find-transmission__content">
                    At VanderEngines, we specialize in offering used transmissions that are thoroughly inspected and tested for durability. Our transmission for sale options include automatic and manual transmissions for all major brands, including Ford, Chevrolet, Honda, Toyota, BMW, Mercedes, and more. Whether you need a car transmission for sale or transmission sales near me, we have a solution tailored to your needs.
                  </div>
                  <Link href="/transmission">
                    <button className={`${styles.theme_btn} btn my-3`}>
                      Discover More &#8594;
                    </button>
                  </Link>
                </div>
                <div className="col-lg-6">
                  <div
                    className="find-transmission__img owl-carousel"
                    id="findtransmission"
                  >
                    <img src="/assets/find-transmission-1.png" alt="" />
                    <img src="/assets/find-transmission-2.jpg" alt="" />
                    <img src="/assets/find-transmission-3.jpg" alt="" />
                    <img src="/assets/find-transmission-4.jpg" alt="" />
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
            {displayedProducts[0].make} <span> Transmission</span>
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
                        {displayedProducts[0].year} {displayedProducts[0].make}{" "}
                        {displayedProducts[0].model} Transmission{" "}
                      </span>
                      At VanderEngines, we specialize in offering used{" "}
                      <span className="text-black fw-bold">
                        {" "}
                        {displayedProducts[0].make} {displayedProducts[0].model}{" "}
                        transmission for {displayedProducts[0].year} variants
                      </span>{" "}
                      that are thoroughly inspected and tested for durability. Our transmission for sale options include automatic and manual transmissions for
                      <span className="text-black fw-bold">
                        {" "}
                        {displayedProducts[0].make} {displayedProducts[0].model}{" "}
                        {displayedProducts[0].year} .
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
                  <div
                    className="find-transmission__img owl-carousel"
                    id="findtransmission"
                  >
                    <img
                      src="/assets/find-transmission-1.png"
                      alt=""
                      style={{ width: "60%" }}
                    />
                    <img
                      src="/assets/find-transmission-2.jpg"
                      alt=""
                      style={{ width: "60%" }}
                    />
                    <img
                      src="/assets/find-transmission-3.jpg"
                      alt=""
                      style={{ width: "60%" }}
                    />
                    <img
                      src="/assets/find-transmission-4.jpg"
                      alt=""
                      style={{ width: "60%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}{" "}

    </div>
  );
}
