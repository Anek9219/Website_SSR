import React from "react";
import Link from "next/link";

// import { useEffect } from "react";
export default function Footer() {

//   useEffect(() => {
//     const noscriptTag = document.createElement("noscript");
//     noscriptTag.innerHTML = `
//       <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NRT4R6J" 
//         height="0" width="0" style="display:none;visibility:hidden"></iframe>
//     `;
//     document.body.appendChild(noscriptTag);
  
//     return () => {
//       document.body.removeChild(noscriptTag);
//     };
//   }, []);
  

//   var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
//   (function(){
//   var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
//   s1.async=true;
//   s1.src='https://embed.tawk.to/672e984c4304e3196adf7e51/1ic705qrg';
//   s1.charset='UTF-8';
//   s1.setAttribute('crossorigin','*');
//   s0.parentNode.insertBefore(s1,s0);
//   })();

  return (
    <>
      {/* <ScrollText /> */}
      <a
        href="tel:+18448931760"
        className="float"
        target="_self"
        aria-label="call us now"
      >
        <i className="fa-sharp fa-solid fa-phone my-float mx-2 fs-5"></i>
        Call For Price
      </a>
      <footer className="text-center text-lg-start text-muted bg-light">
        <section
          className="d-flex justify-content-center justify-content-lg-between p-4"
          style={{ borderTop: "2px solid #000" }}
        >
          <div className="me-5 d-none d-lg-block fw-bold">
            <span>Get connected with us on social networks:</span>
          </div>

          <div id="icon-section" className="d-flex">
            <a
              href="https://www.facebook.com/vanderengines/"
              className="me-3 text-reset"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://x.com/i/flow/login?redirect_after_login=%2FVanderengines"
              className="me-3 text-reset"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.vanderengines.com/"
              className="me-3 text-reset"
            >
              <i className="fab fa-google"></i>
            </a>
            <a
              href="https://www.instagram.com/vanderengines/"
              className="me-3 text-reset"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/vanderengines/"
              className="me-3 text-reset"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/" className="me-3 text-reset">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </section>

        <section className="footer text-white">
          <div className="container text-center text-md-start">
            <div className="row align-items-center">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <img src="/assets/logo.png" alt="" />
                </h6>
                <p>
                  We are offering free quote from suppliers across US on Quality
                  Used and Rebuilt Engines that are tested thoroughly before
                  delivered.
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-2">Quick Links</h6>
                <p>
                  <Link href="/" className="text-reset">
                    Home
                  </Link>
                </p>
                <p>
                  <Link href="/engine" className="text-reset">
                    Engines
                  </Link>
                </p>
                <p>
                  <Link href="/transmission" className="text-reset">
                    Transmissions
                  </Link>
                </p>
                <p>
                  <Link href="/about" className="text-reset">
                    About Us
                  </Link>
                </p>
                <p>
                  <Link href="/contact" className="text-reset">
                    Contact Us
                  </Link>
                </p>
                {/* <p>
                  <Link href="/search" className="text-reset">
                    Search Car Parts
                  </Link>
                </p> */}

                <Link href="/blog" className="text-reset">
                  blog
                </Link>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <Link href="/return" className="text-reset">
                    Return And Cancel Policy
                  </Link>
                </p>
                <p>
                  <Link href="/warranty" className="text-reset">
                    Warranty Policy
                  </Link>
                </p>
                <p>
                  <Link href="/termsofservice" className="text-reset">
                    Term of Services
                  </Link>
                </p>
                <p>
                  <Link href="/privacy" className="text-reset">
                    Privacy Policy
                  </Link>
                </p>
                <p>
                  <Link href="/shipping" className="text-reset">
                    Shipping Policy
                  </Link>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                {/* <p>
                  <i className="fas fa-home me-2"></i>
                  15150 Cicero Avenue, Oak Forest, Il 60452
                </p> */}
                <p>
                  <i className="fas fa-envelope me-3"></i>{" "}
                  billing@vanderengines.com
                </p>
                <p>
                  <i className="fas fa-phone me-3"></i> +1844-893-1760
                </p>
                <p>
                  <img
                    src="/assets/cardList.webp"
                    alt=""
                    width={350}
                    className="img-fluid"
                  />
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-4 fw-bold text-white"
          style={{ backgroundColor: "#000" }}
        >
          © 2024 Copyright:
          <a className="text-info fw-bold" href="https://mdbootstrap.com/">
            {" "}
            Vander Engines
          </a>
        </div>
      </footer>
    </>
  );
}
