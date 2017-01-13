import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import dashboards from './reducers';
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  dashboardView: dashboards
});

let middleware = [thunkMiddleware];
const loggerMiddleware = createLogger();
middleware = [...middleware, loggerMiddleware]

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(...middleware))
}
// export default function configureStore(preloadedState) {
//   return createStore(
//     dashboards,
//     preloadedState,
//     applyMiddleware(
//       thunkMiddleware,
//       loggerMiddleware
//     )
//   )
// }