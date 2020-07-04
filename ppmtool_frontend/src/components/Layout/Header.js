import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";

class Header extends Component {
  logout = () => {
    this.props.logout();
    window.location.href = "/";
  };
  render() {
    const { validToken, user } = this.props.security;
    let IsAuthenticated = "";
    if (validToken) {
      IsAuthenticated = (
        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/register" className="nav-link ">
                <i className="fas fa-user-clircle mr-1" /> {user.fullName}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/logout" onClick={this.logout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      );
    } else {
      IsAuthenticated = (
        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/register" className="nav-link ">
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      );
    }

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Personal Project Management Tool
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {IsAuthenticated}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, { logout })(Header);
