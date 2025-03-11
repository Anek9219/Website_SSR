import React from "react";

export default function ContactForm1() {
  return (
    <div className="container-fluid form-section my-5">
      {/* <h5 className="ms-5"> FILL UP THE FORM</h5> */}
      <h6 className="ms-5">Get Your Free Quote</h6>
      <div className="row align-items-center">
        <div className="col-lg-5">
          <div className="contact-form p-3 ms-5 text-white">
            <form>
              <div class="row mb-3">
                <div class="col-6">
                  <label for="part" class="form-label">
                    <i class="fa-regular fa-handshake me-3 fs-4"></i>
                    Part
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
                    <i class="fa-regular fa-calendar-days me-3 fs-4"></i>
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
                    <i class="fa-brands fa-magento me-3 fs-4"></i>
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
                    <i class="fa-brands fa-bandcamp me-3 fs-4"></i>
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
                    <i class="fa-regular fa-user me-3 fs-4"></i>
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
                    <i class="fa-solid fa-phone-volume me-3 fs-4"></i>
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
                    <i class="fa-solid fa-envelope-open-text me-3 fs-4"></i>
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
        <div className="col-lg-7">
          <div className="">
            <img
              src="/assets/Mercedese-Engine.png"
              alt=""
              className="img-fluid"
              height={100}
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-easing="ease-out-cubic"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
