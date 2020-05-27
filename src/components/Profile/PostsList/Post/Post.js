import React from 'react';
import classes from './PostStyles.module.scss';
import placeholderAvatar from '../../../../assets/img/user-avatar.png';

const Post = ({ text, userPhoto }) => {
  const img = {
    backgroundImage: `url('${userPhoto || placeholderAvatar}')`,
  };
  
  return (
    <li className={classes.post}>
      <div className={classes.post__avatar} style={img} />
      <p className={classes.post__text}>{text}</p>
    </li>

  )
};

export default Post;