import { makeOrder, getDetails } from '../services/order';

const ORDER_CREATE_REQUEST = 'ORDER_CREATE_REQUEST';
const ORDER_CREATE_SUCESS = 'ORDER_CREATE_SUCESS';
const ORDER_CREATE_FAIL = 'ORDER_CREATE_FAIL';

const ORDER_DETAILS_REQUEST = 'ORDER_DETAILS_REQUEST';
const ORDER_DETAILS_SUCESS = 'ORDER_DETAILS_SUCESS';
const ORDER_DETAILS_FAIL = 'ORDER_DETAILS_FAIL';

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
