import { Link, NavLink } from "react-router-dom";
import React, { useState } from "react";

import Logo from "../imgs/strip.png";
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";

export default function Home() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [slide1, setSlide1] = useState(true);
  const [slide2, setSlide2] = useState(false);
  const [slide3, setSlide3] = useState(false);

  const setSlidder = () => {
    setSlide1(true);
    setSlide2(false);
    setSlide3(false);
  };

  const setSlidder2 = () => {
    setSlide2(true);
    setSlide1(false);
    setSlide3(false);
  };

  const setSlidder3 = () => {
    setSlide2(false);
    setSlide1(false);
    setSlide3(true);
  };

  return (
    <div>
      
      <nav className="navbar navbar-expand-sm bg-light navbar-light">
        <NavLink exact to="/" activeClassName="active" className="nav-link">
          <img src={Logo} alt="logo" className="logo" />
        </NavLink>
        <a
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
          href="/#"
        >
          <span className="navbar-toggler-icon" />
        </a>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          {username ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link
                  to="/commerce/tags"
                  className="nav-link btn btn-dark text-white"
                >
                  GO TO ADMIN
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Sign up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Sign in
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
      <div className="front-bg-line bg-line text-white">
        <div className="header-info container">
          <h1 className="font-weight-light header">
            Looking for an eCommerce Platform like Shopify? You’re in the wrong
            place.
          </h1>
          <h5 className="mt-5 font-weight-light">
            Shopstack provides a simple way to build an online store, without
            have to worry about difficult configurations.
          </h5>
        </div>
      </div>
      <div className="product-description bg-white border-bottom pt-5 pb-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              {slide1 ? (
                <img src={img1} className="img-fluid" alt="dashboard" />
              ) : slide2 ? (
                <img src={img2} className="img-fluid" alt="our pricing tags" />
              ) : slide3 ? (
                <img src={img3} className="img-fluid" alt="our pricing tags" />
              ) : (
                ""
              )}
            </div>
            <div className="col-md-6">
              <h3 className="turn-center">Simple to commerce features</h3>
              <ul className="list-unstyled turn-center">
                <li className="mt-2">
                  <span
                    className={`${
                      slide1 ? "bg-dark rounded p-2 w-50 text-white" : ""
                    } pointer`}
                    onClick={setSlidder}
                  >
                    {" "}
                    Monitor your products.{" "}
                  </span>
                </li>
                <li className="mt-2">
                  <span
                    className={`${
                      slide2 ? "bg-dark rounded p-2 w-50 text-white" : ""
                    } pointer`}
                    onClick={setSlidder2}
                  >
                    Orgainize your products.
                  </span>
                </li>
                <li className="mt-2">
                  <span
                    className={`${
                      slide3 ? "bg-dark rounded p-2 w-50 text-white" : ""
                    } pointer`}
                    onClick={setSlidder3}
                  >
                    Have your own store.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="feature-stage bg-white m0 p-5 text-center">
        <div className="container-fluid">
          <h2 className="text-center mb-4">Features</h2>
          <br />
          <div className="row">
            <div className="col-md-4">
              <h5>
                <i className="uil uil-cloud-check s-30" />
              </h5>
              <h5>Instant upgrades</h5>
              <p>
                All Shopstack updates are automatic, so you'll receive the
                latest features immediately, without any hassle.
              </p>
            </div>
            <div className="col-md-4">
              <h5>
                <i className="uil uil-padlock s-30" />
              </h5>
              <h5>SSL certificate</h5>
              <p>
                Your online store includes a 256-bit SSL certificate to keep
                your customers' information and business data secure.
              </p>
            </div>
            <div className="col-md-4">
              <h5>
                <i className="uil uil-clock s-30" />
              </h5>
              <h5>99.98% uptime.</h5>
              <p>
                No need to worry about downtime with Shopstack, we work around
                the clock to make sure your website is always online.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="call-to-action bg-white border-top p-5 text-center">
        <h3>Try Shopstack for 6 month no payment required.</h3>
        <Link to="/signup" className="btn btn-sm btn-dark pl-4 pr-4">
          Sign up
        </Link>
      </div>
      <footer className="fdb-block text-center bg-line h-100">
        <p className="text-white pt-2">© 2019 Shopstack. All Rights Reserved</p>
      </footer>
    </div>
  );
}
