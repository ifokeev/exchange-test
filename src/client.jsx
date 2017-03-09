import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import configureStore from './utils/configureStore';

import { baseCurrencies } from './config';

import { list } from './actions/rates';
import { storeFormFields, calculateToAmount, calculateCurrentExchangeRate } from './actions/runtime';
import { create as createAccount } from './actions/accounts';
import { deposit as createDeposit } from './actions/transactions';

import App from './components/App';
import '../static/styles/app.scss';

const container = document.getElementById('root');

const store = configureStore();

const storeDefaultAccounts = () => {
  baseCurrencies.forEach(currency =>
    store.dispatch(createAccount({
      currency,
    }))
  );
};

const storeDefaultDeposit = () => {
  const accounts = store.getState().accounts.items;

  Object.keys(accounts).forEach((key) => {
    const transactionParams = {
      account: accounts[key],
      amount: 100,
      comment: 'Initial Deposit',
    };

    store.dispatch(createDeposit(transactionParams));
  });
};

const storeDefaultInitialAccounts = () => {
  const accounts = store.getState().accounts.items;
  const keys = Object.keys(accounts);

  const accountFrom = accounts[keys[0]];
  const accountTo = accounts[keys[1]];

  const fields = {
    accountFrom: {
      value: accountFrom.id,
    },
    accountTo: {
      value: accountTo.id,
    },
  };

  store.dispatch(storeFormFields(fields));
};

const storeRates = async () => {
  await store.dispatch(list());
};

const main = async () => {
  await storeRates();
  setInterval(() => {
    storeRates();
    store.dispatch(calculateCurrentExchangeRate());
    store.dispatch(calculateToAmount());
  }, 30000);

  storeDefaultAccounts();
  storeDefaultInitialAccounts();
  storeDefaultDeposit();


  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    container
  );
};

main();
