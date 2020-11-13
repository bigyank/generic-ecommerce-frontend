import { userLogin } from '../services/user';

const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
const USER_LOGIN_SUCESS = 'USER_LOGIN_SUCESS';
const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';
const USER_LOGOUT = 'USER_LOGOUT';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const userInfo = await userLogin(email, password);
    dispatch({ type: USER_LOGIN_SUCESS, payload: userInfo });
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const userLogoutAction = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: 'USER_ORDER_RESET' });
  dispatch({ type: 'USER_DETAILS_RESET' });
  dispatch({ type: 'ALL_USER_LIST_RESET' });
  dispatch({ type: 'SINGLE_USER_RESET' });
  dispatch({ type: USER_LOGOUT });
};
