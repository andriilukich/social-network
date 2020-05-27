import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProp = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export const withAuthRedirect = (Component) => {

  const RedirectComponent = (props) => {
    if (!props.isAuth) return <Redirect to='/login' />;
    return <Component {...props} />
  };

  return connect(mapStateToProp)(RedirectComponent);
};


