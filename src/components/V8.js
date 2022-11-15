import React from "react";
import { useState, useRef } from "react";

import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const URL = "http://localhost:3001/v8";
function V8() {

  const [country_name, setCountry_name] = useState([]);
  const [country_datas, setCountry_datas] = useState([]);

  const ref_country = useRef(null);
  const country_data = [];

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
    <>
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
    </>
  );
}

export default V8;
