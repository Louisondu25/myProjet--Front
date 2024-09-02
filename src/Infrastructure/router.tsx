import {createBrowserRouter} from "react-router-dom";
import {Skipornot} from "../Application/Connexion/Skip_or_not.tsx";
import { Register } from "../Application/Connexion/Button Inscription/Inscription.tsx";
import { Connect } from "../Application/Connexion/Button Connexion/Connexion.tsx";
import { Sendrecoverylink } from "../Application/Connexion/Button Connexion/SendRecoveryLink .tsx";
import { Giversdashboard } from "../Application/Connexion/Guide Interactif/GIVersDashboard.tsx";
import { Dashboard } from "../Application/Dashboard/DashBoard.tsx";
import { Testdnd } from "../Application/Dashboard/Testdnd.tsx"
import { Menu } from "../Application/Dashboard/Menu/Menu.tsx"
import { CalendarDashboard } from "../Application/Dashboard/Calendar/Calendar.tsx";
import { Members } from "../Application/Dashboard/Members.tsx";
import { Plus } from "../Application/Dashboard/Menu/Plus/Plus.tsx";
import { SearchArchivedCard } from "../Application/Dashboard/Menu/SearchArchivedCard.tsx/SearchArchivedCard.tsx";
import { ChangeBackground } from "../Application/Dashboard/Menu/ChangerFondEcran/ChangeBackground.tsx";
import { ChangeColorBackground } from "../Application/Dashboard/Menu/ChangerFondEcran/ChangeColorBackground.tsx";
import { ChangePictureBackground } from "../Application/Dashboard/Menu/ChangerFondEcran/ChangePictureBackground.tsx";
import { CreatedBoard } from "../Application/Dashboard/CreatedBoard.tsx";
import { ArchivedCard } from "../Application/Dashboard/Menu/Plus/Archives/ArchivedCard.tsx";
import { ArchivedList } from "../Application/Dashboard/Menu/Plus/Archives/ArchivedList.tsx";
import { ArchivedBoard } from "../Application/Dashboard/Menu/Plus/Archive Tableau/ArchivedBoard.tsx";
import { Settingcalendar } from "../Application/Dashboard/Menu/Plus/SettingCalendar.tsx";
import { Theme } from "../Application/Dashboard/Menu/Plus/Theme.tsx";
import { Astuce } from "../Application/Dashboard/Menu/Plus/Astuce.tsx";
import { Card } from "../Application/Dashboard/Card.tsx";



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
    {
        path: "/membres",
        element: <Members/>
    },
    {
        path: "/plus",
        element: <Plus/>
        //pourquoi pas faire outlet pour plus
    },
    {
        path: "/cartearchivés",
        element: <SearchArchivedCard/>
    },
    {
        path: "/changebackground",
        element: <ChangeBackground/>
        //pourquoi pas faire outlet pour changer de fond d'ecran
    },
    {
        path: "/changecolorbackground",
        element: <ChangeColorBackground/>
    },
    {
        path: "/changepicturebackground",
        element: <ChangePictureBackground/>
    },
    {
        path: "/createboard",
        element: <CreatedBoard/>
    },
    {
        path: "/arhivecarte",
        element: <ArchivedCard/>
    },
    {
        path: "/arhiveliste",
        element: <ArchivedList/>
    },
    {
        path: "/arhivetableau",
        element: <ArchivedBoard/>
    },
    {
        path: "/settingcalendar",
        element: <Settingcalendar/>
    },
    {
        path: "/theme",
        element: <Theme/>
    },
     {
        path: "/astuce",
        element: <Astuce/>
    },
    {
        path: "/carte",
        element: <Card/>
    },
])