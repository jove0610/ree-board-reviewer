import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from '../css/questionnaire.module.css';

const Questionnaire = ({ quizData }) => {
  const [toggleAnswer, setToggleAns] = useState({
    color: '',
    show: false,
  });
  const [quizIndex, setQuizIndex] = useState(0);

  useEffect(() => {
    setQuizIndex(0);
  }, [quizData]);

  const getAnswerBtnClass = () => {
    if (toggleAnswer.show) {
      return `${styles.button} ${styles.buttonActive}`;
    }
    return `${styles.button}`;
  };

  // returns list element(choices) that has inline style of bgColor on the correct answer
  const inspectedListElement = (optionX) => {
    if (quizData.json[quizIndex].answer === optionX) {
      return (
        <li
          className={styles.choices}
          style={{ backgroundColor: toggleAnswer.color }}
        >
          {quizData.json[quizIndex][optionX]}
        </li>
      );
    }
    return (
      <li className={styles.choices}>{quizData.json[quizIndex][optionX]}</li>
    );
  };

  const onClickAns = () => {
    if (toggleAnswer.show) {
      setToggleAns({ color: '', show: false });
    }
    if (!toggleAnswer.show) {
      setToggleAns({ color: '#14F073', show: true });
    }
  };

  const onClickPrev = () => {
    if (quizIndex === 0) {
      setQuizIndex(quizData.json.length - 1);
      return;
    }
    setQuizIndex(quizIndex - 1);
  };

  const onClickNext = () => {
    if (quizIndex === quizData.json.length - 1) {
      setQuizIndex(0);
      return;
    }
    setQuizIndex(quizIndex + 1);
  };

  if (quizData === undefined) return null;
  if (quizData.json[quizIndex] === undefined) return null;

  return (
    <>
      <nav className={styles.buttonContainer}>
        <button className={styles.button} type="button" onClick={onClickPrev}>
          Prev
        </button>
        <button
          className={getAnswerBtnClass()}
          type="button"
          onClick={onClickAns}
        >
          Answer
        </button>
        <button className={styles.button} type="button" onClick={onClickNext}>
          Next
        </button>
      </nav>
      <main className={styles.mainDiv}>
        <p className={styles.subHeading}>
          {`${quizIndex + 1} / ${quizData.json.length}`}
          &nbsp; &nbsp;
          {quizData.textLabel}
        </p>
        <p
          className={styles.questionnaire}
          dangerouslySetInnerHTML={{
            __html: quizData.json[quizIndex].questionnaire,
          }}
        />
        <ol className={styles.choices}>
          {inspectedListElement('optionA')}
          {inspectedListElement('optionB')}
          {inspectedListElement('optionC')}
          {inspectedListElement('optionD')}
        </ol>
      </main>
    </>
  );
};

Questionnaire.propTypes = {
  quizData: PropTypes.object.isRequired,
};

export default Questionnaire;
