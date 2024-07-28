import {createBrowserRouter} from "react-router-dom";
import {Skipornot} from "../Application/Connexion/Skip_or_not.tsx";
import { Register } from "../Application/Connexion/Inscription/Inscription.tsx";
import { Password } from "../Application/Connexion/Inscription/MotDePasse.tsx";
import { Connect } from "../Application/Connexion/Connexion.tsx";
import { Sendrecoverylink } from "../Application/Connexion/SendRecoveryLink .tsx";

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
])
