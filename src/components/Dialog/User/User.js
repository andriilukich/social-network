import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './UserStyles.module.scss';

const User = ({ name, id, active = false }) => {
  let style = active ?
    [classes.user, classes.user_active].join(' ') :
    classes.user;

  return (
    <li className={style}>
      <NavLink className={classes.user__link} to={`/dialogs/${id}`}>{name}</NavLink>
    </li>
  )
}
export default User;