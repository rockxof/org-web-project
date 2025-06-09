import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./components/router/Router";
import {
  AuthContextProvider,
  DataContextProvider,
} from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <DataContextProvider>
        <RouterProvider router={router} />
      </DataContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
