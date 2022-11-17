import V8 from "../components/V8";
import V9_CO2_SECTOR from "../components/V9_CO2_Sector";

import colToggle from "../components/colToggle";

function N2_EMISSION() {
  return (
    <>
      <div className={colToggle()}>
        <V8 />
        <V9_CO2_SECTOR />
      </div>
    </>
  );
}

/* <V8/>
       <V9/>*/

export default N2_EMISSION;
