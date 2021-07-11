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
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('reeToken'),
  isAuthenticated: false,
  user: null,
};

const user = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    // Authetication reducers
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('reeToken', payload.token);
      return {
        ...state,
        ...payload,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('reeToken');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      };

    // Quiz reducers
    case QUIZ_ADDED:
    case QUIZ_UPDATED:
    case QUIZ_DELETED:
      return {
        ...state,
        user: { ...state.user, quiz: payload },
      };

    default:
      return state;
  }
};

export default user;
