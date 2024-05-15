import { useRoutes } from "react-router-dom";
import { routesData } from "./routesInit";

const WebRoutes = () => {
  return useRoutes(
    routesData.elements.map((Comp, i) => ({
      path: routesData.paths[i],
      element: <Comp />,
    }))
  );
};

export default WebRoutes;
