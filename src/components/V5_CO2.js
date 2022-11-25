//Assigned to: Elias
//Fuctions: show v5 as required
//Requirements:

//The horizontal axis of the chart should be years
//Provide link to data sources

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const URL = "http://localhost:3001/v5";
const URL_DES = "http://localhost:3001/description";

const V5 = () => {
  const [chart_gasage, setChart_gasage] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [data_link, setData_link] = useState([]);
  const [description_link, setDescription_link] = useState([]);

  useEffect(() => {
    axios
      .get(URL_DES)
      .then((response) => {
        setTitle(response.data[4].v_title);
        setDescription(response.data[4].v_description);
        setData_link(response.data[4].data_link);
        setDescription_link(response.data[4].description_link);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setChart_gasage(response.data);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }, []);

  var data = {
    labels: chart_gasage.map((x) => x.gasage_edc3_yr_bp),
    datasets: [
      {
        label: "Gasage",
        data: chart_gasage.map((x) => x.co2_ppmv),
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
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
      <h3>V5-{title}</h3>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
      <div className="chart-info">{description.description}</div>
      <p>Introduction: {description}</p>
      <a href={data_link} className="chart-info">
        Data source
      </a>
      <br />
      <a href={description_link} className="chart-info">
        Data description
      </a>
    </div>
  );
};

export default V5;
