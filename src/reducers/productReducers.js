import { getProducts, createProduct } from '../services/products';

const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST';
const PRODUCT_LIST_SUCESS = 'PRODUCT_LIST_SUCESS';
const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL';

const PRODUCT_CREATE_REQUEST = 'PRODUCT_CREATE_REQUEST';
const PRODUCT_CREATE_SUCESS = 'PRODUCT_CREATE_SUCESS';
const PRODUCT_CREATE_FAIL = 'PRODUCT_CREATE_FAIL';
const PRODUCT_CREATE_RESET = 'PRODUCT_CREATE_RESET';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productListAction = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const allProducts = await getProducts();
    dispatch({ type: PRODUCT_LIST_SUCESS, payload: allProducts });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.response.data.message });
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCESS:
      return { loading: false, sucess: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productCreateAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const createdProduct = await createProduct(userInfo.token);

    dispatch({ type: PRODUCT_CREATE_SUCESS, payload: createdProduct });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: error.response.data.message,
    });
  }
};
