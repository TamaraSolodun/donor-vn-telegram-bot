import { configureStore } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

//import logger from "redux-logger";
import donorsReducer from '../src/store/donor/DonorSlice';
export default function TestWrapper({ children }: { children: ReactNode }) {
  const store = configureStore({
    reducer: {
      donors: donorsReducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  });
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  );
}
