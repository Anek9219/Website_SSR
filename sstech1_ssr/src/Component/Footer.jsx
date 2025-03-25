import React from "react";
import Link from "next/link";
export default function Footer() {
    return (
        <>
            <footer className=" text-lg-start full-footer">
                <section className="d-flex justify-content-center justify-content-lg-between p-3 border-bottom">
                    <div className="me-5 d-none d-lg-block">
                        <span className="fw-bold">
                            Get connected with us on social networks:
                        </span>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 d-flex justify-content-end social-link">
                        <a
                            href="https://www.facebook.com/share/14q4TABVYYP/?mibextid=wwXIfr"
                            className="me-3 text-reset"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fa-brands fa-facebook-f"></i>
                        </a>
                        <a
                            href="https://twitter.com"
                            className="me-3 text-reset"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fa-brands fa-twitter"></i>
                        </a>
                        <a
                            href="https://youtube.com"
                            className="me-3 text-reset"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fa-brands fa-youtube"></i>
                        </a>
                        <a
                            href="#"
                            className="me-3 text-reset"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fa-brands fa-google"></i>
                        </a>
                        <a
                            href="https://www.instagram.com/futureskills__academy/profilecard/?igsh=ajQ0ZG12cGlrc3U1"
                            className="me-3 text-reset"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a
                            href="https://www.linkedin.com/company/saranlights/"
                            className="me-3 text-reset"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                    </div>
                </section>
                <section className="footer pt-1">
                    <div className="container  text-md-start">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <span>&#128924;</span>
                                    Future Skills Academy
                                </h6>
                                <p>
                                    Future Skills Academy is a leading Digital Marketing Services
                                    provider. We provide SEO, SMO, Google Ads, Meta Ads, and Web
                                    Development services.
                                </p>
                            </div>

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4 footer-link">
                                    Section
                                </h6>
                                <p>
                                    <Link href="/" className="text-reset">
                                        Home
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

                            </div>
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4 footer-link">
                                    Section
                                </h6>
                                <p>
                                    <Link href="/blog" className="text-reset">
                                        Blog
                                    </Link>
                                </p>
                                <p>
                                    <Link href="/courses" className="text-reset">
                                        Courses
                                    </Link>
                                </p>
                                <p>
                                    <Link href="/Privacy" className="text-reset">
                                        Privacy
                                    </Link>
                                </p>
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-5 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                                <p class="social-link">
                                    <i class="fa-solid fa-location-pin me-1"></i>
                                    H.N 208 Sector 12 Phase 2 Buddhi Vihar, Moradabad
                                </p>
                                <p className="social-link">
                                    <i class="fa-solid fa-envelope me-1"></i>
                                    info@futureskillsacademy.in
                                </p>
                                <p className="social-link">
                                    <i class="fa-solid fa-phone me-1"></i> +918810374145
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div
                    className="text-center p-4"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                >
                    <Link
                        className="text-reset fw-bold"
                        href="https://mdbootstrap.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Copyright © 2024 | Powered by{" "}
                        <span style={{ color: "#ff9c00" }}>[Future Skills Academy]</span>
                    </Link>
                </div>
            </footer>
        </>
    );
}
