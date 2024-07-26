import "./Infrastructure/Style/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./Infrastructure/Style/index.css";
import {RouterProvider} from "react-router-dom";
import {router} from "./Module/router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
