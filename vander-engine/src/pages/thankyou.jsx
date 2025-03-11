import React, { useEffect } from "react";
import Link from "next/link";

export default function ThankYou() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-11152279745/YV5VCK_itpkYEMGR6cUp",
      });
    }

    // Text animation logic
    const text = "Thank You";
    const container = document.querySelector(".thank-you-text");

    if (container) {
      container.innerHTML = text
        .split("")
        .map((char) => `<span>${char}</span>`)
        .join("");

      const letters = container.querySelectorAll("span");
      letters.forEach((letter, index) => {
        setTimeout(() => {
          letter.style.animation = `fadeIn 2s linear infinite ${index * 0.1}s`;
        }, 0);
      });
    }
  }, []);

  return (
    <div className="thankyou">
      <div className="container d-flex flex-column align-items-center h-100">
        <img
          src="https://bhavikmachinery.com/images/enquiry.png"
          alt="Enquiry"
          className="img-fluid"
          width={200}
        />
        <h1>
          <span className="thank-you-text"></span>
        </h1>
        <h2>We Will Get Back To You Soon</h2>
        <Link href="/">
          <button className="btn btn-success">Home</button>
        </Link>
      </div>
    </div>
  );
}
