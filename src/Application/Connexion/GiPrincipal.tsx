import {FirstPageGI} from "./Page_guide_interactif.tsx";
import {SecondPageGI} from "./Page_guide_interactif_2.tsx";
import {ThirdPageGI} from "./Page_guide_Interactif_3.tsx";
import React, {Dispatch, useState} from "react";

export const GiPrincipal: React.FC<{setSkipVerrouillage: Dispatch<React.SetStateAction<boolean>>}> = ({setSkipVerrouillage}) => {
    const [changeComponent, setChangeComponent] = useState(0)
    return (
        <div>
            { changeComponent === 0 ? <FirstPageGI onClick={setChangeComponent}/> : null }
            { changeComponent === 1 ? <SecondPageGI onClick={setChangeComponent}/> : null }
            { changeComponent === 2 ? <ThirdPageGI setSkipVerrouillage={setSkipVerrouillage} /> : null }
        </div>
    )
}
