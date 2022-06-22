/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import createReducer from './reducers/createReducer';
import apiMiddleware from './Middleware/apiMiddleware';

export default function configureStore(initialState = {}, history) {
  let composeEnhancers = compose;

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
    }
  }

  // Create the store with two middlewares
  // 1. ReduxThunk: Makes Redux Thunk work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  // 3. logger: redux-logger to debug the changes on the state
  const middlewares = [
    ReduxThunk,
    routerMiddleware(history),
    logger,
    apiMiddleware,
  ];

  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers)
  );

  // Extensions
  store.injectedReducers = {}; // Reducer registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers/createReducer', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
