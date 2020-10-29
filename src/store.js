import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productListReducer } from './reducers/productReducers';
import { itemReducer } from './reducers/itemReducer';
import { cartReducer } from './reducers/cartReducer';

const reducers = combineReducers({
  productList: productListReducer,
  productDetail: itemReducer,
  cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const initialState = { cart: { cartItems: cartItemsFromStorage } };
const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
