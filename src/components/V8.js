import React from "react";
import { useState, useRef,useEffect } from "react";
import axios from "axios";

import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const URL = "http://localhost:3001/v8";
const URL_DES = "http://localhost:3001/description";
function V8() {
  const [country_name, setCountry_name] = useState([]);
  const [country_datas, setCountry_datas] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [data_link, setData_link] = useState([]);
  const [description_link, setDescription_link] = useState([]);

  const ref_country = useRef(null);
  const country_data = [];

  useEffect(() => {
    axios
      .get(URL_DES)
      .then((response) => {
       setTitle(response.data[7].v_title);
       setDescription(response.data[7].v_description);
       setData_link(response.data[7].data_link);
       setDescription_link(response.data[7].description_link);
      
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }, []);

  async function show(e) {
    e.preventDefault();
    try {
      const address = URL;
      const response = await fetch(address);

      if (response.ok) {
        const json = await response.json();

        for (let i = 0; i < json.length; i++) {
          if (json[i].country_names === country_name) {
            country_data.push(json[i]);
          }
        }

        setCountry_datas(country_data);
        console.log(country_data);

        console.log(json);
      } else {
        alert("Error.");
        console.log(response);
      }
    } catch (err) {
      alert(err);
    }
  }

  var data = {
    labels: country_datas.map((x) => x.year),

    datasets: [
      {
        label: country_name,

        data: country_datas.map((x) => x.emission),
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 2,
      },
    ],
  };

  var options = {
    scales: {},
    elements: {
      point: {
        radius: 0,
      },
    },

    legend: {
      labels: {
        fontSize: 26,
      },
    },
    spanGaps: true,
  };

  return (
    <div className="chart-info-container">
      <h3>{title}</h3>
      <div className="chart-container">
        <Line data={data} options={options} height={400} width={850} />
        <form onSubmit={show}>
          <input
            placeholder="Input a country name"
            ref={ref_country}
            type="text"
            value={country_name}
            onChange={(e) => setCountry_name(e.target.value)}
          />
          <button>Show co2 emissions of this country</button>
        </form>
      </div>

      <div className="chart-description">
      
      
      <p>Introduction: {description}</p>
      <a href={data_link }>Data source</a><br/>
      <a href={description_link}>Data description</a>
    </div>
    </div>
  );
}

export default V8;
