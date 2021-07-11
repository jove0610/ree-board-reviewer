import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: {
      id,
      msg,
      alertType,
    },
  });

  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: {
          id,
        },
      }),
    4000
  );
};

export const hello = 'hello';
