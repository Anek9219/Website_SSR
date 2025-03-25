import React, { useState } from "react";
import { useRouter } from "next/router";
export default function Home_form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = { name, email, number, website, message };
    try {
      const response = await fetch(
        "https://newbackend.sstechservices.net/api/receive-msg",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error("Failed to submit the form");
      setName("");
      setEmail("");
      setNumber("");
      setWebsite("");
      setMessage("");
      router.push("/thankyou");
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const Formtitle = () => {
    switch (router.pathname) {
      case "/":
        return "Connect With Us";
      case "/web-development-agency-chicago":
        return "Book A Demo";
      case "/ppc-company-chicago":
        return "Connect With PPC Expert";
      case "/seo-agency-chicago":
        return "Free Site Audit";
      case "/contact":
        return "Get in Touch with Us";
      default:
        return "Get a Free Consultation";
    }
  };
  return (
    <form onSubmit={handleSubmit} className="main-form text-warning"   style={{
      border: "10px solid rgb(201 195 195)",
      boxShadow: "none",
      borderRadius: "0",
    }}>
      <h3 className="text-center">{Formtitle()}</h3>
      <div className="row">
        <div className="mb-3 col-6">
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
        <div className="mb-3 col-6">
          <label htmlFor="number" className="form-label">
            Number <span className="text-danger fw-bold fs-5">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="number"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address <span className="text-danger fw-bold fs-5">*</span>
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
      </div>
      <div className="mb-3">
        <label htmlFor="message" className="form-label">Comment or Message</label>
        <textarea
          className="form-control"
          id="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {loading ? <span><i className="fa fa-spinner fa-spin"></i> Submitting...</span> : "Submit"}
      </button>
    </form>
  );
}