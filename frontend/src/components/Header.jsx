import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import "./Header.css";
<nav>
  <Link to="/">Home</Link>
  <Link to="/courses">Courses</Link>
  <Link to="/dashboard">Dashboard</Link>  
  <Link to="/login">Login</Link>
</nav>




const Header = () => {
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout || (() => {});
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="brand">
          <span className="brand__logo">E</span>
          <span className="brand__text">LearnSphere</span>
        </Link>

        <nav className="main-nav">
          <NavLink to="/courses" className="main-nav__link">
            Courses
          </NavLink>

          {user && (
            <NavLink to="/dashboard" className="main-nav__link">
              Dashboard
            </NavLink>
          )}

          {true && ( 
  <NavLink to="/admin" className="main-nav__link">
    Admin
  </NavLink>
)}
        </nav>

        <div className="header-actions">
          {!user && (
            <>
              <Link to="/login" className="btn btn--ghost">
                Log in
              </Link>
              <Link to="/signup" className="btn btn--primary">
                Sign up
              </Link>
            </>
          )}

          {user && (
            <div className="header-user">
              <span className="header-user__avatar">
                {user.name?.charAt(0)?.toUpperCase()}
              </span>
              <span className="header-user__name">{user.name}</span>
              <button
                type="button"
                className="btn btn--ghost btn--small"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
