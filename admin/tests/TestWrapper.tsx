import { Provider } from "react-redux";
import { ReactNode } from "react";
import { configureStore } from "@reduxjs/toolkit";
//import logger from "redux-logger";
import donorsReducer from "../src/store/donor/DonorSlice";

export default function TestWrapper({ children }: { children: ReactNode }) {
  const store = configureStore({
    reducer: {
      donors: donorsReducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  });
  return <Provider store={store}>{children}</Provider>;
}
