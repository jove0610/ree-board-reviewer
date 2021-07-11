import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import Questionnaire from './Questionnaire';

import styles from '../css/publicQuiz.module.css';

import esas20 from '../quiz-json/esas_2020.json';
import esas19 from '../quiz-json/esas_2019.json';
import esas18 from '../quiz-json/esas_2018.json';
import esas17 from '../quiz-json/esas_2017.json';
import ee19 from '../quiz-json/ee_2019.json';
import ee18 from '../quiz-json/ee_2018.json';
import ee17 from '../quiz-json/ee_2017.json';

const PublicQuiz = ({ activeSubject }) => {
  const examESAS = useMemo(
    () => [
      {
        json: esas20,
        examSet: 0,
        btnLabel: '2020',
        textLabel: 'ESAS 2020',
      },
      {
        json: esas19,
        examSet: 1,
        btnLabel: '2019',
        textLabel: 'ESAS 2019',
      },
      {
        json: esas18,
        examSet: 2,
        btnLabel: '2018',
        textLabel: 'ESAS 2018',
      },
      {
        json: esas17,
        examSet: 3,
        btnLabel: '2017',
        textLabel: 'ESAS 2017',
      },
    ],
    []
  );

  const examEE = useMemo(
    () => [
      {
        json: ee19,
        examSet: 0,
        btnLabel: '2019',
        textLabel: 'EE 2019',
      },
      {
        json: ee18,
        examSet: 1,
        btnLabel: '2018',
        textLabel: 'EE 2018',
      },
      {
        json: ee17,
        examSet: 2,
        btnLabel: '2017',
        textLabel: 'EE 2017',
      },
    ],
    []
  );

  const [currentYear, setCurrentYear] = useState({
    quizData: null,
    activeTab: null, // to toggle highlight of buttons
  });

  useEffect(() => {
    if (activeSubject === 'EE') {
      setCurrentYear({
        quizData: examEE[0],
        activeTab: 0,
      });
    }
    if (activeSubject === 'ESAS') {
      setCurrentYear({
        quizData: examESAS[0],
        activeTab: 0,
      });
    }
  }, [activeSubject, examESAS, examEE]);

  const renderYearTab = () => {
    const setButtonClass = (tabIndex) => {
      if (tabIndex === currentYear.activeTab) {
        return `${styles.button} ${styles.buttonActive}`;
      }
      return `${styles.button}`;
    };

    if (activeSubject === 'EE') {
      return examEE.map((set, index) => (
        <button
          className={setButtonClass(index)}
          key={set.textLabel}
          type="button"
          onClick={() => {
            setCurrentYear({
              quizData: examEE[index],
              activeTab: index,
            });
          }}
        >
          {set.btnLabel}
        </button>
      ));
    }

    if (activeSubject === 'ESAS') {
      return examESAS.map((set, index) => (
        <button
          className={setButtonClass(index)}
          key={set.textLabel}
          type="button"
          onClick={() => {
            setCurrentYear({
              quizData: examESAS[index],
              activeTab: index,
            });
          }}
        >
          {set.btnLabel}
        </button>
      ));
    }

    return null;
  };

  return (
    <main className={styles.main}>
      <nav className={styles.navYear}>{renderYearTab()}</nav>
      {currentYear.quizData !== null && (
        <Questionnaire quizData={currentYear.quizData} />
      )}
    </main>
  );
};

PublicQuiz.propTypes = {
  activeSubject: PropTypes.string.isRequired,
};

export default PublicQuiz;
