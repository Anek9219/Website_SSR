import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNavbar = () => {
    if (window.innerWidth < 992) {
      setIsNavOpen(false);
    }
  };

  return (
    <>
    {/* Google Tag Manager */}
    <script>
      {`
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-NRT4R6J');
    `}
    </script>
    {/* End Google Tag Manager */}

    <header className="header d-flex justify-content-center">
      <nav className="navbar navbar-expand-xl navbar-light bg-light">
        <div className="container-fluid">
          <Link href="/" className="navbar-brand" onClick={closeNavbar}>
            <img src="/assets/logo.png" alt="Logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={isNavOpen ? "true" : "false"}
            aria-label="Toggle navigation"
            onClick={toggleNavbar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`} id="navbarNav">
            <ul className="navbar-nav m-auto">
              {[
                { href: "/", label: "Home" },
                { href: "/engine", label: "Engines" },
                { href: "/transmission", label: "Transmissions" },
                { href: "/about", label: "About Us" },
                { href: "https://vanderengines.com/blog/", label: "Blogs" },
                { href: "/contact", label: "Contact" },
                { href: "/Policies", label: "Our Policies" },
                { href: "/financing", label: "Financing" },
              ].map(({ href, label }) => (
                <li className="nav-item" key={href}>
                  <Link href={href} className="nav-link" onClick={closeNavbar}>
                    {label}
                  </Link>
                </li>
              ))}
              <div className="contact align-items-center">
                <a href="tel:+18448931760" target="_self" aria-label="call us now">
                  <i className="fa-solid fa-phone mx-3" style={{ background: "#1eb7c6", color: "#fff" }}></i>
                </a>
                <div className="contact-info">
                  <span>FREE CONSULTATION!</span>
                  <Link href="/search" className="nav-link p-0 number" onClick={closeNavbar}>
                    +18448931760
                  </Link>
                </div>
              </div>
              <li className="nav-item">
                <Link href="/addtocart" className="nav-link ms-3" onClick={closeNavbar}>
                  <i className="fa-solid fa-cart-shopping" id="cart"></i>
                </Link>
              </li>
            </ul>
          
          </div>
        </div>
      </nav>
    </header>
    </>
  );
}
