import React, { Component } from "react";
import { createNewUser } from "../../actions/securityActions";
import { connect } from "react-redux";
import classnames from "classnames";

class Register extends Component {
  state = {
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    errors: {},
  };
  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: null,
      },
    });
  };
  handleOnSubmit = (e) => {
    e.preventDefault();
    const { errors, ...user } = this.state;
    this.props.createNewUser(user, this.props.history);
  };
  componentDidMount(){
    if(this.props.security.validToken){
      this.props.history.push("/dashboard")
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  rend;
  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Account</p>
              <form action="create-profile.html">
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      " is-invalid ": errors.fullName,
                    })}
                    placeholder="Full Name"
                    name="fullName"
                    onChange={this.handleOnChange}
                  />
                  {errors.fullName && (
                    <p className="text-danger">{errors.fullName}</p>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    name="username"
                    className={classnames("form-control form-control-lg", {
                      " is-invalid ": errors.username,
                    })}
                    onChange={this.handleOnChange}
                  />
                  {errors.username && (
                    <p className="text-danger">{errors.username}</p>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      " is-invalid ": errors.password,
                    })}
                    placeholder="Password"
                    name="password"
                    onChange={this.handleOnChange}
                  />
                  {errors.password && (
                    <p className="text-danger">{errors.password}</p>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className={classnames("form-control form-control-lg", {
                      " is-invalid ": errors.confirmPassword,
                    })}
                    onChange={this.handleOnChange}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-danger">{errors.confirmPassword}</p>
                )}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                  onClick={this.handleOnSubmit}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    security : state.security
  };
};

export default connect(mapStateToProps, { createNewUser })(Register);
