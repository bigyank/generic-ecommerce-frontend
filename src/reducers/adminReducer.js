import { getAllUsers, deleteUser } from '../services/user';

const ALL_USER_LIST_REQUEST = 'ALL_USER_LIST_REQUEST';
const ALL_USER_LIST_SUCESS = 'ALL_USER_LIST_SUCESS';
const ALL_USER_LIST_FAIL = 'ALL_USER_LIST_FAIL';
const ALL_USER_LIST_RESET = 'ALL_USER_LIST_RESET';

const USER_DELETE_REQUEST = 'USER_DELETE_REQUEST';
const USER_DELETE_SUCESS = 'USER_DELETE_SUCESS';
const USER_DELETE_FAIL = 'USER_DELETE_FAIL';

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USER_LIST_REQUEST:
      return { loading: true };
    case ALL_USER_LIST_SUCESS:
      return { loading: false, users: action.payload };
    case ALL_USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ALL_USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const userListAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ALL_USER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const allUsers = await getAllUsers(userInfo.token);

    dispatch({ type: ALL_USER_LIST_SUCESS, payload: allUsers });
  } catch (error) {
    dispatch({
      type: ALL_USER_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCESS:
      return { loading: false, sucess: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    await deleteUser(userInfo.token, id);

    dispatch({ type: USER_DELETE_SUCESS });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};
