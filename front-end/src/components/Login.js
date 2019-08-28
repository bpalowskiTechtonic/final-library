import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { register, login } from "../redux/actions/authActionCreators";
import { getAllBooks } from "../redux/actions/libraryActionsCreators";

import "../css/bootstrap.min.css";
import "../css/layout.css";
import Jumbotron from "./Jumbotron";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConf: "",
      strongPassword: false,
      newUser: false
    };
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handlePasswordValidation = event => {
    const validationRegEx = /SOME_PASSWORD_VALIDATION_HERE/;

    if (validationRegEx.test(event.target.value)) {
      event.target.classList.add("form-validation-passes");
      event.target.classList.remove("form-validation-fails");
      this.setState({ strongPassword: true });
    } else {
      event.target.classList.remove("form-validation-passes");
      event.target.classList.add("form-validation-fails");
      this.setState({ strongPassword: false });
    }
  };

  handleNewUser = () => {
    // TODO
    this.setState({
      newUser: true
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password, passwordConf, newUser } = this.state;
    newUser
      ? this.handleRegister(email, password, passwordConf)
      : this.handleLogin(email, password);
  };

  handleRegister = (email, password, passwordConf) => {
    let obj = {
      email,
      password,
      passwordConf
    };
    this.props.register(obj);
  };

  handleLogin = (email, password) => {
    let obj = {
      email,
      password
    };
    this.props.login(obj);
  };

  persistTokenIfDev = () => {

    if (process.env.NODE_ENV === 'development') {
      
      localStorage.setItem(
        'authToken',
        this.props.user.token
      );
    }
  };

  componentDidUpdate() {
    if (this.props.userIsAuthenticated) {

      this.persistTokenIfDev()
      this.props.history.push("/");
      this.props.getAllBooks();
    }
  }

  render() {
    const { newUser, strongPassword } = this.state;

    return (
      <div>
        <Jumbotron centerVertically={true} />
        <Modal isOpen fade={false} className="loginmodal-container">
          <ModalHeader>
            <p className="modal-title">{`Welcome ${" "}`}</p>
          </ModalHeader>

          <ModalBody>
            <form
              onSubmit={this.handleSubmit}
              disabled={strongPassword}
              id="login"
              className="form-group login-form"
            >
              <input
                name="email"
                type="text"
                onChange={this.handleChange}
                value={this.state.email}
                placeholder={"email@domain.com"}
                className="form-control"
              />
              <input
                name="password"
                type="password"
                onBlur={this.handlePasswordValidation}
                onChange={this.handleChange}
                value={this.state.password}
                placeholder={"password"}
                className="form-control"
              />
              {newUser && (
                <input
                  name="passwordConf"
                  type="password"
                  onBlur={this.handlePasswordValidation}
                  onChange={this.handleChange}
                  value={this.state.passwordConf}
                  placeholder={"confirm password"}
                  className="form-control"
                />
              )}
              <div className="form-group">
                <button
                  type="submit"
                  form="login"
                  className="btn-primary btn form-control"
                >
                  {newUser ? "Register" : "Login"}
                </button>
              </div>
            </form>
          </ModalBody>

          <ModalFooter>
            <button
              variant="primary"
              className="btn btn-default pull-right"
              type="button"
            >
              Close
            </button>

            <button
              variant={newUser ? "primary" : "alternate"}
              className="btn-primary btn pull-left"
              type="button"
              onClick={this.handleNewUser}
            >
              {newUser ? "Returning User" : "New User"}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {

  return {
    userIsAuthenticated: state.auth.userIsAuthenticated,
    user:  state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register,
    login,
    getAllBooks
  };
};

export default connect(
  // APPRENTICES
  mapStateToProps,
  mapDispatchToProps
)(Login);
