import "./Infrastructure/Style/index.css";
import ReactDOM from "react-dom/client";
import "./Infrastructure/Style/index.css";
import {RouterProvider} from "react-router-dom";
import {router} from "./Infrastructure/router.tsx";
import React from 'react';
import { MantineProvider } from "@mantine/core";



ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
          <MantineProvider>
                <RouterProvider router={router} />
          </MantineProvider>
      </React.StrictMode>
);
