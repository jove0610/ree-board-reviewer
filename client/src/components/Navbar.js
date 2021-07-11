import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout as dispatchLogout } from '../redux/actions/user';

import styles from '../css/navbar.module.css';

const Navbar = ({ isAuthenticated, dispatchLogout: logout }) => (
  <div className={styles.container}>
    <header>
      <h1 className={styles.title}>REE Reviewer</h1>
    </header>
    <ul className={styles.navContainer}>
      <li className={styles.navList}>
        <Link to="/" className={styles.navLink}>
          Home
        </Link>
      </li>

      {isAuthenticated ? (
        <>
          <li className={styles.navList}>
            <Link to="/dashboard" className={styles.navLink}>
              Dashboard
            </Link>
          </li>
          <button type="button" className={styles.logoutBtn} onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <li className={styles.navList}>
            <Link to="/login" className={styles.navLink}>
              Login
            </Link>
          </li>
          <li className={styles.navList}>
            <Link to="/register" className={styles.navLink}>
              Register
            </Link>
          </li>
        </>
      )}
    </ul>
  </div>
);

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  dispatchLogout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, { dispatchLogout })(Navbar);
