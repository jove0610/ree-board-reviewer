import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { editQuiz as dispatchEditQuiz } from '../../redux/actions/user';

import styles from '../../css/editQuiz.module.css';

class EditQuiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionnaire: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      answer: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeRadio = this.onChangeRadio.bind(this);
  }

  componentDidMount() {
    const { questionnaire, optionA, optionB, optionC, optionD } =
      this.props.quizData;

    this.setState({
      questionnaire,
      optionA,
      optionB,
      optionC,
      optionD,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { questionnaire, optionA, optionB, optionC, optionD, answer } =
      this.state;
    const {
      dispatchEditQuiz: editQuiz,
      quizData: { _id },
      toggleDisplayCB,
    } = this.props;

    const formData = {
      _id,
      questionnaire,
      optionA,
      optionB,
      optionC,
      optionD,
      answer,
    };

    editQuiz(formData);

    this.setState({
      questionnaire: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
    });

    toggleDisplayCB();
  }

  onChangeText(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeRadio(e) {
    this.setState({ answer: e.target.getAttribute('data-answer-edit') });
  }

  render() {
    const { questionnaire, optionA, optionB, optionC, optionD } = this.state;

    const { toggleDisplayCB } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <div className={styles.formText}>
          <label htmlFor="questionnaire">
            Questionnaire:
            <textarea
              id="questionnaire"
              className={styles.inputText}
              name="questionnaire"
              value={questionnaire}
              onChange={this.onChangeText}
              required
            />
          </label>
          <label htmlFor="optionA">
            Option A:
            <input
              id="optionA"
              className={styles.inputText}
              type="name"
              name="optionA"
              value={optionA}
              onChange={this.onChangeText}
              required
            />
          </label>
          <label htmlFor="optionB">
            Option B:
            <input
              id="optionB"
              className={styles.inputText}
              type="name"
              name="optionB"
              value={optionB}
              onChange={this.onChangeText}
              required
            />
          </label>
          <label htmlFor="optionC">
            Option C:
            <input
              id="optionC"
              className={styles.inputText}
              type="name"
              name="optionC"
              value={optionC}
              onChange={this.onChangeText}
              required
            />
          </label>
          <label htmlFor="optionD">
            Option D:
            <input
              id="optionD"
              className={styles.inputText}
              type="name"
              name="optionD"
              value={optionD}
              onChange={this.onChangeText}
              required
            />
          </label>
        </div>

        <div className={styles.formAnswer}>
          <p>Answer:</p>

          <label htmlFor="answerEditA" className={styles.inputRadio}>
            <input
              id="answerEditA"
              type="radio"
              name="answer"
              data-answer-edit="optionA"
              onChange={this.onChangeRadio}
              required
            />
            Option A
          </label>
          <br />
          <label htmlFor="answerEditB" className={styles.inputRadio}>
            <input
              id="answerEditB"
              type="radio"
              name="answer"
              data-answer-edit="optionB"
              onChange={this.onChangeRadio}
              required
            />
            Option B
          </label>
          <br />
          <label htmlFor="answerEditC" className={styles.inputRadio}>
            <input
              id="answerEditC"
              type="radio"
              name="answer"
              data-answer-edit="optionC"
              onChange={this.onChangeRadio}
              required
            />
            Option C
          </label>
          <br />
          <label htmlFor="answerEditD" className={styles.inputRadio}>
            <input
              id="answerEditD"
              type="radio"
              name="answer"
              data-answer-edit="optionD"
              onChange={this.onChangeRadio}
              required
            />
            Option D
          </label>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Edit
        </button>
        <button
          type="button"
          className={styles.submitBtn}
          onClick={toggleDisplayCB}
        >
          Cancel
        </button>
      </form>
    );
  }
}

EditQuiz.propTypes = {
  dispatchEditQuiz: PropTypes.func.isRequired,
  quizData: PropTypes.object.isRequired,
  toggleDisplayCB: PropTypes.func.isRequired,
};

export default connect(null, { dispatchEditQuiz })(EditQuiz);
