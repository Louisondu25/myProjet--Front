import {createBrowserRouter} from "react-router-dom";
import { PageVerouillage } from "../Application/Connexion/Page_verouillage";
import { FirstPageGI } from "../Application/Connexion/Page_guide_interactif";
import { SecondPageGI } from "../Application/Connexion/Page_guide_interactif_2";
import { ThirdPageGI } from "../Application/Connexion/Page_guide_Interactif_3";
import { Signpage } from "../Application/Connexion/Sign_page";

export const router = createBrowserRouter([
    {
        path: "/verouillage",
        element: <PageVerouillage/>
    },
    {
        path: "/firstpagegi",
        element: <FirstPageGI/>
    },
    {
        path: "/secondpagegi",
        element: <SecondPageGI/>
    },
    {
        path: "/thirdpagegi",
        element: <ThirdPageGI/>
    },
    {
        path: "/",
        element: <Signpage/>
    },
])