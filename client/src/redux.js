export const API_CALL_REQUEST = "API_CALL_REQUEST";
export const API_CALL_SUCCESS = "API_CALL_SUCCESS";
export const API_CALL_FAILURE = "API_CALL_FAILURE";

const initialState = {
  fetching: false,
  aircraft: null,
  error: null,
  userDirection: 0,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case API_CALL_REQUEST:
      return { ...state, fetching: true, error: null, userDirection: action.userDirection};
    case API_CALL_SUCCESS:
      return { ...state, fetching: false, aircraft: action.aircraft };
    case API_CALL_FAILURE:
      return { ...state, fetching: false, aircraft: [], error: action.error };
    default:
      return state;
  }
}