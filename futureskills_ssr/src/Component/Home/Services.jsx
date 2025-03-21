import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";


export default function Services() {
  useEffect(() => {
    AOS.init({ once: true }); // Ensures animations only run once
    AOS.refresh(); // Refresh AOS to detect new elements
  }, []);
  const service_card = [
    {
      imgSrc: "/assets/se-1.webp",
      head: "Search Engine Optimization",
      para: "Future Skills Academy is a leading digital marketing agency that helps your business to rank on SERP and generate more business. We have completed 300+ SEO Projects.",
    },
    {
      imgSrc: "/assets/se-2.webp",
      head: "Social Media Marketing",
      para: "Meta has around 2.9 billion active users and that is the perfect platform for you to grow your business.We generate hundreds of quality leads regularly, tailored to each business’s needs.",
    },
    {
      imgSrc: "/assets/se-3.webp",
      head: "Content Writing",
      para: "Future Skills Academy provides you high quality content for your website. Our team of experts creates content that is optimized for search engines like Google, helping to boost customer engagement.",
    },
    {
      imgSrc: "/assets/se-4.png",
      head: "Web Development",
      para: "Having a great UX and responsive website is very important to grow business.Our developers, with their in-depth knowledge and expertise, create perfectly optimized websites tailored to your needs.",
    },
    {
      imgSrc: "/assets/se-5.jpg",
      head: "Google Ads",
      para: "We handled over 100+ projects of google ads and generates a handsome ROI for our clients. Our experts makes the perfect Google ads strategy according to your business need.",
    },
    {
      imgSrc: "/assets/se-6.webp",
      head: "Meta Ads",
      para: "Meta has around 2.9 billion active users and that is the perfect platform for you to grow your business. We generate 100 of quality leading regular for each business.",
    },
  ];
  return (
    <div className="service">
      <div className="container my-4">
        <h1 className="text-center fs-1 fw-bold ">
          Our Digital{" "}
          <span > Marketing Services</span>
        </h1>
        <div className="row my-4">
          {service_card.map((item, index) => (
            <div className="col-lg-4 col-md-6 text-center mb-3" key={index}>
              <div
                className="card service-card p-2 h-100"
                data-aos="fade-down"
                data-aos-duration="1000"
                data-aos-easing="ease-out-cubic"
              >
                <img
                  src={item.imgSrc}
                  alt={item.imgAlt}
                  width={120}
                  style={{
                    height: "50%",
                    objectFit: "contain",
                    // filter: "hue-rotate(45deg)",
                  }}
                />
                <div className="card-title my-3">
                  <h5 className="text-center">{item.head}</h5>
                  <p>{item.para}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
