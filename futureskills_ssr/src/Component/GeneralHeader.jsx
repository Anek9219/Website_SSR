import React from "react";
import Link from "next/link";

export default function GeneralHeader() {
    return (
        <div className="general-header bg-white w-100">
            <div className="container h-100">
                <div className="row d-flex align-items-center h-100">
                    <div className="col-lg-6 col-md-6 col-sm-6 d-flex gap-5 align-items-center">
                        <Link href="mailto:abc@gmail.com" className="text-black">
                            <i class="fa-solid fa-envelope"></i>
                            info@futureskillsacademy.in
                        </Link>
                        <Link href="tel:+918810374145" className="text-black">
                            <i class="fa-solid fa-phone"></i>+918810374145
                        </Link>
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

                </div>
            </div>
        </div>
    );
}

