import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import profilePageReducer from './reducers/profile.reducer';
import dialogPageReducer from './reducers/dialog.reducer';
import usersPageReducer from './reducers/users.reducer';
import authReducer from './reducers/auth.reducer';
import ThunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from './reducers/app.reducer';

const reducers = combineReducers({
  profilePage: profilePageReducer,
  dialogPage: dialogPageReducer,
  usersPage: usersPageReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(ThunkMiddleware)));

window.__store__ = store;
export default store;