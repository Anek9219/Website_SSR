import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {


  {/* Owl Carousel CSS */ }
  
  return (

    <Html lang="en">
      <Head >
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
        <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css"
  />
  <link
      rel="icon"
      type="image/svg+xml"
      href="https://cdn.iconscout.com/icon/premium/png-512-thumb/car-1783335-1516832.png?f=webp&w=256"
    />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
