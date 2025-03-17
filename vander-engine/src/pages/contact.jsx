import React, { useEffect, useState} from "react";
import "@/components/Contact/contact.css"
import AOS from "aos";
import axios from "axios";
import { useRouter } from "next/router";
import Faq from "@/components/Home/Faq";
import Sale from "@/components/Home/Sale";
import Achievement from "@/components/Contact/Achievement";
import Head from "next/head";
export default function Contact() {
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
  const [phoneError, setPhoneError] = useState(""); 
  const [years, setYears] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [variants, setVariants] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false); 
  const router = useRouter();
  const canonicalUrl = `https://vanderengines.com${router.pathname}`;
  const [form1SuccessMessage, setForm1SuccessMessage] = useState("");
const [form2SuccessMessage, setForm2SuccessMessage] = useState("");
const [form3SuccessMessage, setForm3SuccessMessage] = useState("");
  const validatePhoneNumber = (number) => {
    if (!number.startsWith("+1")) {
      return "Phone number must start with +1.";
    }
    const numberWithoutPrefix = number.slice(2); // Remove '+1'
    const isValidLength = numberWithoutPrefix.length === 10; // Check for exactly 10 digits
    const isDigitsOnly = /^[0-9]+$/.test(numberWithoutPrefix); // Ensure only digits
    const noRepeatedDigits = /^(?!.*(\d)\1{6}).*$/; // Prevent more than 2 repeated digits
    const dummyNumbers = ["1234567890", "9876543210", "1111111111", "2222222222"];
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
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "phone") {
      let updatedValue = value;
      if (!updatedValue.startsWith("+1")) {
        updatedValue = "+1" + updatedValue.replace(/[^0-9]/g, ""); 
      }
      const error = validatePhoneNumber(updatedValue);
      setPhoneError(error);
      setFormData((prev) => ({
        ...prev,
        phone: updatedValue,
      }));
      return;
    }
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (name === "make" && data) {
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
      const allVariants = new Set();
      Object.keys(data).forEach((year) => {
        if (
          data[year][formData.make] &&
          data[year][formData.make][value]
        ) {
          Object.keys(data[year][formData.make][value]).forEach((variant) => {
            allVariants.add(variant);
          });
        }
      });
      setVariants([...allVariants]);
    }
  };
  const handleSubmit = async (e, formIdentifier) => {
    e.preventDefault();
    if (phoneError || !formData.phone) {
      alert("Invalid Number");
      return;
    }
    if (phoneError || formData.phone.trim() === "+1" || !formData.phone) {
      alert("Please enter a valid phone number.");
      return;
    }
    setLoading(true); 
    try {
      const response = await axios.post(
        "https://backend.vanderengines.com/api/leads",
        formData
      );
      console.log(response.data);
      router.push("/thankyou")
      if (formIdentifier === "form1") {
        setForm1SuccessMessage("Form submitted successfully! Thank you.");
      } else if (formIdentifier === "form2") {
        setForm2SuccessMessage("Form submitted successfully! Thank you.");
      } else if (formIdentifier === "form3") {
        setForm3SuccessMessage("Form submitted successfully! Thank you.");
      }  
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
      setLoading(false); 
    }
  };

  const review = [
    {
      imgSrc: "/assets/image.jfif",
      name: "John Doe",
      review:
        "Vander Engines provided me with exactly what I needed. Excellent customer service!",
    },
    {
      imgSrc: "/assets/image-2.jfif",
      name: "Jane Smith",
      review:
        "I got a high-quality engine replacement, and the entire process was smooth.",
    },
    {
      imgSrc: "/assets/image-3.png",
      name: "David Johnson",
      review:
        "Highly recommend Vander Engines. Quick service and reliable products!",
    },
  ];
  const Homeform1 = () => {
    setFormData({ ...formData, agreed: 'Homepage1' });
  };
  const Homeform2 = () => {
    setFormData({ ...formData, agreed: 'Homepage2' });
  };
  
  
  return (
    <>
    <Head>
    <title>Vander Engines | Contact Us</title>
    <link rel="canonical" href={canonicalUrl} />
    </Head>
      <main>
      {/*---------------------------Contact-hero-----------------------------------*/}
      <div class="contact-hero d-flex align-items-center justify-content-center mb-5">
        <div class="container">
          <h1 class="contact-head-1 text-center">Contact Us</h1>
        </div>
      </div>
      {/*---------------------------form-section-----------------------------------*/}
      <div className="container-fluid form-section my-5">
        <h5 className="ms-5"> FILL UP THE FORM</h5>
        <h6 className="ms-5">Get Your Free Quote</h6>
        <div className="row align-items-center">
          <div className="col-lg-5">
            <div className="contact-form p-3 ms-5 text-white">
               <form onSubmit={(e) => handleSubmit(e, "form1")}>
               <div className="row mb-3">
                  <div className="col-6">
                    <label className="form-label">Part</label>
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
                  <div className="col-6">
                    <label className="form-label">Year</label>
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
                    <label className="form-label">Make</label>
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
                    <label className="form-label">Model</label>
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
                      <i class="fa-regular fa-user me-3 fs-4"></i>
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
                      <i class="fa-solid fa-phone-volume me-3 fs-4"></i>
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
                    {phoneError && (
                        <div className="text-danger">{phoneError}</div>
                      )}
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-12">
                    <label for="email" class="form-label">
                      <i class="fa-solid fa-envelope-open-text me-3 fs-4"></i>
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
                  <button type="submit" class="btn btn-block" onClick={Homeform1}>
                    Submit
                  </button>
                </div>
                <div>
                 {form1SuccessMessage && <p className="text-success">{form1SuccessMessage}</p>}
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="">
              <img
                src="/assets/Mercedese-Engine.png"
                alt=""
                className="img-fluid"
                height={100}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-easing="ease-out-cubic"
              />
            </div>
          </div>
        </div>
      </div>
      {/*---------------------------vander-features-----------------------------------*/}
      <div class="vander-features-container container-fluid mt-5">
        <div class="row text-center">
          <div class="col-md-4 mb-4">
            <div class="vander-features-box">
              <i class="fas fa-shield-alt vander-features-icon"></i>
              <p>Lifetime Support</p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="vander-features-box">
              <i class="fas fa-shipping-fast vander-features-icon"></i>
              <p>Free Shipping</p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="vander-features-box">
              <i class="fas fa-undo-alt vander-features-icon"></i>
              <p>6 Months Return and Replacement Warranty</p>
            </div>
          </div>
        </div>
      </div>
      {/*---------------------------limited-time-offer-----------------------------------*/}
      <section class="vander-limited-time-offers py-3 mm-5">
        <div class="container-fluid head1">
          <h3 class="text-center mb-4">
            Limited Time <span>Offers</span>{" "}
          </h3>
          <div class="row justify-content-center">
            <div class="col-lg-12 col-md-8">
              <div
                class="vander-offer-card p-4 text-center"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-easing="ease-out-cubic"
              >
                <h4 class="vander-offer-title" style={{ color: "#1eb7c6" }}>
                  Exclusive Discounts on Used Engines!
                </h4>
                <p class="vander-offer-description">
                  Get up to 20% off on selected used engines. Hurry, offer ends
                  soon!
                </p>
                <button
                  class="btn btn-primary vander-call-button"
                  onclick="window.location.href='tel:+18448931760'"
                >
                  Call Now "+18448931760"
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>
      {/*---------------------------Contact-information-----------------------------------*/}
      <div className="contact-info my-5">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div
                className="row"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-easing="ease-out-cubic"
              >
                <div className="col-lg-6 mb-4">
                  <div className="contact-card card d-flex flex-row align-items-center p-4 justify-content-center">
                    <i class="fa-solid fa-phone-volume me-3"></i>
                    <span>+18448931760</span>
                  </div>
                </div>
                <div className="col-lg-6 mb-4">
                  <div className="contact-card card d-flex flex-row align-items-center p-4 justify-content-center">
                    <i class="fa-solid fa-envelope-open-text me-3"></i>
                    <span>billing@vanderengines.com</span>
                  </div>
                </div>
                <div className="col-lg-12 mb-4">
                  <div className="contact-card card d-flex flex-row align-items-center p-4 justify-content-center">
                    <i class="fa-solid fa-clock me-3"></i>
                    <span>Mon - Sunday (10:00am – 7:00pm)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div
                className="question-form"
                data-aos="fade-down"
                data-aos-duration="1000"
                data-aos-easing="ease-out-cubic"
              >
                <h3 className="question-title">Ask A Question?</h3>
                <p>Are You Looking for Used Engines for Your Cars or Trucks?</p>
                <form onSubmit={(e) => handleSubmit(e, "form2")}>
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
                    {phoneError && (
                        <div className="text-danger">{phoneError}</div>
                      )}
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
                  {form2SuccessMessage && <p className="text-success">{form2SuccessMessage}</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*---------------------------------Achievements----------------------------------*/}
      <Achievement />
      {/*---------------------------------Sale----------------------------------*/}
      <Sale />
      {/*---------------------------------contact-form-2----------------------------------*/}
      <div className="contact-form-2 my-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 p-3">
              <div
                className="row align-items-center justify-content-between p-3"
                style={{ border: "1px solid #1eb7c6" }}
              >
                <div className="col-lg-3  text-center">
                  <div className="phone">
                    <i className="fa fa-phone" aria-hidden="true"></i>
                    <p>Phone</p>
                    <p>+18448931760</p>
                  </div>
                  <div className="email">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    <p>Email</p>
                    <p>billing@vanderengines.com</p>
                  </div>
                </div>
                <div className="col-lg-9">
                  <form className="form-start" onSubmit={(e) => handleSubmit(e, "form3")}> 
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
                      className={`form-control ${phoneError ? "is-invalid" : ""}`}
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
                      <button type="submit" class="btn btn-block " onClick={Homeform1}>
                        Submit
                      </button>
                    </div>
                    <div>
                    {form3SuccessMessage && <p className="text-success">{form3SuccessMessage}</p>}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*---------------------------------Customer review----------------------------------*/}
      <div className="customer-review text-center mt-5 head1">
        <h3>
          What Our <span>Customers </span> Say
        </h3>
        <div className="container mt-3">
          <div className="row">
            {review.map((item, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card">
                  <img
                    src={item.imgSrc}
                    alt=""
                    width={100}
                    style={{ borderRadius: "50%" }}
                    className="mx-auto"
                  />
                  <div className="card-body">
                    <h5>{item.name}</h5>
                    <p>{item.review}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Faq />
      </main>
    </>
  );
} 