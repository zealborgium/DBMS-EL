import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Navbar() {
  useEffect(() => {
    // Ensure Bootstrap components are initialized properly
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow"
      style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
    >
      <div className="container">
        {/* Brand Name */}
        <a className="navbar-brand fw-bold fs-1" href="/">
          Conference Management System
        </a>

        {/* Navbar Toggler for Small Screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Offcanvas Menu (Responsive Sidebar) */}
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          style={{ maxWidth: "380px" }} // Limits width for better usability
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title fw-bold" id="offcanvasNavbarLabel">
              Menu
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body">
            {/* Navbar Items */}
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a
                  className="nav-link active fs-5"
                  aria-current="page"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fs-5" href="/login">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fs-5" href="/reviews">
                  Reviews
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fs-5" href="/submit">
                  Submit Papers
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
