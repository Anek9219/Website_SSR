import React, { useState } from "react";


export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [website, setWebsite] = useState(""); // New state for website URL
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
  
    const formData = {
      name,
      email,
      phone,
      website,
      message,
    };
  
    // Make API request to Node.js endpoint
    fetch("https://newbackend.sstechservices.net/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Use JSON header
      },
      body: JSON.stringify(formData), // Send data as JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Reset fields after successful submission
        setName("");
        setEmail("");
        setphone("");
        setWebsite(""); // Reset website URL field
        setMessage("");
      })
      .catch((error) => {
        console.error(error);
        alert("There was an error submitting your form. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  return (
    <div className="form my-3" id="MainForm">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 p-4">
            <h3 className="text-black">Our Innovative Approach in Digital Marketing</h3>
            <p>
              At Future Skills Academy, we pride ourselves on being a leading digital
              marketing agency. Our innovative approach sets us apart in a
              competitive landscape, serving clients locally and globally with
              customized solutions that drive success and growth.
            </p>
            <p>
              Our professionals analyze clients' businesses to understand their
              goals and craft result-oriented strategies. We find the perfect
              audience to generate high-quality leads, allowing us to create
              both creative and effective strategies.
            </p>
          </div>
          <div className="col-lg-6">
            <form onSubmit={handleSubmit} className="main-form">
              <h3 className="text-center">Connect With Expert</h3>
              <div className="mb-2">
                <label htmlFor="name" className="form-label">
                  Name <span className="text-danger fw-bold fs-5">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="phone" className="form-label">
                  phone <span className="text-danger fw-bold fs-5">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={phone}
                  onChange={(event) => setphone(event.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="form-label">
                  Email address{" "}
                  <span className="text-danger fw-bold fs-5">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              {/* <div className="mb-2">
                <label htmlFor="website" className="form-label">
                  Website URL
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="website"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
              </div> */}
              <div className="mb-2">
                <label htmlFor="message" className="form-label">
                  Comment or Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
              </div>
              {/* <div className="mb-2 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  required
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Check me out
                </label>
              </div> */}
              <button type="submit" className="btn btn-primary">
                {loading ? (
                  <span>
                    <i className="fa fa-spinner fa-spin"></i> Submitting...
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
