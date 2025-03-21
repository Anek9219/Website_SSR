import React, { useState } from "react";

const faqData = [
  {
    question: "What is Digital Marketing?",
    answer: (
      <>
        <p>
          Digital marketing refers to the use of digital channels, platforms, and technologies to promote products, services, or brands to a targeted audience. It encompasses a wide range of tactics and strategies aimed at reaching and engaging consumers online. Some key components of digital marketing include:
        </p>
        <ol type="1">
          <li><b>Search Engine Optimization (SEO):</b> Optimizing websites and content to improve visibility in search engine results pages (SERPs) and attract organic (unpaid) traffic.</li>
          <li><b>Search Engine Marketing (SEM):</b> Using paid advertising on search engines to display ads to users searching for specific keywords.</li>
          <li><b>Social Media Marketing:</b> Leveraging platforms like Facebook and Instagram to build brand awareness and engage with audiences.</li>
          <li><b>Content Marketing:</b> Creating and distributing valuable content to attract and retain a targeted audience.</li>
          <li><b>Email Marketing:</b> Sending targeted emails to nurture leads and promote products or services.</li>
        </ol>
      </>
    ),
  },
  {
    question: "How Does Digital Marketing Help Business to Grow?",
    answer: (
      <>
        <p>Digital marketing helps businesses grow in several ways:</p>
        <ol type="1">
          <li><b>Increased Reach:</b> Allows businesses to connect with potential customers through online channels.</li>
          <li><b>Targeted Advertising:</b> Enables businesses to target specific demographics and interests.</li>
          <li><b>Improved Brand Awareness:</b> Increases visibility through consistent digital marketing efforts.</li>
          <li><b>Enhanced Customer Engagement:</b> Fosters interactions through social media and email campaigns.</li>
          <li><b>Measurable Results:</b> Allows tracking and measuring campaign performance in real-time.</li>
        </ol>
      </>
    ),
  },
  {
    question: "Best Digital Marketing Company?",
    answer: (
      <>
        <p>
          Future Skills Academyis a dynamic digital marketing company offering a wide array of services tailored to meet the diverse needs of businesses seeking to establish a strong online presence and drive growth in the digital realm. With a focus on innovation, creativity, and results-driven strategies, Future Skills Academyprovides comprehensive solutions across various digital marketing channels.
        </p>
        <p>
          At Future Skills Academy, we specialize in leveraging the power of platforms like Google Ads and Facebook Ads to help businesses reach their target audience effectively and maximize their ROI.
        </p>
        <p>
          In addition to advertising services, Future Skills Academyexcels in web development, creating visually stunning and user-friendly websites.
        </p>
      </>
    ),
  },
];

export default function Information() {
  // Set initial active index to 0
  const [activeIndex, setActiveIndex] = useState(0);

  function toggleContent(index) {
    setActiveIndex((prevIndex) => (prevIndex === index ? -1 : index));
  }

  return (
    <>
      <div className="information my-5">
        <div className="text-content d-flex flex-column justify-content-center align-items-center text-white" style={{ height: "100%" }}>
          <h4 style={{ color: "#ff9c00" , fontSize:"34px"}} className="fw-bold">FAQ</h4>
          <h3 className="fs-1">Find Out Answers Here</h3>
        </div>
      </div>
      <div className="container information-container">
        {faqData.map((item, index) => (
          <div className="d-grid" key={index}>
            <button
              className={`btn btn-block d-flex justify-content-between align-items-center border-0 ${activeIndex === index ? "bg-active" : ""}`}
              onClick={() => toggleContent(index)}
              aria-expanded={activeIndex === index}
              aria-controls={`faq-content-${index}`}
            >
              <h5>{item.question}</h5>
              <i className={`fa-solid ${activeIndex === index ? "fa-minus" : "fa-plus"}`}></i>
            </button>
            {(activeIndex === index || (activeIndex === 0 && index === 0)) && (
              <div id={`faq-content-${index}`} className="content">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .bg-active {
          background-color:#ff9c00; /* Change this color as needed */
          color: white;
        }
        .content {
          margin-top: 1rem;
          padding: 1rem;
        }
      `}</style>
    </>
  );
}
