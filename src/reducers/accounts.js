const initialState = {
  items: {},
};

export default function (state = initialState, action) {
  let items;

  switch (action.type) {
    case 'CREATE_ACCOUNT_SUCCESS':
      items = {
        [action.newAccount.id]: {
          ...action.newAccount,
        },
        ...state.items,
      };

      return {
        ...state,
        items,
      };
    case 'UPDATE_ACCOUNT_AMOUNT':
      items = {
        ...state.items,
      };

      const oldAmount = items[action.accountId].amount;
      const newAmount = parseFloat(oldAmount) + parseFloat(action.amount);
      items[action.accountId].amount = newAmount;

      return {
        ...state,
        items,
      };
    default:
      return state;
  }
}
