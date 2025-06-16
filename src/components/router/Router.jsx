import { createBrowserRouter } from "react-router";
import App from "../../App";
import Admin from "../dashboard/Admin";
import Login from "../auth/Login";
import PrivateRoute from "./PrivateRoute";
import UserDashboard from "../dashboard/UserDashboard";
import AboutUs from "../pages/AboutUs";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/admin", element: <PrivateRoute> <Admin /> </PrivateRoute> },
  { path: "/userdashboard", element: <UserDashboard />},
  { path: "/about-us", element: <AboutUs />}
]);

export default router;
