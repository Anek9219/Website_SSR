import React from "react";
import styles from "@/pages/Financing/financing.module.css"
import FinancingCard from "./Financing/FinancingCard";
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Financing() {
  const router = useRouter();
  const canonicalUrl = `https://vanderengines.com${router.pathname}`;
  return (
    <>
      <Head>
        <title>Vander Engines | Financing</title>
        <meta name="description" content="Get financing options for quality used and rebuilt engines." />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <main>
        <div className={`${styles.finance} d-flex align-items-center justify-content-center mb-5`}>
          <div className="container">
            <h1 className={`${styles.about_head_1} text-center text-white fs-1`}>Financing</h1>
          </div>
        </div>
        <div className={styles.financing}>
          <div className="container about-content">
            <h3>Vander Financing</h3>
            <p>Vander Financing
              Vander Engines offers multiple financing options to help get your vehicle back on the road. You can even get pre-approved over the phone by calling us at +1 8448931760. To ease our customers minds, inquiries for most of our financing options do not affect your credit score.</p>
            <p>PLEASE NOTE: Our sales and finance team will assist you throughout the financing application procedure. Once your application is accepted, the financing company will make the payment to Vander Engines. If you choose to cancel the transaction after the payment has been processed by the financing company, a Transaction Cancellation Fee will be incurred.</p>
          </div>
        </div>
        <FinancingCard />
      </main>
    </>
  );
}
