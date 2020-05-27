import React from 'react';
import { connect } from 'react-redux';
import {
  follow,
  unfollow,
  requestUsers,
} from '../../redux/reducers/users.reducer';
import Users from './Users';
import Loader from '../common/Loader/Loader';
import { getUsers, getCurrentPage, getTotalUsers, getFollowingInProgress, getIsFetching, getPageSize } from '../../redux/reducers/users.selectors';

class UsersContainer extends React.Component {
  componentDidMount() {
    const {requestUsers, pageSize, currentPage} = this.props;
    requestUsers(pageSize, currentPage);
  }

  onPageChange = (currentPage) => {
    const {requestUsers, pageSize} = this.props;
    requestUsers(pageSize, currentPage);
  }

  render() {
    const {isFetching, totalUsers, pageSize, currentPage, users, follow, unfollow, followingInProgress} = this.props;
    return (
      <>
        {isFetching ?
          <Loader /> :
          <Users
            totalUsers={totalUsers}
            pageSize={pageSize}
            currentPage={currentPage}
            users={users}
            onPageChange={this.onPageChange}
            follow={follow}
            unfollow={unfollow}
            followingInProgress={followingInProgress}
          />
        }
      </>
    );
  }

}

const mapStateToProps = (state) => ({
  users: getUsers(state),
  pageSize: getPageSize(state),
  currentPage: getCurrentPage(state),
  totalUsers: getTotalUsers(state),
  isFetching: getIsFetching(state),
  followingInProgress: getFollowingInProgress(state),
});

export default connect(mapStateToProps, {
  follow,
  unfollow,
  requestUsers,
})(UsersContainer);