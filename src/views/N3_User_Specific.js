import React from "react";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Constants from "../components/Constants.json";
import List from "../components/List";

const URL_List = Constants.API_ADDRESS + "/list";

function N3_USER_SPECIFIC(props) {
  const decodedToken = jwt_decode(props.jwt);
  console.log(decodedToken.user.id);
  const navigate = useNavigate();

  const [v1_value, setV1_value] = useState(false);
  const [v2_value, setV2_value] = useState(false);
  const [v3_value, setV3_value] = useState(false);
  const [v4_value, setV4_value] = useState(false);
  const [v5_value, setV5_value] = useState(false);
  const [v6_value, setV6_value] = useState(false);
  const [v7_value, setV7_value] = useState(false);
  const [v8_value, setV8_value] = useState(false);
  const [v9_value, setV9_value] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post(Constants.API_ADDRESS + "/create", {
        userid: decodedToken.user.id,
        V1: event.target.V1.value,
        description01: event.target.description01.value,
        V2: event.target.V2.value,
        description02: event.target.description02.value,
        V3: event.target.V3.value,
        description03: event.target.description03.value,
        V4: event.target.V4.value,
        description04: event.target.description04.value,
        V5: event.target.V5.value,
        description05: event.target.description05.value,
        V6: event.target.V6.value,
        description06: event.target.description06.value,
        V7: event.target.V7.value,
        description07: event.target.description07.value,
        V8: event.target.V8.value,
        description08: event.target.description08.value,
        V9: event.target.V9.value,
        description09: event.target.description09.value,
      });
      console.log(result);

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  const handledelete = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post(Constants.API_ADDRESS + "/delete", {
        userid: decodedToken.user.id,
      });
      console.log(result);
      window.location.reload(false);
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };
 

  return (
    <>
      <div>
        <h2>Hi, {decodedToken.user.Username},</h2>
        <List/>

        <h3>you can make your own visualization and share it with others!</h3>
        <form onSubmit={handledelete}>
          <button>Delete my counte</button>
        </form>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="checkbox"
          name="V1"
          value={v1_value}
          onChange={(e) => setV1_value(true)}
        />
        Global historical surface temperature anomalies from January 1850
        onwards
        <br />
        <input type="text" name="description01"></input>
        <br />
        <input
          type="checkbox"
          name="V2"
          value={v2_value}
          onChange={(e) => setV2_value(true)}
        />
        Northern Hemisphere 2,000-year temperature reconstruction
        <br />
        <input type="text" name="description02"></input>
        <br />
        <input
          type="checkbox"
          name="V3"
          value={v3_value}
          onChange={(e) => setV3_value(true)}
        />
        Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958
        <br />
        <input type="text" name="description03"></input>
        <br />
        <input
          type="checkbox"
          name="V4"
          value={v4_value}
          onChange={(e) => setV4_value(true)}
        />
        Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna
        Loa measurements
        <br />
        Human Evolution and Activities
        <br />
        <input type="text" name="description04"></input>
        <br />
        <input
          type="checkbox"
          name="V5"
          value={v5_value}
          onChange={(e) => setV5_value(true)}
        />
        Vostok Ice Core CO2 measurements,417160 - 2342 years
        <br />
        <input type="text" name="description05"></input>
        <br />
        <input
          type="checkbox"
          name="V6"
          value={v6_value}
          onChange={(e) => setV6_value(true)}
        />
        Ice core 800k year composite study CO2 measurements
        <br />
        <input type="text" name="description06"></input>
        <br />
        <input
          type="checkbox"
          name="V7"
          value={v7_value}
          onChange={(e) => setV7_value(true)}
        />
        Evolution of global temperature over the past two million years
        <br />
        Human Evolution and Activities
        <br />
        <input type="text" name="description07"></input>
        <br />
        <input
          type="checkbox"
          name="V8"
          value={v8_value}
          onChange={(e) => setV8_value(true)}
        />
        CO2 emissions by country
        <br />
        <input type="text" name="description08"></input>
        <br />
        <input
          type="checkbox"
          name="V9"
          value={v9_value}
          onChange={(e) => setV9_value(true)}
        />
        CO2 emissions by sectors
        <br />
        <input type="text" name="description09"></input>
        <br />
        <button type="submit" name="">
          Create
        </button>
      </form>
    </>
  );
}

export default N3_USER_SPECIFIC;
