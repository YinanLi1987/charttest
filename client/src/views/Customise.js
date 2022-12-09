import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
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
import Constants from "../Constants.json";
const URL = process.env.REACT_APP_API_ADDRESS  + "/list";

function Customise() {
  const { id } = useParams();

  const [userviews, setUserviews] = useState([]);

  const [view1, setView1] = useState("");
  const [view2, setView2] = useState("");
  const [view3, setView3] = useState("");
  const [view4, setView4] = useState("");
  const [view5, setView5] = useState("");
  const [view6, setView6] = useState("");
  const [view7, setView7] = useState("");
  const [view8, setView8] = useState("");
  const [view9, setView9] = useState("");
  const [description01, setDescription01] = useState("");
  const [description02, setDescription02] = useState("");
  const [description03, setDescription03] = useState("");
  const [description04, setDescription04] = useState("");
  const [description05, setDescription05] = useState("");
  const [description06, setDescription06] = useState("");
  const [description07, setDescription07] = useState("");
  const [description08, setDescription08] = useState("");
  const [description09, setDescription09] = useState("");

  const [columns, setColumns] = useState("");

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
      if (userviews[i].customiseid == id) {
        setView1(userviews[i].view1);
        setView2(userviews[i].view2);
        setView3(userviews[i].view3);
        setView4(userviews[i].view4);
        setView5(userviews[i].view5);
        setView6(userviews[i].view6);
        setView7(userviews[i].view7);
        setView8(userviews[i].view8);
        setView9(userviews[i].view9);
        setDescription01(userviews[i].description01);
        setDescription02(userviews[i].description02);
        setDescription03(userviews[i].description03);
        setDescription04(userviews[i].description04);
        setDescription05(userviews[i].description05);
        setDescription06(userviews[i].description06);
        setDescription07(userviews[i].description07);
        setDescription08(userviews[i].description08);
        setDescription09(userviews[i].description09);

        setColumns(userviews[i].columns);
      }
    }
  };
  console.log(columns);
  return (
    <>
      <button onClick={handleClick}>
        Click to Show(this is a bug, you have to click to go to next)
      </button>

      <div>
        <div>{view1 == "true" ? <V1 /> : null}</div>
        <div>{view1 == "true" ? <p>{description01}</p> : null}</div>
        <div>{view2 == "true" ? <V2 /> : null}</div>
        <div>{view2 == "true" ? <p>{description02}</p> : null}</div>
        <div>{view3 == "true" ? <V3_CO2 /> : null}</div>
        <div>{view3 == "true" ? <p>{description03}</p> : null}</div>
        <div>{view4 == "true" ? <V4_CO2 /> : null}</div>
        <div>{view4 == "true" ? <p>{description04}</p> : null}</div>
        <div>{view5 == "true" ? <V5_CO2 /> : null}</div>
        <div>{view5 == "true" ? <p>{description05}</p> : null}</div>
        <div>{view6 == "true" ? <V6_CO2 /> : null}</div>
        <div>{view6 == "true" ? <p>{description06}</p> : null}</div>
        <div>{view7 == "true" ? <V7 /> : null}</div>
        <div>{view7 == "true" ? <p>{description07}</p> : null}</div>
        <div>{view8 == "true" ? <V8 /> : null}</div>
        <div>{view8 == "true" ? <p>{description08}</p> : null}</div>
        <div>{view9 == "true" ? <V9_CO2_SECTOR /> : null}</div>
        <div>{view9 == "true" ? <p>{description09}</p> : null}</div>
      </div>
    </>
  );
}

export default Customise;
