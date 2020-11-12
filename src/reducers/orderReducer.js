import { makeOrder, getDetails, updatePay, userOrder } from '../services/order';

const ORDER_CREATE_REQUEST = 'ORDER_CREATE_REQUEST';
const ORDER_CREATE_SUCESS = 'ORDER_CREATE_SUCESS';
const ORDER_CREATE_FAIL = 'ORDER_CREATE_FAIL';

const ORDER_DETAILS_REQUEST = 'ORDER_DETAILS_REQUEST';
const ORDER_DETAILS_SUCESS = 'ORDER_DETAILS_SUCESS';
const ORDER_DETAILS_FAIL = 'ORDER_DETAILS_FAIL';

const ORDER_PAY_REQUEST = 'ORDER_PAY_REQUEST';
const ORDER_PAY_SUCESS = 'ORDER_PAY_SUCESS';
const ORDER_PAY_FAIL = 'ORDER_PAY_FAIL';
const ORDER_PAY_RESET = 'ORDER_PAY_RESET';

const USER_ORDER_REQUEST = 'USER_ORDER_REQUEST';
const USER_ORDER_SUCESS = 'USER_ORDER_SUCESS';
const USER_ORDER_FAIL = 'USER_ORDER_FAIL';
const USER_ORDER_RESET = 'USER_ORDER_RESET';

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const orderDetails = await makeOrder(userInfo.token, order);
    dispatch({ type: ORDER_CREATE_SUCESS, payload: orderDetails });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const orderDetails = await getDetails(userInfo.token, id);
    dispatch({ type: ORDER_DETAILS_SUCESS, payload: orderDetails });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCESS:
      return { loading: false, sucess: true, order: action.payload };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const updatedPay = await updatePay(userInfo.token, id, paymentResult);
    dispatch({ type: ORDER_PAY_SUCESS, payload: updatedPay });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const userOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case USER_ORDER_REQUEST:
      return { loading: true };
    case USER_ORDER_SUCESS:
      return { loading: false, orders: action.payload };
    case USER_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case USER_ORDER_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const userOrderAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_ORDER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const data = await userOrder(userInfo.token);
    dispatch({ type: USER_ORDER_SUCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};
