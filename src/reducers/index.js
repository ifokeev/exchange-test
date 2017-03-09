import { combineReducers } from 'redux';

import runtime from './runtime';
import rates from './rates';
import accounts from './accounts';
import transactions from './transactions';

export default combineReducers({
  runtime,
  rates,
  accounts,
  transactions,
});
