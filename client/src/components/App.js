import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './Navbar';
import PublicQuiz from './PublicQuiz';

import styles from '../css/app.module.css';

const App = () => {
  const [activeTab, setActiveTab] = useState({
    name: '', // to show which quiz window to display
    index: null, // to toggle highlight of buttons
  });

  const setButtonClass = (tabIndex) => {
    if (tabIndex === activeTab.index) {
      return `${styles.button} ${styles.buttonActive}`;
    }
    return `${styles.button}`;
  };

  const onClick = (e) => {
    setActiveTab({
      name: e.target.name,
      index: e.target.getAttribute('datatab'),
    });
  };

  const renderMainApp = () => {
    if (activeTab.name === '') return null;
    if (activeTab.name === 'EE' || activeTab.name === 'ESAS') {
      return <PublicQuiz activeSubject={activeTab.name} />;
    }
    if (activeTab.name === 'Custom') {
      return <h1>HEllo World</h1>;
    }
  };

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <nav className={styles.navSubject}>
            <button
              className={setButtonClass('0')}
              type="button"
              datatab="0"
              name="EE"
              onClick={onClick}
            >
              EE
            </button>
            <button
              className={setButtonClass('1')}
              type="button"
              datatab="1"
              name="ESAS"
              onClick={onClick}
            >
              ESAS
            </button>
            <button
              className={setButtonClass('2')}
              type="button"
              datatab="2"
              name="Custom"
              onClick={onClick}
            >
              Custom
            </button>
          </nav>
          {renderMainApp()}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
