import { GET_FOOTER_INHERIT } from '../constants';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  data: null,
};

export default function footerInherit(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_FOOTER_INHERIT}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_FOOTER_INHERIT}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        data: action.result,
      };
    case `${GET_FOOTER_INHERIT}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
