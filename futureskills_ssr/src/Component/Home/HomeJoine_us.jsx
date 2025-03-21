import React from 'react'

export default function HomeJoine_us() {
    const data = [
        { imgSrc: "/assets/join-1.jpg", head: "Career Seekers / Students", list1: "  Start your career as a fresher.  ", list2: "    Get part-time earning opportunities", list3: "   Better job & career options. ", list4: "    Strengthen their curriculum vitae" },

        { imgSrc: "/assets/join-2.avif", head: "Industry Professionals", list1: "    Get promotions & have salary hike ", list2: "   Get paid more than your collegues.", list3: "    Additional Income through freelancing", list4: "Bringing more conversion by using strategies learned." },

        { imgSrc: "/assets/join-3.png", head: "Entrepreneurs", list1: "   Create brand awareness ", list2: "    Improve online presence", list3: "   Boost your brand & revenue", list4: "    Easily get freelancing projects." },

        { imgSrc: "/assets/join-4.jpg", head: "Business Launches", list1: " Improve your business visibility.", list2: "   Increase your sales with low marketing budget", list3: "Allow you to target your potential clients.", list4: "   Help to grow your E-commerce business" },
    ]
    return (
        <div className="specialization py-2 mt-4">
            <div className="container my-1 ">
                <h1 className="fw-bolder text-center acheived">
                    Who Can   <span> Join Us? </span>
                </h1>
                <div className="row mt-5">
                    {data.map((item, index) => (
                        <div className="col-lg-3" key={index}>
                            <div className="card h-100 d-flex flex-column align-items-center">
                                <img src={item.imgSrc} alt="" width={90} className='mb-2'/>
                                <p className='fw-bold text-center'>{item.head}</p>
                                <p>👉{item.list1}</p>
                                <p>✔️{item.list2}</p>
                                <p>👉{item.list3}</p>
                                <p>✔️{item.list4}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
