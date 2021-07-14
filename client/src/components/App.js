import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../redux/store';
import setAuthToken from '../redux/utils/setAuthToken';
import { loadUser } from '../redux/actions/user';

import Navbar from './Navbar';
import PublicQuiz from './PublicQuiz';
import PrivateQuiz from './PrivateQuiz';
import Register from './Register';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import Dashboard from './Dashboard/Dashboard';
import Error from './Error';

import styles from '../css/app.module.css';

if (localStorage.reeToken) {
  setAuthToken(localStorage.reeToken);
}

const App = () => {
  const [activeTab, setActiveTab] = useState({
    name: '', // to show which quiz window to display
    index: null, // to toggle highlight of buttons
  });

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

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
    if (activeTab.name === 'EE' || activeTab.name === 'ESAS') {
      return <PublicQuiz activeSubject={activeTab.name} />;
    }
    if (activeTab.name === 'Custom') return <PrivateQuiz />;

    return null;
  };

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
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
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Error />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
