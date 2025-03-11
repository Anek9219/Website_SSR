import React, { useEffect, useState } from "react";
import "@/components/Home/home.css"
import { useRouter } from "next/router";
import Shipping from "@/components/Home/Shipping";
import AboutUs from "@/components/Home/AboutUs";
import EngineTransmission from "@/components/Home/EngineTransmission";
import FindEngine from "@/components/Home/FindEngine";
import EngineList from "@/components/Home/EngineList";
import FindTransmission from "@/components/Home/FindTransmission";
import TransmissionList from "@/components/Home/TransmissionList";
import Process from "@/components/Home/Process";
import WhyChoose from "@/components/Home/WhyChoose";
import CustomerReview from "@/components/Home/CustomerReview";
import Faq from "@/components/Home/Faq";
import Brands from "@/components/Home/Brands";
import Sale from "@/components/Home/Sale";
import Cardsection1 from "@/components/Home/Cardsection1";
import axios from "axios";

// import { Helmet } from "react-helmet";
export default function Home({ handleAddToCart, showproduct }) {
  const router = useRouter();
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

  const [phoneError, setPhoneError] = useState(""); // Error message for phone
  const [years, setYears] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [variants, setVariants] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state
  const [submissionMessage, setSubmissionMessage] = useState(""); // State for submission message
  const [submissionMessage2, setSubmissionMessage2] = useState(""); // State for submission message


  // Phone number validation function
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

  // Fetch data based on selected part
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

          // Fetch makes independently of year
          const allMakes = new Set();
          Object.keys(response.data).forEach((year) => {
            Object.keys(response.data[year]).forEach((make) => {
              allMakes.add(make);
            });
          });

          setMakes([...allMakes]); // Set unique makes
          setYears(Object.keys(response.data)); // Retain years if needed
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [formData.part]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "phone") {
      let updatedValue = value;

      // Ensure '+1' is always present
      if (!updatedValue.startsWith("+1")) {
        updatedValue = "+1" + updatedValue.replace(/[^0-9]/g, ""); // Re-add '+1' if missing and remove invalid characters
      }

      // Validate the phone number
      const error = validatePhoneNumber(updatedValue);
      setPhoneError(error); // Set the error message

      setFormData((prev) => ({
        ...prev,
        phone: updatedValue, // Update with the corrected value
      }));

      return; // Exit here to avoid further processing for phone
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Update dropdowns based on selections
    if (name === "make" && data) {
      // Fetch models for the selected make, independent of year
      const allModels = new Set();
      Object.keys(data).forEach((year) => {
        if (data[year][value]) {
          Object.keys(data[year][value]).forEach((model) => {
            allModels.add(model);
          });
        }
      });
      setModels([...allModels]);
      setVariants([]);
    } else if (name === "model" && data) {
      // Fetch variants based on the selected model and make
      const allVariants = new Set();
      Object.keys(data).forEach((year) => {
        if (data[year][formData.make] && data[year][formData.make][value]) {
          Object.keys(data[year][formData.make][value]).forEach((variant) => {
            allVariants.add(variant);
          });
        }
      });
      setVariants([...allVariants]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for phone validation before submitting
    if (phoneError || !formData.phone) {
      alert("Invalid Number");
      return;
    }
    if (phoneError || formData.phone.trim() === "+1" || !formData.phone) {
      alert("Please enter a valid phone number.");
      return;
    }
    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "https://backend.vanderengines.com/api/leads",
        formData
      );
      console.log(response.data);
      setSubmissionMessage(
        "Thank you! Your message has been sent successfully."
      );
      router.push('/thankyou')
      setFormData({
        part: "",
        make: "",
        model: "",
        year: "",
        variant: "",
        name: "",
        phone: "",
        email: "",
        message: "",
        agreed: "",
      });
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      setSubmissionMessage("There was an error submitting the form.");
      alert("There was an error submitting the form!");
    } finally {
      setLoading(false); // Stop loading
    }
  };
 // Handle form submission
  const handleSubmite = async (e) => {
    e.preventDefault();

    // Check for phone validation before submitting
    if (phoneError || !formData.phone) {
      alert("Invalid Number");
      return;
    }
    if (phoneError || formData.phone.trim() === "+1" || !formData.phone) {
      alert("Please enter a valid phone number.");
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "https://backend.vanderengines.com/api/leads",
        formData
      );
      console.log(response.data);
    
      setSubmissionMessage2("Form submitted successfully! Thank you.");
      setFormData({
        part: "",
        make: "",
        model: "",
        year: "",
        variant: "",
        name: "",
        phone: "",
        email: "",
        message: "",
        agreed: "",
      });
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      alert("There was an error submitting the form!");
    } finally {
      setLoading(false); // Stop loading
    }
  };


  const Homeform1 = () => {
    setFormData({ ...formData, agreed: "Homepage1" });
  };
  const Homeform2 = () => {
    setFormData({ ...formData, agreed: "Homepage2" });
  };
  return (
    <>
      {/* <Helmet> */}
        <title>Vander Engines | High-Performance Engines & Transmissions</title>
        {/* <meta name="description" content="This is a description of my page." /> */}
      {/* </Helmet> */}
      <div className="home pt-2 pb-4">
        <div className="container-fluid">
          <div className="home-upper d-flex align-items-center justify-content-around">
            <svg
              height="90"
              stroke="#1eb7c6"
              stroke-width="1.2"
              class="text-line"
              width="71%"
            >
              {/* <text
                x="50%"
                dominant-baseline="middle"
                text-anchor="middle"
                y="50%"
              >
                Finance Option Available
              </text> */}
            </svg>
            <button
              className="btn  custom-btn btn-9"
              style={{ height: "40px" }}
            >
              <a
                href="tel:+18448931760"
                className="text-decoration-none text-white "
              >
                Call Now
              </a>
            </button>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-4 form-area">
              <div className="main-form p-3 py-5">
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-6">
                      <select
                        className="form-select"
                        name="part"
                        value={formData.part}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>
                          Select part
                        </option>
                        <option value="Engine">Engine</option>
                        <option value="Transmission">Transmission</option>
                        <option value="Engine">Remanufactured Engines</option>
                        <option value="Transmission">
                          Remanufactured Transmission
                        </option>
                      </select>
                    </div>
                    <div className="col-6">
                      <select
                        className="form-select"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        disabled={!years.length}
                        required
                      >
                        <option value="" disabled>
                          Select year
                        </option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <select
                        className="form-select"
                        name="make"
                        value={formData.make}
                        onChange={handleChange}
                        disabled={!makes.length}
                        required
                      >
                        <option value="" disabled>
                          Select make
                        </option>
                        {makes.map((make) => (
                          <option key={make} value={make}>
                            {make}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-6">
                      <select
                        className="form-select"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        disabled={!models.length}
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
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter Name"
                        required
                      />
                    </div>
                    <div className="col-6">
                      <input
                        type="tel"
                        className={`form-control ${
                          phoneError ? "is-invalid" : ""
                        }`}
                        id="mobile"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter Mobile"
                        maxLength="12"
                        required
                      />
                      {phoneError && (
                        <div className="text-danger">{phoneError}</div>
                      )}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Email"
                        required
                      />
                    </div>
                  </div>
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-block"
                      disabled={loading}
                      onClick={Homeform1}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                  {submissionMessage && (
                    <div
                      className={` ${
                        submissionMessage.includes("successfully")
                          ? "text-success fw-bold mt-2 "
                          : "text-danger"
                      }`}
                      role="alert"
                    >
                      {submissionMessage}
                    </div>
                  )}
                </form>
              </div>
            </div>
            <div className="col-lg-8 car-area">
              <img
                src="https://autoart.beplusthemes.com/wp-content/uploads/2024/04/car-hero-min.png"
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
      <Shipping />
      <Cardsection1
        handleAddToCart={handleAddToCart}
        showproduct={showproduct}
      />

      <AboutUs />
      <EngineTransmission />
      <div>
        <div className="find-engine-head head1">
          <h3 className="text-center">
            Find Your <span>Engine</span>{" "}
          </h3>
        </div>
        <FindEngine />
      </div>

         {/*---------------------------------contact-form-2----------------------------------*/}
         <div className="contact-form-2 my-5">
        <div className="container">
          <div
            className="row align-items-center justify-content-between p-3"
            style={{ border: "1px solid #1eb7c6" }}
          >
            <div className="col-lg-12">
              <form className="form-start" onSubmit={handleSubmite}>
                <h3 className="fw-bold mb-3">Search Live Inventory</h3>
                <div class="row mb-3">
                  <div class="col-6">
                    <label for="part" class="form-label">
                      <i class="fa-regular fa-handshake me-3"></i> Part
                    </label>

                    <select
                      className="form-select"
                      name="part"
                      value={formData.part}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select part
                      </option>
                      <option value="Engine">Engine</option>
                      <option value="Transmission">Transmission</option>
                    </select>
                  </div>
                  <div class="col-6">
                    <label for="year" class="form-label">
                      <i class="fa-regular fa-calendar-days me-3"></i>
                      Year
                    </label>
                    <select
                      className="form-select"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      disabled={!years.length}
                      required
                    >
                      <option value="" disabled>
                        Select year
                      </option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-6">
                    <label for="make" class="form-label">
                      <i class="fa-brands fa-magento me-3"></i>
                      Make
                    </label>
                    <select
                      className="form-select"
                      name="make"
                      value={formData.make}
                      onChange={handleChange}
                      disabled={!makes.length}
                      required
                    >
                      <option value="" disabled>
                        Select make
                      </option>
                      {makes.map((make) => (
                        <option key={make} value={make}>
                          {make}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div class="col-6">
                    <label for="model" class="form-label">
                      <i class="fa-brands fa-bandcamp me-3"></i>
                      Model
                    </label>
                    <select
                      className="form-select"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      disabled={!models.length}
                      required
                    >
                      <option value="" disabled>
                        Select model
                      </option>
                      {models.map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-6">
                    <label for="name" class="form-label">
                      <i class="fa-regular fa-user me-3"></i>
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Name"
                      required
                    />
                  </div>
                  <div class="col-6">
                    <label for="mobile" class="form-label">
                      <i class="fa-solid fa-phone-volume me-3"></i>
                      Mobile
                    </label>
                    <input
                      type="tel"
                      className={`form-control ${
                        phoneError ? "is-invalid" : ""
                      }`}
                      id="mobile"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter Mobile"
                      maxLength="12"
                      required
                    />
                    {phoneError && (
                      <div className="text-danger">{phoneError}</div>
                    )}
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-12">
                    <label for="email" class="form-label">
                      <i class="fa-solid fa-envelope-open-text me-3"></i>
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Email"
                      required
                    />
                  </div>
                </div>
                <div className="d-grid">
                  <button
                    type="submit"
                    class="btn btn-block "
                    onClick={Homeform1}
                  >
                    Submit
                  </button>
                </div>
                <div>
                  {submissionMessage2 && (
                    <p className="text-success">{submissionMessage2}</p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/*---------------------------------contact-form-2----------------------------------*/}


      <EngineList />

      <div>
        <div className="find-transmission-head mt-5 head1">
          <h3 className="text-center">
            Find Your <span>Transmission</span>{" "}
          </h3>
        </div>
        <FindTransmission />
      </div>

      <TransmissionList />
      <Process />
      <WhyChoose />
      <CustomerReview />
      <div className="AskQuestion my-3">
        <div className="container">
          <h3 className="question-title fs-1" style={{ color: "#1eb7c6" }}>
            Ask A Question?
          </h3>
          <p>Are You Looking for Used Engines for Your Cars or Trucks?</p>
          <form onSubmit={handleSubmit}>
            <div class="row mb-3 ">
              <div class="col-6">
                <label for="part" class="form-label">
                  Part
                </label>
                <select
                  className="form-select"
                  name="part"
                  value={formData.part}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select part
                  </option>
                  <option value="Engine">Engine</option>
                  <option value="Transmission">Transmission</option>
                </select>
              </div>
              <div class="col-6">
                <label for="name" class="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  required
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-6">
                <label for="email" class="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div class="col-6">
                <label for="mobile" class="form-label">
                  Mobile
                </label>
                <input
                  type="tel"
                  className={`form-control ${phoneError ? "is-invalid" : ""}`}
                  id="mobile"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter Mobile"
                  maxLength="12"
                  required
                />
                {phoneError && <div className="text-danger">{phoneError}</div>}
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-12">
                <label for="vander-message" class="form-label">
                  Write Your Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter Your Message"
                  required
                />
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" class="btn btn-block" onClick={Homeform2}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <Faq />
      <Brands />
      <Sale />
    </>
  );
}
