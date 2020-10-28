import { getProducts } from '../services/products';

const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST';
const PRODUCT_LIST_SUCESS = 'PRODUCT_LIST_SUCESS';
const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL';

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
