import React from 'react'

export default function Expert() {
    return (
        <div className="expert">
            <div className="container">
                <h1 className="fw-bolder text-center acheived">
                    Our<span >  Expert </span>
                </h1>
                <div className="row my-5 align-items-center">
                    <div className="col-lg-4 mb-4 d-flex justify-content-center" style={{position:"relative" }}>
                        <img src="/assets/vivek_sir.jpg" alt="" width={270} style={{ borderRadius: "10px"}} />
                        <img src="https://images.jdmagicbox.com/quickquotes/images_main/-6h3lhe9s.jpg" alt="" width={90} className='trophy' />
                    </div>
                    <div className="col-lg-8">
                        <ul className='fw-medium expert-about'>
                            <li> Vivek Shadev is a seasoned digital marketing expert with 7 years of experience, specializing in helping businesses and individuals achieve online success. As the co-founder of Future Skills Academy, he is committed to shaping the next generation of digital marketers.</li>
                            <br />

                            <li>Throughout his career, Vivek has worked with various companies and professionals, delivering impactful results in SEO, social media marketing, paid advertising, and content strategy. His expertise has helped brands grow their online presence, generate leads, and maximize revenue.</li>
                            <br />
                            <li>With Future Skills Academy, Vivek aims to bridge the gap between industry demands and aspiring digital marketers by providing hands-on training, real-world case studies, and expert mentorship. His vision is to empower individuals with cutting-edge digital marketing skills and open doors to new career opportunities.</li>
                            <br />
                        </ul>
                    </div>
                </div>
            </div>
            <style>
                {`
                .expert-about li{
                letter-spacing:2px;
                }
                .trophy{
                position:absolute; 
                top:80%;
                left:87%;
                }
              @media screen and (max-width: 576px){
              .trophy{
              display:none;
              }
              }

                `}
            </style>
        </div>
    )
}
