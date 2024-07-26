import { useState } from 'react';
import { PageVerouillage } from "./Page_verouillage";
import { FirstPageGI } from "./Page_guide_interactif";
import { SecondPageGI } from "./Page_guide_interactif_2";
import { ThirdPageGI } from "./Page_guide_Interactif_3";
import { Signpage } from "./Sign_page";

export const Skipornot = () => {
  const [hasSkipped, setHasSkipped] = useState(false);
  const [button1, setButton1] = useState(false);
  const [button2, setButton2] = useState(false);
  const [button3, setButton3] = useState(false);

  if (button1 && button2 && button3) {
    setHasSkipped(true);
  }

  if (hasSkipped) {
    return <Signpage />;
  } else {
    return (
      <>
        <PageVerouillage />
        <FirstPageGI />
        <SecondPageGI />
        <ThirdPageGI />
        <Signpage />
      </>
    );
  }
};