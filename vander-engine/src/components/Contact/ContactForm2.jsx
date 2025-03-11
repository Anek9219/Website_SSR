import React from "react";

export default function ContactForm2() {
  return (
    <div className="contact-form-2 my-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 p-3">
            <div
              className="row align-items-center justify-content-between p-3"
              style={{ border: "1px solid #1eb7c6" }}
            >
              <div className="col-lg-12">
                <form className="form-start">
                  <div class="row mb-3">
                    <div class="col-6">
                      <label for="part" class="form-label">
                        <i class="fa-regular fa-handshake me-3"></i> Part
                      </label>
                      <select class="form-select" id="part" required>
                        <option value="" disabled selected>
                          Select a part
                        </option>
                        <option value="part1">Part 1</option>
                        <option value="part2">Part 2</option>
                        <option value="part3">Part 3</option>
                      </select>
                    </div>
                    <div class="col-6">
                      <label for="year" class="form-label">
                        <i class="fa-regular fa-calendar-days me-3"></i>
                        Year
                      </label>
                      <select class="form-select" id="year" required>
                        <option value="" disabled selected>
                          Select a year
                        </option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                      </select>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-6">
                      <label for="make" class="form-label">
                        <i class="fa-brands fa-magento me-3"></i>
                        Make
                      </label>
                      <select class="form-select" id="make" required>
                        <option value="" disabled selected>
                          Select a make
                        </option>
                        <option value="make1">Make 1</option>
                        <option value="make2">Make 2</option>
                        <option value="make3">Make 3</option>
                      </select>
                    </div>
                    <div class="col-6">
                      <label for="modal" class="form-label">
                        <i class="fa-brands fa-bandcamp me-3"></i>
                        Modal
                      </label>
                      <select class="form-select" id="modal" required>
                        <option value="" disabled selected>
                          Select a modal
                        </option>
                        <option value="modal1">Modal 1</option>
                        <option value="modal2">Modal 2</option>
                        <option value="modal3">Modal 3</option>
                      </select>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-6">
                      <label for="name" class="form-label">
                        <i class="fa-regular fa-user me-3"></i>
                        Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        placeholder="Enter Name"
                        required
                      />
                    </div>
                    <div class="col-6">
                      <label for="mobile" class="form-label">
                        <i class="fa-solid fa-phone-volume me-3"></i>
                        Mobile
                      </label>
                      <input
                        type="tel"
                        class="form-control"
                        id="mobile"
                        placeholder="Enter Mobile"
                        required
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-12">
                      <label for="email" class="form-label">
                        <i class="fa-solid fa-envelope-open-text me-3"></i>
                        Email
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        placeholder="Enter Email"
                        required
                      />
                    </div>
                  </div>
                  <div className="d-grid">
                    <button type="submit" class="btn btn-block">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="info text-white mt-3 py-3"
        style={{ background: "#1eb7c6" }}
      >
        <div className="container">
          <div className="row justify-content-around">
            <div className="col-lg-3">
              <div className="phone">
                <a
                  href="tel:+18448931760"
                  target="_self"
                  aria-label="call us now"
                >
                  <i
                    className="fa fa-phone me-3 "
                    aria-hidden="true"
                    style={{
                      background: "#fff",
                      color: "#1eb7c6",
                      padding: "10px",
                      borderRadius: "50%",
                    }}
                  ></i>
                </a>
                <span>Phone</span>
                <p className="mt-2 fs-5">+18448931760</p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="email">
                <a
                  href="mailto:billing@vanderengines.com"
                  target="_self"
                  aria-label="email us now"
                >
                  <i
                    className="fa fa-envelope me-3"
                    aria-hidden="true"
                    style={{
                      background: "#fff",
                      color: "#1eb7c6",
                      padding: "10px",
                      borderRadius: "50%",
                    }}
                  ></i>
                </a>
                <span>Email</span>
                <p className="mt-2 fs-5">billing@vanderengines.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
