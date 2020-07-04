import React, { Component } from "react";
import { login } from "../../actions/securityActions";
import { connect } from "react-redux";
import classnames from "classnames";

class Login extends Component {
  state = {
    username: "",
    password: "",
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
    this.props.login(user);
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
    if (nextProps.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <form onSubmit={this.handleOnSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      " is-invalid ": errors.username,
                    })}
                    placeholder="Email Address"
                    name="username"
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
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
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
    security: state.security,
    errors: state.errors,
  };
};

export default connect(mapStateToProps, { login })(Login);
