import React from "react";
import {Link} from "react-router-dom";
import {slideToggle} from "./../../composables/slideToggle.js";

import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from "../../redux/api/auth/loginSlice.js";
function Header() {
  const navigate = useNavigate();
  const toggleAppSidebarDesktop = () => {
    var elm = document.querySelector(".app");
    if (elm) {
      if (
        !(
          elm.classList.contains("app-with-top-nav") &&
          elm.classList.contains("app-without-sidebar")
        )
      ) {
        elm.classList.toggle("app-sidebar-collapsed");
      }
    }
  };

  const toggleAppSidebarMobile = () => {
    var elm = document.querySelector(".app");
    if (elm) {
      if (
        !(
          elm.classList.contains("app-with-top-nav") &&
          elm.classList.contains("app-without-sidebar")
        )
      ) {
        elm.classList.toggle("app-sidebar-mobile-toggled");
      } else {
        slideToggle(document.querySelector(".app-top-nav"));
      }
    }
  };

  const toggleAppHeaderSearch = () => {
    var elm = document.querySelector(".app");
    elm.classList.toggle("app-header-menu-search-toggled");
  };

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div id="header" className="app-header">
      <div className="desktop-toggler">
        <button
          type="button"
          className="menu-toggler"
          onClick={toggleAppSidebarDesktop}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      <div className="mobile-toggler">
        <button
          type="button"
          className="menu-toggler"
          onClick={toggleAppSidebarMobile}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      <div className="brand">
        <Link to="/" className="brand-logo">
          <span className="brand-text">Computer Items</span>
        </Link>
      </div>

      <div className="menu">
        <div className="menu-item dropdown dropdown-mobile-full">
          <button onClick={handleLogout}>LogOut</button>{" "}
        </div>

        <div className="menu-item dropdown dropdown-mobile-full">
          <a
            href="#/"
            data-bs-toggle="dropdown"
            data-bs-display="static"
            className="menu-link">
            <div className="menu-img online">
              {/* <img
                src={
                  profile?.profileImageURL
                    ? profile?.profileImageURL
                    : "/assets/img/user/profile.jpg"
                }
                alt="Profile"
                height="60"
              /> */}
            </div>

            {/* <div className="menu-text d-sm-block d-none "> {profile?.name}</div> */}
          </a>
          <div className="dropdown-menu dropdown-menu-end me-lg-3 fs-11px mt-1">
            <Link
              to="/profile"
              className="dropdown-item d-flex align-items-center">
              PROFILE{" "}
              <i className="bi bi-person-circle ms-auto text-theme fs-16px my-n1"></i>
            </Link>
            {/* <Link to="/email/inbox" className="dropdown-item d-flex align-items-center">INBOX <i className="bi bi-envelope ms-auto text-theme fs-16px my-n1"></i></Link> */}
            {/* <Link to="/calendar" className="dropdown-item d-flex align-items-center">CALENDAR <i className="bi bi-calendar ms-auto text-theme fs-16px my-n1"></i></Link> */}
            <Link
              to="/settings"
              className="dropdown-item d-flex align-items-center">
              SETTINGS{" "}
              <i className="bi bi-gear ms-auto text-theme fs-16px my-n1"></i>
            </Link>
            <div className="dropdown-divider"></div>
            <Link
              onClick={() => {
                localStorage.clear();
              }}
              to="/login"
              className="dropdown-item d-flex align-items-center">
              LOGOUT{" "}
              <i className="bi bi-toggle-off ms-auto text-theme fs-16px my-n1"></i>
            </Link>
          </div>
        </div>
      </div>

      <form className="menu-search" method="POST" name="header_search_form">
        <div className="menu-search-container">
          <div className="menu-search-icon">
            <i className="bi bi-search"></i>
          </div>
          <div className="menu-search-input">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search menu..."
            />
          </div>
          <div className="menu-search-icon">
            <a href="#/" onClick={toggleAppHeaderSearch}>
              <i className="bi bi-x-lg"></i>
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Header;
