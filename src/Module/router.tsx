import {createBrowserRouter} from "react-router-dom";
import {Skipornot} from "../Application/Connexion/Skip_or_not.tsx";
import { Register } from "../Application/Connexion/Button Inscription/Inscription.tsx";
import { Password } from "../Application/Connexion/Button Inscription/MotDePasse.tsx";
import { Connect } from "../Application/Connexion/Button Connexion/Connexion.tsx";
import { Sendrecoverylink } from "../Application/Connexion/Button Connexion/SendRecoveryLink .tsx";
import { Giversdashboard } from "../Application/Connexion/Guide Interactif/GIVersDashboard.tsx";
import { Dashboard } from "../Application/Dashboard/DashBoard.tsx";
import { Testdnd } from "../Application/Dashboard/Testdnd.tsx"
import { Menu } from "../Application/Dashboard/Menu.tsx"
import { CalendarDashboard } from "../Application/Dashboard/Calendar.tsx";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Skipornot/>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/password",
        element: <Password/>
    },
     {
        path: "/connect",
        element: <Connect/>
    },
    {
        path: "/recoverylink",
        element: <Sendrecoverylink/>
    },
    {
        path: "/giversdashboard",
        element: <Giversdashboard/>
    },
    {
        path: "/dashboard",
        element: <Dashboard/>
    },
    {
        path: "/menu",
        element: <Menu/>
    },
    {
        path: "/testdnd",
        element: <Testdnd/>
    },
    {
        path: "/calendar",
        element: <CalendarDashboard/>
    },
])