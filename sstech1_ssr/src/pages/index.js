import Head from "next/head";
import { useEffect } from "react";
import Home_form from "@/Component/Home/Home_form";
import Counter from "@/Component/Home/Counter";
import AboutUs from "@/Component/Home/AboutUs";
import Specialization from "@/Component/Home/Specialization";
import HomeModules from "@/Component/Home/HomeModules";
import HomeJoine_us from "@/Component/Home/HomeJoine_us";
import HomeCourse_Benefits from "@/Component/Home/HomeCourse_Benefits";
import Services from "@/Component/Home/Services";
import WhyChoose from "@/Component/Home/WhyChoose";
import Form from "@/Component/Form";
import OurAcheivements from "@/Component/Home/OurAcheivements";
import Expert from "@/Component/Home/Expert";
import Information from "@/Component/Home/Information";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();
  const canonicalUrl = `https://futureskillsacademy.in${router.pathname}`;
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <section
        className="position-relative "
        style={{
          backgroundImage:
            "url(assets/bg-1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgb(67 60 57 / 97%)" }}
        ></div>
        <div className="home py-4 position-relative z-index-3">
          <div className="container">
            <div className="row align-items-center justify-content-center " >
              <div className="col-lg-6 hero-main-text mb-3 txt-section">
                <h3 className="animate__animated animate__fadeInDown fw-bold text-white">

                </h3>
                <p>Boost Your Career With <span style={{ color: "#ff9c00" }}> Future Skills Academy </span> </p>
                <h1 className="animate__animated animate__fadeInLeft hero-text  ">
                  100% Placement <span> Guranteed </span>
                  {" "}
                </h1>
                <div className="row justify-content-center bg-white border rounded mx-1 py-3" style={{ boxShadow: "0 0 3px" }}>
                  <div className="col-6">
                    <div className="card card-1 d-flex flex-row align-items-center " style={{ background: "none", border: "none" }}>
                      <img src="/assets/course-5.png" width={40} height={40} className=" border rounded-circle me-1" />
                      <div className=" ">
                        <h6 style={{ color: "#ff9c00" }}>
                          10.5 LPA
                        </h6>
                        <p> Highest Package </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card card-1 d-flex flex-row align-items-center " style={{ background: "none", border: "none" }}>
                      <img src="/assets/course-4.webp" width={40} height={40} className="border rounded-circle me-1" />

                      <div className="">
                        <h6 style={{ color: "#ff9c00" }}>
                          4.5 LPA
                        </h6>
                        <p> Average Package </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card card-1 d-flex flex-row align-items-center " style={{ background: "none", border: "none" }}>
                      <img src="/assets/course-1.png" width={40} height={40} className="border rounded-circle me-1" />

                      <div className="">
                        <h6 style={{ color: "#ff9c00" }}>
                          93%
                        </h6>
                        <p> Placement Rate </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card card-1 d-flex flex-row align-items-center " style={{ background: "none", border: "none" }}>
                      <img src="/assets/course-3.webp" width={40} height={40} className="border rounded-circle me-1" />

                      <div className="">
                        <h6 style={{ color: "#ff9c00" }}>
                          54%
                        </h6>
                        <p> Average Salary Increase </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-black text-center"> Placement stats as per the internal 2025 report </p>
                </div>
              </div>
              <div className="col-lg-6 form-section">
                <Home_form />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Counter />
      <AboutUs />
      <Specialization />
      <HomeModules />
      <HomeJoine_us />
      <HomeCourse_Benefits />
      <Services />
      <WhyChoose />
      <Expert />
      <Form />
      <OurAcheivements />
      <Information />
    </>
  );
}
