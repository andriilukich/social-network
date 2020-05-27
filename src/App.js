import React, { Suspense } from 'react';
import { Switch, Route, withRouter, BrowserRouter } from 'react-router-dom';
import store from './redux/store.redux';
import { Provider, connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/reducers/app.reducer';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import Login from './components/Login/Login';
import Loader from './components/common/Loader/Loader';
import PageNotFound from './components/PageNotFound/PageNotFound';
import './App.scss';
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const DialogContainer = React.lazy(() => import('./components/Dialog/DialogContainer'));

class App extends React.Component {
  catchAllUnhandledErrors = (promiseRejectionEvent) => {
    console.error(promiseRejectionEvent);
  }
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }
  render() {
    if (!this.props.initialized) return <Loader />
    return (
      <div className="App">
        <HeaderContainer />
        <Navbar />
        <Switch>
          <Route
            path='/dialogs'
            render={() => (
              <Suspense fallback={<Loader />}>
                <DialogContainer />
              </Suspense>
            )}
          />
          <Route
            path='/news'
            render={() =>
              <News />
            }
          />
          <Route
            path='/settings'
            render={() =>
              <Settings />
            }
          />
          <Route
            path='/users'
            render={() => (
              <Suspense fallback={<Loader />}>
                <UsersContainer />
              </Suspense>
            )}
          />
          <Route
            path='/login'
            render={() =>
              <Login />
            }
          />
          <Route
            path='/profile/:userId?'
            render={() =>
              <ProfileContainer />
            }
          />
          <Route
            path='/'
            render={() =>
              <ProfileContainer />
            }
          />
          <Route
            path='*'
            component={PageNotFound}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  initialized: state.app.initialized,
});

const AppContainer = compose(withRouter, connect(mapStateToProps, { initializeApp }))(App);

const SocialApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
};

export default SocialApp;