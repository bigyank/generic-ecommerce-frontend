import { getAllUsers } from '../services/user';

const ALL_USER_LIST_REQUEST = 'ALL_USER_LIST_REQUEST';
const ALL_USER_LIST_SUCESS = 'ALL_USER_LIST_SUCESS';
const ALL_USER_LIST_FAIL = 'ALL_USER_LIST_FAIL';

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USER_LIST_REQUEST:
      return { loading: true };
    case ALL_USER_LIST_SUCESS:
      return { loading: false, users: action.payload };
    case ALL_USER_LIST_FAIL:
      return { loading: false, error: action.payload };
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
