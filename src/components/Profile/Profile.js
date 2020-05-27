import React from 'react';
import User from './User/User';
import PostsList from './PostsList/PostsList';
import classes from './ProfileStyles.module.scss';

const Profile = (props) => {
  return (
    <main className={classes.profile}>
      <article className={classes.profile__slider}>
        <img className={classes.profile__img}
          src='https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
          alt='slider'
        />
      </article>
      <User {...props} />
      <PostsList {...props} />
    </main>
  );
};

export default Profile;