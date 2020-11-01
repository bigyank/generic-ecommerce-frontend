import { userSignup } from '../services/user';

const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
const USER_REGISTER_SUCESS = 'USER_REGISTER_SUCESS';
const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL';

const USER_LOGIN_SUCESS = 'USER_LOGIN_SUCESS';

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCESS:
      return { loading: false };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userRegisterAction = (name, email, password) => async (
  dispatch
) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const userInfo = await userSignup(name, email, password);
    dispatch({ type: USER_REGISTER_SUCESS });
    dispatch({ type: USER_LOGIN_SUCESS, payload: userInfo });
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};
