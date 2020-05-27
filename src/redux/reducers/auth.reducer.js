import { authAPI } from "../../api/api";
import { reset, stopSubmit } from "redux-form";

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA';
const GET_CAPTCHA = 'social-network/auth/GET_CAPTCHA';

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaURL: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const setUserDataSuccess = (userId, email, login, isAuth) =>
  ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } });

export const getCaptchaURLSuccess = (captchaURL) =>
  ({ type: GET_CAPTCHA, payload: { captchaURL } });

export const setUserData = () => async (dispatch) => {
  const data = await authAPI.me();
  if (data.resultCode === 0) {
    const { id, email, login } = data.data;
    dispatch(setUserDataSuccess(id, email, login, true));
  }
};

export const login = (email, password, rememberMe,captcha) => async (dispatch) => {
  const data = await authAPI.login(email, password, rememberMe, captcha);
  if (data.resultCode === 0) {
    dispatch(setUserData());
    dispatch(reset('login'));
  } else {
    if (data.resultCode === 10) {
      dispatch(getCaptchaURL());
    }
    const messages = data.messages.length > 0 ? data.messages : 'Some error occurred';
    dispatch(stopSubmit('login', { _error: messages }));
  }
};

export const getCaptchaURL = () => async (dispatch) => {
  try {
    const data = await authAPI.captcha();
    dispatch(getCaptchaURLSuccess(data.url));
  } catch {
    console.error(`This request is not success. Captcha has not received`);
  }
};

export const logout = () => async (dispatch) => {
  const data = await authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(setUserDataSuccess(null, null, null, null));
  }
};

export default authReducer;