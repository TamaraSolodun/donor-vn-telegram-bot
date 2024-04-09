import { Admin, DataProvider, Resource } from "react-admin";
import { customDataProvider } from "./services/providers/dataProvider";
import { DonorsBoard } from "./pages/DonorsBoard";
import { authProvider } from "./services/providers/authProvider";
import { Dashboard } from "./pages/Dashboard";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store/store";
import SingleDonor from "./pages/SingleDonor";
export const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Admin
        dashboard={Dashboard}
        authProvider={authProvider}
        dataProvider={customDataProvider as DataProvider}
      >
        <Resource name="donors" list={DonorsBoard} edit={SingleDonor}/>
      </Admin>
    </Provider>
  </BrowserRouter>
);
