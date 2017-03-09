const initialState = {
  loading: false,
  form: {},
  exchangeRate: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, loading: true };
    case 'STOP_LOADING':
      return { ...state, loading: false };
    case 'STORE_FORM_FIELDS':
      const payload = action.payload;

      if (state.form.accountFrom && state.form.accountTo) {
        if (payload.accountFrom && payload.accountFrom.value === state.form.accountTo.value) {
          const accountTo = {
            ...payload.accountTo,
            value: state.form.accountFrom.value,
          };

          payload.accountTo = accountTo;
        }

        if (payload.accountTo && payload.accountTo.value === state.form.accountFrom.value) {
          const accountFrom = {
            ...payload.accountFrom,
            value: state.form.accountTo.value,
          };

          payload.accountFrom = accountFrom;
        }
      }

      return {
        ...state,
        form: {
          ...state.form,
          ...payload,
        },
      };
    case 'CALCULATE_TO_AMOUNT':
      const accountToAmount = {
        ...state.form.accountToAmount,
        value: action.value.toFixed(2),
      };

      return {
        ...state,
        form: {
          ...state.form,
          accountToAmount,
        },
      };
    case 'SET_CURRENT_EXCHANGE_RATE':
      return {
        ...state,
        exchangeRate: action.exchangeRate,
      };
    case 'SET_FORM_INITIAL':
      return {
        ...state,
        form: action.payload,
      };
    default:
      return state;
  }
}
