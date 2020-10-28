import { getItem } from '../services/products';

const ITEM_REQUEST = 'ITEM_REQUEST';
const ITEM_SUCESS = 'ITEM_SUCESS';
const ITEM_FAIL = 'ITEM_FAIL';

export const itemReducer = (state = { product: { reviews: [] } }, action) => {
  switch (action.type) {
    case ITEM_REQUEST:
      return { loading: true, ...state };
    case ITEM_SUCESS:
      return { loading: false, product: action.payload };
    case ITEM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const itemAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: ITEM_REQUEST });
    const items = await getItem(id);
    dispatch({ type: ITEM_SUCESS, payload: items });
  } catch (error) {
    dispatch({ type: ITEM_FAIL, payload: error.response.data.message });
  }
};
