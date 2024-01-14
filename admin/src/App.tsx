import { Admin, Resource } from "react-admin";
import { customDataProvider } from "./dataProvider";
import { UserList } from "./users";
import { authProvider } from "./authProvider";
import { Dashboard } from "./Dashboard";

export const App = () => (
    <Admin authProvider={authProvider} dataProvider={customDataProvider} dashboard={Dashboard} >
    <Resource name="donors" list={UserList}/>
  </Admin>
);
