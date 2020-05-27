import { userAPI } from "../../api/api";
import { updatePropInObjOfAr } from "../../utils/updatePropInObjOfAr";

const FOLLOWED = 'social-network/users/FOLLOWED';
const UNFOLLOWED = 'social-network/users/UNFOLLOWED';
const SET_USERS = 'social-network/users/SET_USERS';
const SET_TOTAL_USERS = 'social-network/users/SET_TOTAL_USERS';
const CHANGE_CURRENT_PAGE = 'social-network/users/CHANGE_PAGE';
const TOGGLE_IS_FETCHING = 'social-network/users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOW_IN_PROGRESS = 'social-network/users/TOGGLE_IS_FOLLOW_IN_PROGRESS';

const initialState = {
  users: [],
  pageSize: 10,
  currentPage: 1,
  totalUsers: 0,
  isFetching: false,
  followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOWED:
      return {
        ...state,
        users: updatePropInObjOfAr(state.users, action.userId, 'id', {followed: true})
      };
    case UNFOLLOWED:
      return {
        ...state,
        users: updatePropInObjOfAr(state.users, action.userId, 'id', {followed: false})
      };
    case SET_USERS:
      return {
        ...state,
        users: action.users
      };
    case SET_TOTAL_USERS:
      return {
        ...state,
        totalUsers: action.totalCount,
      };
    case CHANGE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.page,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case TOGGLE_IS_FOLLOW_IN_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching ?
          [...state.followingInProgress, action.userId] :
          state.followingInProgress.filter(id => id !== action.userId)
      };
    default:
      return state;
  }
};

export const followSuccess = (userId) =>
  ({ type: FOLLOWED, userId });
export const unfollowSuccess = (userId) =>
  ({ type: UNFOLLOWED, userId });
export const setUsers = (users) =>
  ({ type: SET_USERS, users });
export const setTotalUsersCount = (totalCount) =>
  ({ type: SET_TOTAL_USERS, totalCount });
export const changePage = (page) =>
  ({ type: CHANGE_CURRENT_PAGE, page });
export const toggleIsFetching = (isFetching) =>
  ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleIsFollowInProgress = (isFetching, userId) =>
  ({ type: TOGGLE_IS_FOLLOW_IN_PROGRESS, isFetching, userId });

export const requestUsers = (pageSize, page) => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  dispatch(changePage(page));
  const data = await userAPI.getUsers(pageSize, page)
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(data.items));
  dispatch(setTotalUsersCount(data.totalCount));
};

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
  dispatch(toggleIsFollowInProgress(true, userId));
  const data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleIsFollowInProgress(false, userId));
}

export const unfollow = (userId) => async (dispatch) => {
  const apiMethod = userAPI.unfollow.bind(userId);
  const actionCreator = unfollowSuccess;

  followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
}
export const follow = (userId) => async (dispatch) => {
  const apiMethod = userAPI.follow.bind(userId)
  const actionCreator = followSuccess;

  followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
}

export default usersReducer;