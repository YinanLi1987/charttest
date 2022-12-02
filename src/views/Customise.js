import { useEffect, useState, useRef} from "react";
import axios from "axios";
import V1 from "../components/V1";
import V2 from "../components/V2";
import V3_CO2 from "../components/V3_CO2";
import V4_CO2 from "../components/V4_CO2";
import V5_CO2 from "../components/V5_CO2";
import V6_CO2 from "../components/V6_CO2";
import V7 from "../components/V7_V10_Carbon";
import V8 from "../components/V8";
import V9_CO2_SECTOR from "../components/V9_CO2_Sector";
import Constants from "../components/Constants";
const URL = Constants.API_ADDRESS + "/list";

function Customise() {
  
  const viewId = "";
  const receivedViewId = localStorage.getItem(viewId);
  console.log(viewId)
  const [userviews, setUserviews] = useState([]);
  const columns = useRef(null);
  const [view1, setView1] = useState("");
  const [view2, setView2] = useState("");
  const [view3, setView3] = useState("");
  const [view4, setView4] = useState("");
  const [view5, setView5] = useState("");
  const [view6, setView6] = useState("");
  const [view7, setView7] = useState("");
  const [view8, setView8] = useState("");
  const [view9, setView9] = useState("");

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setUserviews(response.data);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }, []);

  const handleClick = () => {
    for (let i = 0; i < userviews.length; i++) {
      if (userviews[i].customiseid == receivedViewId) {
        setView1(userviews[i].view1);
        setView2(userviews[i].view2);
        setView3(userviews[i].view3);
        setView4(userviews[i].view4);
        setView5(userviews[i].view5);
        setView6(userviews[i].view6);
        setView7(userviews[i].view7);
        setView8(userviews[i].view8);
        setView9(userviews[i].view9);
      }
    }
    if (columns.current.style.display == "block") {
      columns.current.style.display = "flex";
    } else {
      columns.current.style.display = "block";
    }
  };

  return (
    <>
      <button onClick={handleClick}>Show and Change columns</button>

      <div
        className="columns"
        ref={columns}
        style={{ display: "block", width: "100%", justifyContent: "center" }}
      >
        <div>{view1 == "true" ? <V1 /> : null}</div>
        <div>{view2 == "true" ? <V2 /> : null}</div>
        <div>{view3 == "true" ? <V3_CO2 /> : null}</div>
        <div>{view4 == "true" ? <V4_CO2 /> : null}</div>
        <div>{view5 == "true" ? <V5_CO2 /> : null}</div>
        <div>{view6 == "true" ? <V6_CO2 /> : null}</div>
        <div>{view7 == "true" ? <V7 /> : null}</div>
        <div>{view8 == "true" ? <V8 /> : null}</div>
        <div>{view9 == "true" ? <V9_CO2_SECTOR /> : null}</div>
      </div>
    </>
  );
}

export default Customise;
