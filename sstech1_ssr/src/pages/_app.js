import GeneralHeader from "@/Component/GeneralHeader";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"
import "@/styles/globals.css";
import Header from "@/Component/Header";
import Footer from "@/Component/Footer";
import { useRouter } from "next/router";
import Head from "next/head";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const canonicalUrl = `https://futureskillsacademy.in${router.pathname}`;
  return (
    <>
      <Head>
        <title>Digital Marketing Institute Moradabad | Future Skills Academy</title>
        <meta name="description" content="futureskillsacademy is one of the best digital marketing institute in Moradabad.    " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="icon" href="/assets/logo-no-background-.png" />
      </Head>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
        strategy="beforeInteractive"
      />

      {/* Load Owl Carousel */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"
        strategy="lazyOnload"
        onLoad={() => console.log("Owl Carousel loaded")}
      />

      {/* Owl Carousel CSS */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css"
      />
      <GeneralHeader />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
