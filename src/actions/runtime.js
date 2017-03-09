export const startLoading = () => ({
  type: 'START_LOADING',
});

export const stopLoading = () => ({
  type: 'STOP_LOADING',
});

export const setInitialAccount = (field, account) => ({
  type: 'SET_INITIAL_ACCOUNT',
  field,
  account,
});

export const calculateCurrentExchangeRate = () => (dispatch, getState) => {
  const accountFromId = getState().runtime.form.accountFrom.value;
  const accountToId = getState().runtime.form.accountTo.value;

  const accounts = getState().accounts.items;
  const accountFrom = accounts[accountFromId];
  const accountTo = accounts[accountToId];

  const lastRate = getState().rates.last;
  const value = lastRate[accountTo.currency] * (1 / lastRate[accountFrom.currency]);

  dispatch({
    type: 'SET_CURRENT_EXCHANGE_RATE',
    exchangeRate: {
      currencyFrom: accountFrom.currency,
      currencyTo: accountTo.currency,
      value: (value && value.toFixed(6)) || 0,
    },
  });

  return value;
};

export const calculateToAmount = () => (dispatch, getState) => {
  const exchangeRate = (getState().runtime.exchangeRate && getState().runtime.exchangeRate.value) || 0;
  const accountFromAmount = (getState().runtime.form.accountFromAmount && getState().runtime.form.accountFromAmount.value) || 0;

  const value = accountFromAmount * exchangeRate;

  dispatch({
    type: 'CALCULATE_TO_AMOUNT',
    value,
  });
};

export const storeFormFields = fields => (dispatch) => {
  dispatch({
    type: 'STORE_FORM_FIELDS',
    payload: fields,
  });

  dispatch(calculateCurrentExchangeRate());
  dispatch(calculateToAmount());
};
