import { createBrowserRouter } from "react-router";
import App from "../../App";
import Admin from "../dashboard/Admin";
import Login from "../auth/Login";
import PrivateRoute from "./PrivateRoute";
import UserDashboard from "../dashboard/UserDashboard";
import AboutUs from "../pages/AboutUs";
import TableHeader from "../pages/TableHeader";
import FamilyWiseTable from "../pages/FamilyWiseTable";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/admin", element: <PrivateRoute> <Admin /> </PrivateRoute> },
  { path: "/userdashboard", element: <PrivateRoute> <UserDashboard /> </PrivateRoute>},
  { path: "/about-us", element: <AboutUs />},
  { path: "voters-list", element: <TableHeader />},
  { path: "family-wise-list", element: <FamilyWiseTable/>}
]);

export default router;
