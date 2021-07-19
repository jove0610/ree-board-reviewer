import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteQuiz as dispatchDelQuiz } from '../../redux/actions/user';

import EditQuiz from './EditQuiz';

import styles from '../../css/quizDashboard.module.css';

class QuizDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quizIndex: 0,
      displayDelTab: false,
      displayEditTab: false,
    };

    this.onClickPrev = this.onClickPrev.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
    this.toggleDelTab = this.toggleDelTab.bind(this);
    this.toggleEditTab = this.toggleEditTab.bind(this);
    this.onClickDel = this.onClickDel.bind(this);
  }

  onClickPrev() {
    const { quizIndex, displayDelTab, displayEditTab } = this.state;
    const { quizData } = this.props;

    if (displayDelTab || displayEditTab) {
      this.setState({ displayDelTab: false, displayEditTab: false });
    }

    if (quizIndex === 0) {
      this.setState({ quizIndex: quizData.length - 1 });
      return;
    }
    this.setState({ quizIndex: quizIndex - 1 });
  }

  onClickNext() {
    const { quizIndex, displayDelTab, displayEditTab } = this.state;
    const { quizData } = this.props;

    if (displayDelTab || displayEditTab) {
      this.setState({ displayDelTab: false, displayEditTab: false });
    }

    if (quizIndex === quizData.length - 1) {
      this.setState({ quizIndex: 0 });
      return;
    }
    this.setState({ quizIndex: quizIndex + 1 });
  }

  onClickDel() {
    const { dispatchDelQuiz: deleteQuiz, quizData } = this.props;
    const { quizIndex } = this.state;
    if (quizIndex !== 0) {
      this.setState({ quizIndex: quizIndex - 1 });
    }
    deleteQuiz(quizData[quizIndex]._id);
    this.toggleDelTab();
  }

  checkIfCorrectAnswer(answer) {
    const { quizData } = this.props;
    const { quizIndex } = this.state;
    if (quizData[quizIndex].answer === answer) {
      return '#14F073';
    }

    return null;
  }

  toggleDelTab() {
    const { displayDelTab } = this.state;
    if (displayDelTab) {
      this.setState({ displayDelTab: false, displayEditTab: false });
    }
    if (!displayDelTab) {
      this.setState({ displayDelTab: true, displayEditTab: false });
    }
  }

  toggleEditTab() {
    const { displayEditTab } = this.state;
    if (displayEditTab) {
      this.setState({ displayEditTab: false, displayDelTab: false });
    }
    if (!displayEditTab) {
      this.setState({ displayEditTab: true, displayDelTab: false });
    }
  }

  render() {
    const { quizData } = this.props;
    const { quizIndex, displayDelTab, displayEditTab } = this.state;

    if (quizData === undefined) {
      return null;
    }

    if (quizData.length === 0) {
      return null;
    }

    return (
      <div className={styles.main}>
        <nav className={styles.buttonContainer}>
          <button
            className={styles.button}
            type="button"
            onClick={this.onClickPrev}
          >
            Prev
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={this.onClickNext}
          >
            Next
          </button>
        </nav>
        <main className={styles.mainDiv}>
          <p className={styles.subHeading}>
            {`${quizIndex + 1} / ${quizData.length}`}
          </p>
          <p
            className={styles.questionnaire}
            dangerouslySetInnerHTML={{
              __html: quizData[quizIndex].questionnaire,
            }}
          />
          <ol className={styles.choices}>
            <li
              className={styles.choices}
              style={{ backgroundColor: this.checkIfCorrectAnswer('optionA') }}
            >
              {quizData[quizIndex].optionA}
            </li>
            <li
              className={styles.choices}
              style={{ backgroundColor: this.checkIfCorrectAnswer('optionB') }}
            >
              {quizData[quizIndex].optionB}
            </li>
            <li
              className={styles.choices}
              style={{ backgroundColor: this.checkIfCorrectAnswer('optionC') }}
            >
              {quizData[quizIndex].optionC}
            </li>
            <li
              className={styles.choices}
              style={{ backgroundColor: this.checkIfCorrectAnswer('optionD') }}
            >
              {quizData[quizIndex].optionD}
            </li>
          </ol>
        </main>
        <section>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              type="button"
              onClick={this.toggleEditTab}
            >
              Edit
            </button>
            <button
              className={styles.button}
              type="button"
              onClick={this.toggleDelTab}
            >
              Delete
            </button>
          </div>

          {displayDelTab && (
            <>
              <p className={styles.subHeading}>Are you sure?</p>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.button}
                  type="button"
                  onClick={this.onClickDel}
                >
                  Delete Now
                </button>
                <button
                  className={styles.button}
                  type="button"
                  onClick={this.toggleDelTab}
                >
                  No
                </button>
              </div>
            </>
          )}
        </section>
        {displayEditTab && (
          <EditQuiz
            quizData={quizData[quizIndex]}
            toggleDisplayCB={this.toggleEditTab}
          />
        )}
      </div>
    );
  }
}

QuizDashboard.propTypes = {
  quizData: PropTypes.array.isRequired,
  dispatchDelQuiz: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  quizData: state.user.user.quiz,
});

export default connect(mapStateToProps, { dispatchDelQuiz })(QuizDashboard);
