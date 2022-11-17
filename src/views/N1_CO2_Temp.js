import V1 from "../components/V1";
import V2 from "../components/V2"
import V3_CO2 from "../components/V3_CO2";
import V4_CO2 from "../components/V4_CO2";
import V5 from "../components/V5_CO2";
import V6 from "../components/V6_CO2";
import V7 from "../components/V7_V10_Carbon";
import colToggle from "../components/colToggle.js";

function N1_CO2_TEMP() {
  return (
    <>
      <div className={colToggle()}>
        <V1/>
        <V2/>
        
      </div>
      <div className={colToggle()}>
        <V3_CO2/>
        <V4_CO2/>
        
      </div>
      <div className={colToggle()}>
        <V6></V6>
        <V5></V5>
      </div>
      <div className={colToggle()}>
        <V7></V7>
        <V7></V7>
      </div>
    </>
  );
}

export default N1_CO2_TEMP;
