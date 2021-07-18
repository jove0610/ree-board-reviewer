import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login } from '../redux/actions/user';
import Alert from './Alert';

import styles from '../css/login.module.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.guestLogin = this.guestLogin.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;

    this.props.login(username, password);
  }

  guestLogin() {
    this.props.login('guest', '123456');
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }

    const { username, password } = this.state;

    return (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={this.onSubmit}>
          <h3>Login To Your Account!</h3>
          <div className={styles.formGroup}>
            <label htmlFor="username">
              Username
              <input
                id="username"
                className={styles.formInput}
                type="name"
                name="username"
                value={username}
                onChange={this.onChange}
                required
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">
              Password
              <input
                id="password"
                className={styles.formInput}
                type="password"
                name="password"
                value={password}
                onChange={this.onChange}
                minLength="6"
              />
            </label>
          </div>
          <button type="submit" className={styles.submitBtn}>
            Login
          </button>
          <button
            type="button"
            className={styles.guestBtn}
            onClick={this.guestLogin}
          >
            Login as Guest
          </button>
          <Alert />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
