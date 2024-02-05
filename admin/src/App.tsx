import { Admin, DataProvider, Resource } from "react-admin";
import { customDataProvider } from "./services/providers/dataProvider";
import { DonorsBoard } from "./pages/DonorsBoard";
import { authProvider } from "./services/providers/authProvider";
import { Dashboard } from "./pages/Dashboard";

export const App = () => (
  <Admin
    authProvider={authProvider}
    dataProvider={customDataProvider as DataProvider}
    dashboard={Dashboard}
  >
    <Resource name="donors" list={DonorsBoard} />
  </Admin>
);
