import React from "react";
// import "@/components/AboutUs/about.css"
import styles from "@/components/AboutUs/about.module.css";
import WhyChoose from "@/components/Home/WhyChoose";
import Brands from "@/components/Home/Brands";
import { useRouter } from "next/router";
import Head from "next/head";
export default function About() {
  const router = useRouter();
  const canonicalUrl = `https://vanderengines.com${router.pathname}`;

  return (
    <>
      {/* <Helmet> */}

      {/* </Helmet> */}
      <Head>
        <title>Vander Engines | About Us</title>
        <meta name="description" content="Learn about Vander Engines, your trusted source for quality used and remanufactured engines and transmissions. Our commitment to reliability and performance sets us apart." />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <main>
        <div className={`${styles.about_hero} d-flex align-items-center justify-content-center mb-5`}  >
          <div className="container">
            <h1 className={`${styles.about_head_1} text-center`}>About Us</h1>
          </div>
        </div>
        <div className={ `${styles.about_content} mb-5`} >
          <div className="container">
            <h3 className="my-3">About Us</h3>
            <h4>ALL TYPE OF CAR PARTS DELIVERED</h4>
            <p>
              We are committed to delivering the highest quality auto parts at the
              lowest possible price. Our inventory includes used, late-model, and
              high-end vehicle parts to meet your desired needs. If the part you’re
              looking for isn’t in stock, our team will find it for you. With our
              guaranteed parts, we ensure you to feel confident in the quality and
              reliability of every purchase.
            </p>
            <p>
              Keeping in view the current market scenario, challenges being faced,
              we decided to build a company that has made it easier for auto repair
              professionals to find quality parts from hundreds of vendors
              nationwide. Our vision was to make used auto parts easy to purchase
              and to guarantee on-time delivery, so auto mechanics could finish
              repairs on time.
            </p>
            Our goal is to be a one-stop shop for auto repair facilities to quickly
            and easily buy used and remanufactured OEM parts with standardized
            service, warranty, and customer service experience.
            <h5 className="my-3">Your one-stop shop for auto parts is right here.</h5>
            <p>
              Vander Engines is a comprehensive used car part marketplace with a
              nationwide network of facilities. We offer a large selection of
              quality parts at competitive prices. We take full responsibility for
              fulfilling all orders. We do this so that we can guarantee timely
              delivery and offer a heightened level of customer service.
            </p>
            <p>
              " You may save a lot of money buying used spare parts, and with us you
              will only find the best prices. "
            </p>
            <p>
              We are dedicated to providing you the highest quality auto parts at
              the lowest possible price. We carry used, late model, High end vehicle
              parts. If we don't have the part in stock we will find it for you. All
              parts are guaranteed to ensure you are satisfied with your purchase.
            </p>
          </div>
        </div>
        <WhyChoose />
        <Brands />
      </main>
    </>
  );
}
