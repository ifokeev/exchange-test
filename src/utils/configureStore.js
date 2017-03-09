import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

let middlewares = [thunkMiddleware];

if (__DEVELOPMENT__) {
  const loggerMiddleware = createLogger()
  middlewares = [...middlewares, loggerMiddleware];
}

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middlewares)
  );
}
