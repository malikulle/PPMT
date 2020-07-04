import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class Landing extends Component {
  render() {
    const { validToken, user } = this.props.security;
    let IsAuthenticated = (
      <>
        <Link to="/register" className="btn btn-lg btn-primary mr-2">
          Sign Up
        </Link>
        <Link to="/login" className="btn btn-lg btn-secondary mr-2">
          Login
        </Link>
      </>
    );
    if (validToken) {
      IsAuthenticated = <h3>{user.fullName}</h3>;
    }
    return (
      <div className="landing">
        <div className="light-overlay landing-inner text-dark">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">
                  Personal Project Managenent Tool
                </h1>
                <p className="lead">
                  Create your account to join active projects or start you own
                </p>
                <hr />
                {IsAuthenticated}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  security: state.security,
});
export default connect(mapStateToProps, null)(Landing);
