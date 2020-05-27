
import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavbarStyles.module.scss';

const Nav = () => {
  return (
    <nav className={classes.nav}>
      <ul className={classes.nav__listItems}>
        <li className={classes.nav__item}>
          <NavLink to='/profile'>
            Profile
         </NavLink>
        </li>
        <li className={classes.nav__item}>
          <NavLink  to='/dialogs'>
            Dialogs
         </NavLink>
        </li>
        <li className={classes.nav__item}>
          <NavLink  to='/users'>
          Users
         </NavLink>
        </li>
        <li className={classes.nav__item}>
          <NavLink  to='/news'>
            News
         </NavLink>
        </li>
        <li className={classes.nav__item}>
          <NavLink  to='/settings'>
            Settings
         </NavLink>
        </li>
      </ul>
    </nav>
  );
}


export default Nav;