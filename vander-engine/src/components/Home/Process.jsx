import React, { useEffect } from "react";
import AOS from "aos";

export default function Process() {
  useEffect(() => {
    // Initialize AOS
    AOS.init();
  }, []);

  const handleChatClick = () => {
    // This will trigger the Tawk.to chat widget
    if (window.Tawk_API) {
      window.Tawk_API.toggle(); // Toggle the chat widget
    }
  };

  const card = [
    { imgSrc: "/assets/QuoteRequest.svg", action: handleChatClick },
    { imgSrc: "/assets/phone.svg", phoneLink: "tel:+18448931760" },
    { imgSrc: "/assets/icon1.svg" },
  ];

  return (
    <>
      <div className="process mt-5 text-center head1">
        <h3>Process</h3>
        <h4>How It's Work</h4>
      </div>
      <div className="process-icon mb-5 mt-5">
        <div className="container">
          <div className="row my-3 justify-content-center">
            {card.map((item, index) => (
              <div className="col-lg-3 mb-4" key={index}>
                <div className="card h-100 process-card">
                  {item.phoneLink ? (
                    <a href={item.phoneLink} className="d-block">
                      <img src={item.imgSrc} alt="Phone" />
                    </a>
                  ) : item.action ? (
                    <button className="d-flex btn" onClick={item.action}>
                      <img src={item.imgSrc} alt="Chat" />
                    </button>
                  ) : (
                    <img src={item.imgSrc} alt="Icon" />
                  )}
                </div>
              </div>
            ))}
            <div className="col-lg-3 float-end">
              <div className="card process-card-1">
                <img src="/assets/support.svg" alt="Support" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
        button:hover{
        border:none;
        }
        `}
      </style>
    </>
  );
}
