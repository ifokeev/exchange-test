const initialState = {
  last: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'GET_RATES_LIST_SUCCESS':
      return {
        ...state,
        last: action.rates,
      };
    default:
      return state;
  }
}
