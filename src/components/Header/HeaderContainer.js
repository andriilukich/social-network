import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/reducers/auth.reducer';
import { getIsAuth, getLogin } from '../../redux/reducers/auth.selectors';
import Header from './Header';

const HeaderContainer = (props) =>  {
    return <Header {...props} />
}

const mapStateToProps = (state) => ({
  isAuth: getIsAuth(state),
  login: getLogin(state),
});


export default connect(mapStateToProps, { logout })(HeaderContainer);