import {useEffect, useState} from 'react';
import { PageVerouillage } from "./Page_verouillage";
import { FirstPageGI } from "./Page_guide_interactif";
import { SecondPageGI } from "./Page_guide_interactif_2";
import { ThirdPageGI } from "./Page_guide_Interactif_3";
import { Signpage } from "./Sign_page";
import {GiPrincipal} from "./GiPrincipal.tsx";

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
