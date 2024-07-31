import "./Infrastructure/Style/index.css";
import ReactDOM from "react-dom/client";
import "./Infrastructure/Style/index.css";
import {RouterProvider} from "react-router-dom";
import {router} from "./Module/router.tsx";
import React from 'react';
import {DndContext} from '@dnd-kit/core';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <DndContext>
<React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
    </DndContext>
);
