import React from 'react'

export default function HomeCourse_Benefits() {
    const data = [
        { imgSrc: "/assets/opp-1.png", head: "Placement Support", para: "CV Enhancement | Job Interview Updates | Mock Interview Sessions" },
        { imgSrc: "/assets/opp-2.png", head: "Career Guidance", para: "Create Your Website | Execute Live Campaigns | Hands-On Projects | Case Study Discussions" },
        { imgSrc:"/assets/opp-3.jpg", head: "Interview Coaching", para: "Interview Questions Mastery | Practical Insights | Case Study Discussions | PD Training" },
        { imgSrc: "/assets/opp-4.jpg", head: "Free Digital Tools", para: "WooRank | GetResponse | Hootsuite | Unbounce | RankWatch | Kartrocket | WordPress" },
        { imgSrc: "/assets/opp-5.png", head: "Expert-Led Training", para: "Over 8 Years of Industry Expertise | Hands-On Assessments | In-Person & Online Sessions" },
        { imgSrc:"/assets/opp-6.jpg", head: "Networking Events", para: "One-on-One Sessions | Industry Insights with Mentors | Collaborative Alumni Activities" },
    ]
    return (
        <div className="Additional  py-2 my-4">
            <div className="container my-1 text-center">
                <h1 className="fw-bolder text-center acheived my-4">
                    Additional Learning<span> Opportunities </span>
                </h1>
                <div className="row mt-5">
                    {data.map((item, index) => (
                        <div className="col-lg-4 mb-4" key={index} >
                            <div className="card h-100 d-flex flex-column align-items-center p-2" style={{borderRadius:"50%  0 50% 0", boxShadow:"0 0 5px",border:"none"}}>
                                <img src={item.imgSrc} alt="" width={80} className='pt-2'/>
                                <h5>{item.head}</h5>
                                <p>{item.para}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
