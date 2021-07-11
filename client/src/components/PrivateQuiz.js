import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Questionnaire from './Questionnaire';

import styles from '../css/privateQuiz.module.css';

const PrivateQuiz = ({ user: { isAuthenticated, user } }) => {
  // For logged in user with quizzes on database
  if (isAuthenticated && (user.quiz === undefined || user.quiz.length > 0)) {
    const quizData = {
      json: user.quiz,
      textLabel: 'Custom',
    };

    return (
      <main className={styles.main}>
        <Questionnaire quizData={quizData} />
      </main>
    );
  }

  // For logged in user without any quiizes on databases
  if (isAuthenticated && (user.quiz === undefined || user.quiz.length === 0)) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <p className={styles.header}>You do not have any data!</p>
          <p className={styles.linkText}>
            Go to{' '}
            <Link to="/dashboard" className={styles.link}>
              Dashboard
            </Link>{' '}
            now to create one
          </p>
        </div>
      </main>
    );
  }

  // default return (not logged in)
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <p className={styles.header}>You are not logged in!</p>
        <p className={styles.linkText}>
          <Link to="/login" className={styles.link}>
            Login Now
          </Link>{' '}
          or
          <Link to="/register" className={styles.link}>
            {' '}
            Register{' '}
          </Link>
        </p>
      </div>
    </main>
  );
};

PrivateQuiz.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(PrivateQuiz);
