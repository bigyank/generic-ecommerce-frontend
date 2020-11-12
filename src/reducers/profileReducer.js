import { userProfile } from '../services/user';

const USER_DETAILS_REQUEST = 'USER_DETAILS_REQUEST';
const USER_DETAILS_SUCESS = 'USER_DETAILS_SUCESS';
const USER_DETAILS_FAIL = 'USER_DETAILS_FAIL';
const USER_DETAILS_RESET = 'USER_DETAILS_RESET';

export const userDeatilsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true, ...state };
    case USER_DETAILS_SUCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userDetailsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const userDetails = await userProfile(userInfo.token);
    dispatch({ type: USER_DETAILS_SUCESS, payload: userDetails });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
