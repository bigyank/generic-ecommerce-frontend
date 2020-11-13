import {
  getAllUsers,
  deleteUser,
  getSingleUser,
  updateUser,
} from '../services/user';
import { updateOrder } from '../services/order';
import { deleteProduct } from '../services/products';
import { getAllOrder } from '../services/order';

const ALL_USER_LIST_REQUEST = 'ALL_USER_LIST_REQUEST';
const ALL_USER_LIST_SUCESS = 'ALL_USER_LIST_SUCESS';
const ALL_USER_LIST_FAIL = 'ALL_USER_LIST_FAIL';
const ALL_USER_LIST_RESET = 'ALL_USER_LIST_RESET';

const SINGLE_USER_REQUEST = 'SINGLE_USER_REQUEST';
const SINGLE_USER_SUCESS = 'SINGLE_USER_SUCESS';
const SINGLE_USER_FAIL = 'SINGLE_USER_FAIL';
const SINGLE_USER_RESET = 'SINGLE_USER_RESET';

const USER_DELETE_REQUEST = 'USER_DELETE_REQUEST';
const USER_DELETE_SUCESS = 'USER_DELETE_SUCESS';
const USER_DELETE_FAIL = 'USER_DELETE_FAIL';

const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST';
const USER_UPDATE_SUCESS = 'USER_UPDATE_SUCESS';
const USER_UPDATE_FAIL = 'USER_UPDATE_FAIL';

const PRODUCT_DELETE_REQUEST = 'PRODUCT_DELETE_REQUEST';
const PRODUCT_DELETE_SUCESS = 'PRODUCT_DELETE_SUCESS';
const PRODUCT_DELETE_FAIL = 'PRODUCT_DELETE_FAIL';

const ALL_ORDER_LIST_REQUEST = 'ALL_ORDER_LIST_REQUEST';
const ALL_ORDER_LIST_SUCESS = 'ALL_ORDER_LIST_SUCESS';
const ALL_ORDER_LIST_FAIL = 'ALL_ORDER_LIST_FAIL';
const ALL_ORDER_LIST_RESET = 'ALL_ORDER_LIST_RESET';

const ORDER_UPDATE_REQUEST = 'ORDER_UPDATE_REQUEST';
const ORDER_UPDATE_SUCESS = 'ORDER_UPDATE_SUCESS';
const ORDER_UPDATE_FAIL = 'ORDER_UPDATE_FAIL';
const ORDER_UPDATE_RESET = 'ORDER_UPDATE_RESET';

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

export const singleUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case SINGLE_USER_REQUEST:
      return { ...state, loading: true };
    case SINGLE_USER_SUCESS:
      return { loading: false, user: action.payload };
    case SINGLE_USER_FAIL:
      return { loading: false, error: action.payload };
    case SINGLE_USER_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const singleUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SINGLE_USER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const singleUser = await getSingleUser(userInfo.token, id);

    dispatch({ type: SINGLE_USER_SUCESS, payload: singleUser });
  } catch (error) {
    dispatch({
      type: SINGLE_USER_FAIL,
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

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCESS:
      return { loading: false, sucess: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateAction = (user) => async (dispatch, getState) => {
  try {
    const { id, ...validUser } = user;
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const updatedUser = await updateUser(userInfo.token, id, validUser);

    dispatch({ type: SINGLE_USER_SUCESS, payload: updatedUser });
    dispatch({ type: USER_UPDATE_SUCESS });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCESS:
      return { loading: false, sucess: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    await deleteProduct(userInfo.token, id);

    dispatch({ type: PRODUCT_DELETE_SUCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDER_LIST_REQUEST:
      return { loading: true };
    case ALL_ORDER_LIST_SUCESS:
      return { loading: false, orders: action.payload };
    case ALL_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ALL_ORDER_LIST_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const orderListAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ALL_ORDER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const allOrders = await getAllOrder(userInfo.token);

    dispatch({ type: ALL_ORDER_LIST_SUCESS, payload: allOrders });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const orderUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_UPDATE_REQUEST:
      return { loading: true };
    case ORDER_UPDATE_SUCESS:
      return { loading: false, sucess: true };
    case ORDER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderUpdateAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const updatedOrder = await updateOrder(userInfo.token, id);

    dispatch({ type: ORDER_UPDATE_SUCESS, payload: updatedOrder });
  } catch (error) {
    dispatch({
      type: ORDER_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};
