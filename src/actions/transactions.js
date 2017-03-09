import cuid from 'cuid';

class Transaction {
  constructor({ id, type, transactionGroupId, account, amount, comment }) {
    this.id = id || cuid();
    this.type = type;
    this.transactionGroupId = transactionGroupId || cuid();
    this.accountId = account.id;
    this.currency = account.currency;
    this.amount = amount;
    this.comment = comment || '';
    this.createdAt = new Date();
  }
}

export const create = params => (dispatch) => {
  const newTransaction = new Transaction(params);

  dispatch({
    type: 'CREATE_TRANSACTION_SUCCESS',
    newTransaction,
  });

  dispatch({
    type: 'UPDATE_ACCOUNT_AMOUNT',
    accountId: newTransaction.accountId,
    amount: newTransaction.amount,
  });

  return newTransaction;
};

export const deposit = params => dispatch => dispatch(create({
  ...params,
  type: 'deposit',
}));

export const exchange = (accountFromId, accountToId, amount) => (async (dispatch, getState) => {
  const transactionGroupId = cuid();
  const type = 'exchange';

  const accounts = getState().accounts.items;
  const accountFrom = accounts[accountFromId];
  const accountTo = accounts[accountToId];

  const exchangeRate = getState().runtime.exchangeRate.value;

  const paramsExchangeFrom = {
    account: accountFrom,
    comment: `Exchanged From ${accountFrom.currency}`,
    amount: -amount.toFixed(2),
    transactionGroupId,
    type,
  };

  const paramsExchangeTo = {
    account: accountTo,
    comment: `Exchanged To ${accountTo.currency}`,
    amount: (amount * exchangeRate).toFixed(2),
    transactionGroupId,
    type,
  };

  const newTransactionFrom = dispatch(create(paramsExchangeFrom));
  const newTransactionTo = dispatch(create(paramsExchangeTo));

  return [
    newTransactionFrom,
    newTransactionTo,
  ];
});
