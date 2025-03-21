import React from 'react'

export default function Specialization() {
    const data = [
        { imgSrc: "/assets/ex-1.png", head: "Digital Marketing Course", list1: "  50+ Modules ", list2: " 180 Hrs Training" },
        { imgSrc: "/assets/ex-2.png", head: "Special Session", list1: "Case Study Analysis", list2: "Dropshipping Strategies" },
        { imgSrc: "/assets/ex-3.png", head: "Tools & Projects", list1: "Tools & Themes", list2: "Hands-On Projects" },
        { imgSrc: "/assets/ex-4.png", head: "Certifications", list1: "Google Certifications",  },
    ]
    return (
        <div className="specialization py-2 mt-4">
            <div className="container my-1 text-center ">
                <h1 className="fw-bolder text-center acheived">
                Digital Marketing  <span> Expertise </span>
                </h1>
                <p>Master essential digital skills to enhance your website and social media presence, driving more traffic and maximizing ROI. Our Advanced Digital Marketing Course offers 50+ comprehensive modules designed for students, professionals, and entrepreneurs. Unlock the power of SEO, social media marketing, content strategy, and more with this all-in-one training program.</p>
                <div className="row my-4">
                    {data.map((item, index) => (
                        <div className="col-lg-3" key={index}>
                            <div className="card d-flex flex-column align-items-center  justify-content-center text-center" >
                                <img src={item.imgSrc} alt="" width={70} />
                                <p className='fw-bold'>{item.head}</p>
                                <li>{item.list1}</li>
                                <li>{item.list2} </li>
                            </div>

                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}
