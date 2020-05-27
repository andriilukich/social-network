import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { setUserProfile, getUserStatus, updateUserStatus, sendPost, updatePhoto, updateProfileInfo } from '../../redux/reducers/profile.reducer';
import { getProfile, getStatus, getPosts } from '../../redux/reducers/profile.selectors';
import { getIsAuth, getAuthorizedUserId } from '../../redux/reducers/auth.selectors';
import Profile from './Profile';
import { getIsFetching } from '../../redux/reducers/users.selectors';
import Loader from '../common/Loader/Loader';

class ProfileContainer extends React.Component {
  refreshProfile = () => {
    const userId = this.props.match.params.userId ||
      this.props.authorizedUserId ||
      this.props.history.push('/login');
    this.props.setUserProfile(userId);
    this.props.getUserStatus(userId);
  }
  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProp) {
    this.props.match.params.userId !== prevProp.match.params.userId &&
      this.refreshProfile();
  }

  render() {
    return (
      <>
        {this.props.isFetching ?
          <Loader /> :
        <Profile {...this.props} isOwner={!this.props.match.params.userId} />
      }
    </>
    )
  }
};

const mapStateToProps = (state) => ({
          profile: getProfile(state),
  status: getStatus(state),
  isAuth: getIsAuth(state),
  isFetching: getIsFetching(state),
  authorizedUserId: getAuthorizedUserId(state),
  posts: getPosts(state),
});


export default compose(
  withRouter,
  withAuthRedirect,
  connect(mapStateToProps, { setUserProfile, getUserStatus, updateUserStatus, sendPost, updatePhoto, updateProfileInfo})
)(ProfileContainer);