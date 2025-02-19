import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { io } from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

function Navbar() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<string[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");

    const socket = io("http://localhost:5000"); // Replace with your backend server URL

    socket.on("new-notification", (notification: string) => {
      setNotifications((prevNotifications) => {
        const updatedNotifications = [...prevNotifications, notification];
        setUnreadCount(updatedNotifications.length);
        return updatedNotifications;
      });
      toast.info(notification); // Show toast for real-time notification
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleLogout = () => {
    if (auth && auth.logout) {
      auth.logout();
      navigate("/login");
    }
  };

  // Determine the dashboard link based on the user's role
  const getDashboardLink = () => {
    if (!auth.user) return "/home"; // Default to home if no user is logged in
    switch (auth.user.role) {
      case "admin":
        return "/admin-dashboard";
      case "reviewer":
        return "/reviewer-dashboard";
      case "author":
        return "/author-dashboard";
      default:
        return "/home";
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow"
      style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
    >
      <div className="container">
        <a className="navbar-brand fw-bold fs-2" href="/">
          Conference Management System
        </a>

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

        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          style={{ maxWidth: "380px" }}
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
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              {/* Dynamically switch "Home" to "Dashboard" */}
              <li className="nav-item">
                <a className="nav-link active fs-6" href={getDashboardLink()}>
                  {auth.user ? "Dashboard" : "Home"}
                </a>
              </li>

              {auth && auth.user ? (
                <>
                  {auth.user.role === "admin" && (
                    <li className="nav-item">
                      <a className="nav-link fs-6" href="/admin-dashboard">
                        Admin Dashboard
                      </a>
                    </li>
                  )}
                  {auth.user.role === "reviewer" && (
                    <>
                      <li className="nav-item">
                        <a className="nav-link fs-6" href="/assigned-papers">
                          Assigned Papers
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link fs-6" href="/review-paper">
                          Review Papers
                        </a>
                      </li>
                    </>
                  )}
                  {auth.user.role === "author" && (
                    <li className="nav-item">
                      <a className="nav-link fs-6" href="/submit">
                        Submit Papers
                      </a>
                    </li>
                  )}
                  <li className="nav-item">
                    <button
                      className="nav-link text-white fs-6"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <a className="nav-link fs-6" href="/login">
                      Login
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link fs-6" href="/signup">
                      Sign Up
                    </a>
                  </li>
                </>
              )}

              {/* Notification Bell */}
              {auth && auth.user && (
                <li className="nav-item">
                  <a
                    className="nav-link fs-5 position-relative"
                    href="#"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#notificationsPanel"
                    aria-controls="notificationsPanel"
                  >
                    <i className="bi bi-bell-fill"></i> {/* Bell Icon */}
                    {unreadCount > 0 && (
                      <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">
                        {unreadCount}
                      </span>
                    )}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <ToastContainer />
    </nav>
  );
}

export default Navbar;
