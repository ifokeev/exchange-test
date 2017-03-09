import { startLoading, stopLoading } from './runtime';
import cuid from 'cuid';

class Account {
  constructor({ id, currency, amount }) {
    this.id = id || cuid();
    this.currency = currency;
    this.amount = amount || 0;
  }
}

export const create = (params) => (async (dispatch, getState) => {
  const newAccount = new Account(params);
  dispatch({ type: 'CREATE_ACCOUNT_SUCCESS', newAccount });

  return newAccount;
});
