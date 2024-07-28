import {useEffect, useState} from 'react';
import { PageVerouillage } from "./Page_verouillage";
import { Signpage } from "./Sign_page";
import {GiPrincipal} from "./Guide Interactif/GiPrincipal.tsx";

export const Skipornot = () => {
  const [hasSkipped, setHasSkipped] = useState(false);
  const [skipVerrouillage, setSkipVerrouillage] = useState(false);
    
    useEffect(() => {
        console.log("hasSkipped changed:", hasSkipped);
    }, [hasSkipped]);

    return (
        <>
            {
            skipVerrouillage
                ? <Signpage/>
                    : <div>
                        {hasSkipped ? <GiPrincipal setSkipVerrouillage={setSkipVerrouillage} /> : <button onClick={() => {
                            console.log("skip in")
                            setHasSkipped(true)
                            console.log("skip out")
                        }}>
                        <PageVerouillage/>
                        </button>}
                    </div>
            }
        </>
    )
};
