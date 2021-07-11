import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  ACCOUNT_DELETED,
  QUIZ_ADDED,
  QUIZ_UPDATED,
  QUIZ_DELETED,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async (dispatch) => {
  if (localStorage.reeToken) {
    setAuthToken(localStorage.reeToken);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = { username, password };

  try {
    const res = await axios.post('/api/user', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: REGISTER_FAIL,
    });

    errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
  }
};

export const login = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = { username, password };

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: LOGIN_FAIL,
    });

    errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });

  window.location.reload();
};

export const deleteAccount = (userId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = {
    user: {
      id: userId,
    },
  };

  try {
    await axios.delete('/api/user', body, config);

    dispatch({
      type: ACCOUNT_DELETED,
    });

    window.location.reload();
  } catch (err) {
    alert('Server Error');
  }
};

export const addQuiz = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = {
    quiz: formData,
  };

  try {
    const res = await axios.post('/api/quiz', body, config);

    dispatch({
      type: QUIZ_ADDED,
      payload: res.data,
    });

    dispatch(setAlert('Successfully Added!', 'success'));
  } catch (err) {
    alert('Server Error');
  }
};

export const editQuiz = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = {
    quiz: formData,
  };

  try {
    const res = await axios.put('/api/quiz', body, config);

    dispatch({
      type: QUIZ_UPDATED,
      payload: res.data,
    });
  } catch (err) {
    alert('Server Error');
  }
};

export const deleteQuiz = (quizId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/quiz/delete/${quizId}`);

    dispatch({
      type: QUIZ_DELETED,
      payload: res.data,
    });
  } catch (err) {
    alert('Server Error');
  }
};
