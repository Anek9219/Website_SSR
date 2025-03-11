import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import "../Transmission/transmission.css"
import FindTransmission2 from "../Transmission/FindTransmission2";
import Achievement from "../Contact/Achievement";
export default function EngineForm({
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
    const path = `/engine/${selectedYear}/${selectedMake}/${selectedModel}/${selectedVariant}`;
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
    setTimeout(initCarousel, 500);
  }, []);

  return (
    <>
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
                  onClick={
                    handlePhoneSubmit
                    }
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

                  {phoneError && (
                    <div className="text-danger">{phoneError}</div>
                  )}
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn theme-btn"
                    onClick={handlePhoneSubmit}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
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
    </>
  );
}
