const initialState = {
  items: {},
  groups: {},
};

export default function (state = initialState, action) {
  let items;
  let groups;

  switch (action.type) {
    case 'CREATE_TRANSACTION_SUCCESS':
      items = {
        [action.newTransaction.id]: {
          ...action.newTransaction,
        },
        ...state.items,
      };

      const groupId = action.newTransaction.transactionGroupId;
      const mergeGroup = state.groups[groupId] ? state.groups[groupId] : [];

      groups = {
        ...state.groups,
        [groupId]: [
          action.newTransaction.id,
          ...mergeGroup,
        ],
      };

      return {
        ...state,
        items,
        groups,
      };
    default:
      return state;
  }
}
