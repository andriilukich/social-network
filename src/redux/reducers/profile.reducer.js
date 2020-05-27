import { profileAPI } from "../../api/api";
import { v4 as uuidv4 } from 'uuid';
import { stopSubmit } from "redux-form";
import { toggleIsFetching } from './users.reducer';

const ADD_NEW_POST = 'social-network/profile/ADD_NEW_POST';
const SET_USER_PROFILE = 'social-network/profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'social-network/profile/SET_USER_STATUS';
const DELETE_POST = 'social-network/profile/DELETE_POST';
const UPDATE_PHOTO = 'social-network/profile/UPDATE_PHOTO';

const initialState = {
  profile: null,
  status: 'Click to add status',
  newPostText: '',
  posts: []
};

const profilePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_POST:
      const newPost = {
        text: action.newPostBody,
        id: uuidv4(),
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: [...state.posts.filter(p => p.id !== action.postID)]
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      };
    case SET_USER_STATUS:
      return {
        ...state,
        status: action.status
      };
    case UPDATE_PHOTO:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      };
    default:
      return state;
  }
};

export const sendPost = (newPostBody) =>
  ({ type: ADD_NEW_POST, newPostBody });
export const deletePost = postID =>
  ({ type: DELETE_POST, postID });
export const setUserProfileAC = (profile) =>
  ({ type: SET_USER_PROFILE, profile });
export const setUserStatus = (status) =>
  ({ type: SET_USER_STATUS, status });
export const updatePhotSuccess = (photos) =>
  ({ type: UPDATE_PHOTO, photos });

export const updatePhoto = (img) => async (dispatch) => {
  try {
    const response = await profileAPI.updatePhoto(img);
    const respData = response.data;
    if (respData.resultCode === 0) {
      dispatch(updatePhotSuccess(respData.data.photos));
    } else {
      throw new Error(respData.messages);
    }
  } catch (err) {
    console.error('The request is not success: ', err);
  }
}
export const updateProfileInfo = (formData) => async (dispatch, getState) => {
  try {
    const response = await profileAPI.updateProfileInfo(formData);
    const respData = response.data;
    if (respData.resultCode === 0) {
      dispatch(setUserProfile(formData.userId));
    } else {
      const messages = respData.messages.length > 0 ? respData.messages : 'Some error occurred';
      dispatch(stopSubmit('infoUpdate', { _error: messages }));
      return Promise.reject(messages);
    }
  } catch (err) {
    console.error('The request is not success: ', err);
  }
}

export const setUserProfile = (userId) => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  const data = await profileAPI.getProfile(userId);
  dispatch(setUserProfileAC(data));
  dispatch(getUserStatus(userId));
  dispatch(toggleIsFetching(false));
};

export const getUserStatus = (userId) => async (dispatch) => {
  const data = await profileAPI.getStatus(userId);
  dispatch(setUserStatus(data));
};

export const updateUserStatus = (status) => async (dispatch) => {
  const data = await profileAPI.updateStatus(status);
  if (data.resultCode === 0) dispatch(setUserStatus(status));
};

export default profilePageReducer;