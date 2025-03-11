import React from "react";

export default function CustomerReview() {
  const review = [
    {
      imgSrc: "/assets/image.jfif",
      name: "Karl Fabre",
      review:
        "Vander Engines did a great job getting me the engine I needed . Larry was extremely helpful in locating the exact engine I needed to match my 2017 BMW 530i . He was very communicative in keeping me informed during the process.  I would definitely recommend Vander engines for any used auto parts needs. Karl F.",
    },
    {
      imgSrc: "/assets/image-2.jfif",
      name: "Bo Sturgill",
      review:
        "I got to say they were very nice to work with. David Williams was incredibly helpful with each step. I received my transmission way quicker than I ever expected. I'm in North Carolina and got it in 3 days. Really glad I found them. There warranties are 2nd to none. Call David, he'll help.",
    },
    {
      imgSrc: "/assets/image-3.png",
      name: "Joey Avery",
      review:
        "I was really worried about making a purchase online for an engine. However Nick Turner, the agent I dealt with at Vander Engines kept me informed every step of the way! The professionalism he used with the help of his team really got me a great deal. They really care about their customers and their concerns!",
    },
  ];
  return (
    <div className="customer-review text-center mt-5 head1">
      <h3>
        What Our <span>Customers </span> Say
      </h3>
      <div className="container mt-3">
        <div className="row">
          {review.map((item, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src={item.imgSrc}
                  alt=""
                  width={100}
                  style={{ borderRadius: "50%" }}
                  className="mx-auto"
                />
                <div className="card-body">
                  <h5>{item.name}</h5>
                  <p>{item.review}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
