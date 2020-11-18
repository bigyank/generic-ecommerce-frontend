import {
  getProducts,
  createProduct,
  updateProduct,
  createReview,
  getTopRatedProducts,
} from '../services/products';

const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST';
const PRODUCT_LIST_SUCESS = 'PRODUCT_LIST_SUCESS';
const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL';

const PRODUCT_CREATE_REQUEST = 'PRODUCT_CREATE_REQUEST';
const PRODUCT_CREATE_SUCESS = 'PRODUCT_CREATE_SUCESS';
const PRODUCT_CREATE_FAIL = 'PRODUCT_CREATE_FAIL';
const PRODUCT_CREATE_RESET = 'PRODUCT_CREATE_RESET';

const PRODUCT_UPDATE_REQUEST = 'PRODUCT_UPDATE_REQUEST';
const PRODUCT_UPDATE_SUCESS = 'PRODUCT_UPDATE_SUCESS';
const PRODUCT_UPDATE_FAIL = 'PRODUCT_UPDATE_FAIL';
const PRODUCT_UPDATE_RESET = 'PRODUCT_UPDATE_RESET';

const PRODUCT_CREATE_REVIEW_REQUEST = 'PRODUCT_CREATE_REVIEW_REQUEST';
const PRODUCT_CREATE_REVIEW_SUCESS = 'PRODUCT_CREATE_REVIEW_SUCESS';
const PRODUCT_CREATE_REVIEW_FAIL = 'PRODUCT_CREATE_REVIEW_FAIL';
const PRODUCT_CREATE_REVIEW_RESET = 'PRODUCT_CREATE_REVIEW_RESET';

const PRODUCT_TOP_REQUEST = 'PRODUCT_TOP_REQUEST';
const PRODUCT_TOP_REQUEST_SUCESS = 'PRODUCT_TOP_REQUEST_SUCESS';
const PRODUCT_TOP_REQUEST_FAIL = 'PRODUCT_TOP_REQUEST_FAIL';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productListAction = (keyword, pageNumber) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const allProducts = await getProducts(keyword, pageNumber);
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

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCESS:
      return { loading: false, sucess: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const productUpdateAction = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const updatedProduct = await updateProduct(userInfo.token, product);

    dispatch({ type: PRODUCT_UPDATE_SUCESS, payload: updatedProduct });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const productCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCESS:
      return { loading: false, sucess: true };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const productCreateReviewAction = (productID, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    await createReview(userInfo.token, productID, review);

    dispatch({ type: PRODUCT_CREATE_REVIEW_SUCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_TOP_REQUEST_SUCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_TOP_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const topRatedProductAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });

    const topRatedProducts = await getTopRatedProducts();

    dispatch({ type: PRODUCT_TOP_REQUEST_SUCESS, payload: topRatedProducts });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};
