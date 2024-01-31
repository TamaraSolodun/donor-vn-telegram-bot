import { Admin, Resource } from "react-admin";
import { customDataProvider } from "./services/providers/dataProvider";
import { DonorsBoard } from "./pages/DonorsBoard";
import { authProvider } from "./services/providers/authProvider";
import { Dashboard } from "./pages/Dashboard";

export const App = () => (
    <Admin authProvider={authProvider} dataProvider={customDataProvider} dashboard={Dashboard} >
    <Resource name="donors" list={DonorsBoard}/>
  </Admin>
);
