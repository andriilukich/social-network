import React from 'react';
import classes from './UsersStyles.module.scss';
import UserCard from './UserCard/UserCard';
import Paginator from '../common/Paginator/Paginator';

const Users = (props) => {
  return (
    <div className={classes.usersP} >
      <Paginator
        totalItemsAmount={props.totalUsers}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onPageChange={props.onPageChange}
      />
      <h1 className={classes.usersP__title}>Users Page</h1>
      <ul className={classes.usersP__usersList}>
        {props.users.map(u =>
          <UserCard
            key={u.id}
            id={u.id}
            avatarUrl={u.photos.small}
            isFollowed={u.followed}
            fullName={u.name}
            status={u.status}
            follow={props.follow}
            unfollow={props.unfollow}
            followingInProgress={props.followingInProgress}
          />
        )}
      </ul>
    </div>
  );
}

export default Users;