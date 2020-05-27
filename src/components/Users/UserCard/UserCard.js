import React from 'react';
import classes from './UserCardStyles.module.scss';
import { NavLink } from 'react-router-dom';
import userPhoto from '../../../assets/img/user-avatar.png';

const UserCard = ({ avatarUrl, id, followingInProgress, ...props }) => {
  const userAvatar = {
    backgroundImage: `url('${avatarUrl !== null ?
      avatarUrl :
      userPhoto}')`,
  };

  return (
    <li>
      <article className={classes.userC}>
        <section className={classes.userC__user}>
          <NavLink to={`/profile/${id}`}>
            <div className={classes.userC__avatar} style={userAvatar} />
          </NavLink>
          {props.isFollowed ? (
            <button
              className={classes.userC__btn}
              onClick={() => props.unfollow(id)}
              disabled={followingInProgress.some(userId => userId === id)}
            > Unfollow
            </button>
          ) : (
              <button
                className={classes.userC__btn}
                onClick={() => props.follow(id)}
                disabled={followingInProgress.some(userId => userId === id)}
              > Follow
              </button>
            )
          }
        </section>
        <section className={classes.userC__contact}>
          <h2 className={classes.userC__fullName}>{props.fullName}</h2>
          <p className={classes.userC__status}>{props.status}</p>
        </section>
      </article>
    </li>
  );
};

export default UserCard;