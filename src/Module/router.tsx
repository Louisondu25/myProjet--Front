import {createBrowserRouter} from "react-router-dom";
import { PageVerouillage } from "../Application/Connexion/Page_verouillage";
import { FirstPageGI } from "../Application/Connexion/Page_guide_interactif";
import { SecondPageGI } from "../Application/Connexion/Page_guide_interactif_2";
import { ThirdPageGI } from "../Application/Connexion/Page_guide_Interactif_3";
import { Signpage } from "../Application/Connexion/Sign_page";
import {Skipornot} from "../Application/Connexion/Skip_or_not.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Skipornot/>
    },
])
