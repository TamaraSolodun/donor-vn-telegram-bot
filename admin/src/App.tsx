
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store/store";
import Dashboard from "./pages/Dashboard";
import DonorsBoard from "./pages/DonorsBoard";
import SingleDonor from "./pages/SingleDonor";
export const App = () => (
  <BrowserRouter>
    <Provider store={store}>
    <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/donors-board" element={<DonorsBoard />}/>
        <Route path="/donors-board/:userId" element={<SingleDonor />}/>
    </Routes>
    </Provider>
  </BrowserRouter>
);
