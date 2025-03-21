
import React from 'react'

export default function HomeModules() {
    const data = [
        { list: "Digital Marketing Essentials" },
        { list: "Digital Marketing Strategy" },
        { list: "Web Designing with No Codes" },
        { list: "Practical Approach" },
        { list: "Email Marketing" },
        { list: "Inbound Marketing" },
        { list: "Search Engine Optimization (SEO)" },
        { list: "Google Webmaster Tool" },
        { list: "Search Engine Algorithms" },
        { list: "Local Business Listing" },
        { list: "Google Analytics" },
        { list: "Content Marketing" },
        { list: "Competitors Analysis" },
        { list: "Social Media Marketing" },
        { list: "Video Marketing Fundamentals" },
        { list: "E-commerce Marketing" },
        { list: "Mobile Marketing" },
        { list: "Optimization Conversion Rate" },
        { list: "Google Adwords" },
        { list: "Online Display Advertising" },
        { list: "Online Reputation Management (ORM)" },
        { list: "Creating Marketing Strategy" },
        { list: "Lead Generation for Business" },
        { list: "Live Practical Session" },
        { list: "Case Study Discussion" },
        { list: "Digital Marketing Interview Preparation" },
        { list: "Blogging" },
        { list: "AdSense" },
        { list: "Affiliate Marketing" },
        { list: "Freelancer Pushups" },
        { list: "Search Engine & Social Strategies" },
        { list: "Remarketing Concept" },
        { list: "Other Modules" }
    ]
    return (
        <div className="HomeModule counter py-2 my-4">
            <div className="container my-1 ">
                <h3 className="fw-bolder text-center acheived my-4 text-dark">
                Future Skills Academy Of Digital Marketing  Covers 50+ Modules in Its Advanced Digital <span style={{color:"#ff9c00"}}> Marketing Training Program.</span>
                </h3>
                <div className="row mt-5">
                    {data.map((item, index) => (
                        <div className="col-lg-4" key={index}>
                            <ul>
                                <li ><span style={{ color: " blue" }}>✔️ </span>{item.list}</li>
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
