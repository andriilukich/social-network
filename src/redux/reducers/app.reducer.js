import { setUserData } from "./auth.reducer";

const INITIALIZED_SUCCESSFULLY = 'social-network/app/INITIALIZED_SUCCESSFULLY';

const initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESSFULLY:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

export const initializedSuccessfully = () =>
  ({ type: INITIALIZED_SUCCESSFULLY });

export const initializeApp = () => async (dispatch) => {
  await dispatch(setUserData());
  dispatch(initializedSuccessfully());
};

export default appReducer;