import storeReducer from "../redux/slice/storeSlice";
import { baseApi } from "./api/baseApi";
export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  store: storeReducer,
};
