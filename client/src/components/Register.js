import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { register } from '../redux/actions/user';
import { setAlert } from '../redux/actions/alert';

import Alert from './Alert';

import styles from '../css/register.module.css';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      password2: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { username, password, password2 } = this.state;

    if (password !== password2) {
      return this.props.setAlert('Password does not match', 'danger');
    }

    return this.props.register(username, password);
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }

    const { username, password, password2 } = this.state;

    return (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={this.onSubmit}>
          <h3>Create An Account!</h3>
          <div className={styles.formGroup}>
            <label htmlFor="username">
              Username
              <input
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
          <div className={styles.formGroup}>
            <label htmlFor="password2">
              Confirm Password
              <input
                id="password2"
                className={styles.formInput}
                type="password"
                name="password2"
                value={password2}
                onChange={this.onChange}
                minLength="6"
              />
            </label>
          </div>
          <button type="submit" className={styles.submitBtn}>
            Register
          </button>
          <Alert />
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, { register, setAlert })(Register);
