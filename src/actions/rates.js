import axios from 'axios';
import { startLoading, stopLoading } from './runtime';

import { openExchangeRatesAppId, baseCurrencies } from '../config';

export const list = () => (async (dispatch) => {
  dispatch(startLoading());

  const res = await axios({
    method: 'get',
    url: 'http://openexchangerates.org/api/latest.json',
    params: {
      app_id: openExchangeRatesAppId,
      symbols: baseCurrencies.join(','),
    },
  });

  const rates = res.data.rates;

  dispatch({
    type: 'GET_RATES_LIST_SUCCESS',
    rates,
  });

  dispatch(stopLoading());

  return rates;
});
