import productReducer from "features/admin/products/productSlice";
import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import addressReducer from "../features/admin/address/addressSlice";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/admin/user/userSlice";
import socketReducer from "../features/socket/socketSlice";
import cartReducer from "../features/client/cart/cartSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import { createRouterReducer } from "@lagunovsky/redux-react-router";
import { browserHistory } from "utils/history";
import { createRouterMiddleware } from "@lagunovsky/redux-react-router";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  router: createRouterReducer(browserHistory),
  counter: counterReducer,
  auth: authReducer,
  product: productReducer,
  address: addressReducer,
  user: userReducer,
  cart: cartReducer,
  socket: socketReducer,
});

const routerMiddleware = createRouterMiddleware(browserHistory);
export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
