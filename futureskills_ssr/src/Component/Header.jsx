import React, { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isNavbarCollapsed, setNavbarCollapsed] = useState(true);
  const handleLinkClick = () => {
    setNavbarCollapsed(true);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-header">
        <div className="container-fluid d-flex header-content">
          <Link className="navbar-brand" href="/">
            <img src="/assets/logo-no-background.png" alt="" width={340} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setNavbarCollapsed(!isNavbarCollapsed)} 
            aria-controls="navbarSupportedContent"
            aria-expanded={!isNavbarCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse justify-content-end ${isNavbarCollapsed ? '' : 'show'}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0 gap-3">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  href="/"
                  onClick={handleLinkClick}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://futureskillsacademy.in/blog" onClick={handleLinkClick}>
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/courses"
                  onClick={handleLinkClick}
                >
                  Courses
                </Link>
              </li>      
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/about"
                  onClick={handleLinkClick}
                >
                 About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/contact"
                  onClick={handleLinkClick}
                >
                  Contact Us
                </Link>
              </li>
              
              <li className="nav-item">
                <Link
                  className="nav-link"
                    href="/Privacy"
                  onClick={handleLinkClick}
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
