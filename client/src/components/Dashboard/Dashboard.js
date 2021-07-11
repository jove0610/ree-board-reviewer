import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteAccount as dispatchDelAcc } from '../../redux/actions/user';

import Alert from '../Alert';
import AddQuiz from './AddQuiz';
import QuizDashboard from './QuizDashboard';

import styles from '../../css/dashboard.module.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayDelTab: false,
    };

    this.toggleDelTab = this.toggleDelTab.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  toggleDelTab() {
    const { displayDelTab } = this.state;

    if (displayDelTab) {
      this.setState({ displayDelTab: false });
    }

    if (!displayDelTab) {
      this.setState({ displayDelTab: true });
    }
  }

  deleteAccount() {
    const {
      dispatchDelAcc: deleteAccount,
      user: { _id: userId },
    } = this.props;

    deleteAccount(userId);
  }

  render() {
    const {
      user: { username },
    } = this.props;
    const { displayDelTab } = this.state;

    return (
      <>
        <div className={styles.container}>
          <div>
            <h1>{username}</h1>
            <button
              className={styles.btn}
              type="button"
              onClick={this.toggleDelTab}
            >
              Delete Account
            </button>
            {displayDelTab && (
              <>
                <p>Are you sure?</p>
                <button
                  className={styles.btn}
                  type="button"
                  onClick={this.deleteAccount}
                >
                  Delete Account
                </button>
                <br />
                <button
                  className={styles.btn}
                  type="button"
                  onClick={this.toggleDelTab}
                >
                  No
                </button>
                <Alert />
              </>
            )}
          </div>
          <AddQuiz />
        </div>
        <QuizDashboard />
      </>
    );
  }
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  dispatchDelAcc: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, { dispatchDelAcc })(Dashboard);
