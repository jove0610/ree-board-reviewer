import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addQuiz as dispatchAddQuiz } from '../../redux/actions/user';

import Alert from '../Alert';

import styles from '../../css/addQuiz.module.css';

class AddQuiz extends React.Component {
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

    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeRadio = this.onChangeRadio.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeText(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeRadio(e) {
    this.setState({ answer: e.target.getAttribute('data-answer') });
  }

  onSubmit(e) {
    e.preventDefault();
    const { questionnaire, optionA, optionB, optionC, optionD, answer } =
      this.state;
    const { dispatchAddQuiz: addQuiz } = this.props;

    const formData = {
      questionnaire,
      optionA,
      optionB,
      optionC,
      optionD,
      answer,
    };

    addQuiz(formData);

    this.setState({
      questionnaire: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
    });
  }

  render() {
    const { questionnaire, optionA, optionB, optionC, optionD } = this.state;

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

          <label htmlFor="answerA" className={styles.inputRadio}>
            <input
              id="answerA"
              type="radio"
              name="answer"
              data-answer="optionA"
              onChange={this.onChangeRadio}
              required
            />
            Option A
          </label>
          <br />
          <label htmlFor="answerB" className={styles.inputRadio}>
            <input
              id="answerB"
              type="radio"
              name="answer"
              data-answer="optionB"
              onChange={this.onChangeRadio}
              required
            />
            Option B
          </label>
          <br />
          <label htmlFor="answerC" className={styles.inputRadio}>
            <input
              id="answerC"
              type="radio"
              name="answer"
              data-answer="optionC"
              onChange={this.onChangeRadio}
              required
            />
            Option C
          </label>
          <br />
          <label htmlFor="answerD" className={styles.inputRadio}>
            <input
              id="answerD"
              type="radio"
              name="answer"
              data-answer="optionD"
              onChange={this.onChangeRadio}
              required
            />
            Option D
          </label>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Add Questionnaire
        </button>

        <Alert />
      </form>
    );
  }
}

AddQuiz.propTypes = {
  dispatchAddQuiz: PropTypes.func.isRequired,
};

export default connect(null, { dispatchAddQuiz })(AddQuiz);
