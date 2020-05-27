import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './HeaderStyles.module.scss';

const Header = ({isAuth, login, logout}) => {
  return (
    <header className={classes.header}>
      <NavLink to="/" >
        <img className={classes.header__logo}
          src='https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png'
          alt='logo'
        />
      </NavLink>
      {isAuth ? (
        <div>
          <p>{login}</p>
          <button onClick={logout}>Log out</button>
        </div>
      ) : (
          <NavLink className={classes.header__login} to='/login'>Login</NavLink>
        )
      }
    </header>
  )
}

export default Header;