import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../css/navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.title}>REE Reviewer</h1>
      </header>
      <nav>
        <ul className={styles.navContainer}>
          <Link to="/" className={styles.navLink}>
            <li className={styles.navList}>Home</li>
          </Link>
          <Link to="/login" className={styles.navLink}>
            <li className={styles.navList}>Login</li>
          </Link>
          <Link to="/register" className={styles.navLink}>
            <li className={styles.navList}>Register</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
