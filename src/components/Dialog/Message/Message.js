import React from 'react';
import classes from './MessageStyles.module.scss';
import UserAvatar from '../../../assets/img/user-avatar.png';

const Message = ({ text, id, src }) => {
  const avatarUrl = {
    backgroundImage: `url('${src|| UserAvatar}')`
  };

  return (
    <li className={classes.message}>
      <div style={avatarUrl} className={classes.message__avatar} />
      <p className={classes.message__text}>{text}</p>
    </li>
  )
}

export default Message;