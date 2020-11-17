import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { itemReducer } from './reducers/itemReducer';
import { cartReducer } from './reducers/cartReducer';
import { userLoginReducer } from './reducers/loginReducer';
import { userRegisterReducer } from './reducers/registerReducer';
import { userDeatilsReducer } from './reducers/profileReducer';
import { updateProfileReducer } from './reducers/updateProfileReducer';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  userOrderReducer,
} from './reducers/orderReducer';
import {
  productListReducer,
  productCreateReducer,
  productUpdateReducer,
  productCreateReviewReducer,
} from './reducers/productReducers';
import {
  userListReducer,
  userDeleteReducer,
  singleUserReducer,
  userUpdateReducer,
  productDeleteReducer,
  orderListReducer,
  orderUpdateReducer,
} from './reducers/adminReducer';

const reducers = combineReducers({
  productList: productListReducer,
  productDetail: itemReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDeatilsReducer,
  userUpdateProfile: updateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  userOrder: userOrderReducer,
  userList: userListReducer,
  singleUser: singleUserReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  productDelete: productDeleteReducer,
  orderList: orderListReducer,
  orderUpdate: orderUpdateReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productCreateReview: productCreateReviewReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromSrorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromSrorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
