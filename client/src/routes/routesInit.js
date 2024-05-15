import { routesPaths } from "../constants/routesData";
import {
  Home,
  Login,
  Register,
  Teleporter,
  Feed,
  About,
  Shop,
  Profile,
  Chat,
  Feasts,
  Admin
} from "../pages";

const Routes = {};

export const routesData = {
  paths: Object.values(routesPaths),
  elements: [
    Home,
    Login,
    Register,
    Teleporter,
    Feed,
    About,
    Shop,
    Profile,
    Chat,
    Feasts,
    Admin
  ],
};

routesData.paths.forEach((path, i) => {
  Routes[routesData.elements[i].name] = path;
});

export default Routes;
