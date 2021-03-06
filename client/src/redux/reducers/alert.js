import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const alert = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((msg) => msg.id !== payload.id);
    default:
      return state;
  }
};

export default alert;
