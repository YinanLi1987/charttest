//Assigned to: Elias
//Fuctions: show v7 + 10 as required
//Requirements:

//The horizontal axis of the chart should be years
//Provide link to data sources

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const URL = "http://localhost:3001/v7";
const URL_DES = "http://localhost:3001/description";

const V7 = () => {
  const [chart_co2, setChart_co2] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [data_link, setData_link] = useState([]);
  const [description_link, setDescription_link] = useState([]);

  useEffect(() => {
    axios
      .get(URL_DES)
      .then((response) => {
        setTitle(response.data[6].v_title);
        setDescription(response.data[6].v_description);
        setData_link(response.data[6].data_link);
        setDescription_link(response.data[6].description_link);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setChart_co2(response.data);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }, []);

  var data = {
    labels: chart_co2.map((x) => x.Time_yr_BP),
    datasets: [
      {
        label: "50%",
        data: chart_co2.map((x) => x.percent50),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
      {
        label: "CO2 ppm",
        data: chart_co2.map((x) => x.carbon_dioxide_ppm),
        backgroundColor: ["rgba(255, 206, 86, 0.2)"],
        borderColor: ["rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
      {
        label: "Human Evolution and Activities related to CO2 and temperature",
        data: chart_co2.map((x) => x.notable_events),
        borderColor: ["black"],
        borderWidth: 1,
        pointRadius: 4,
        fill: false,
        showLine: false,
      },
    ],
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",

        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
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
    plugins: {
      tooltip: {
        //enabled: false
        callbacks: {
          title: (context) => {
            return "Human Evolution and Activities related to CO2 and temperature";
          },
          label: (context) => {
            return context.label;
          },
          afterLabel: (context) => {
            return "This is the index: " + context.dataIndex;
          },
        },
      },
    },
  };

  return (
    <div className="chart-info-container">
      <h3>V7-{title}</h3>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
      <h3>V7-{title}</h3>
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

export default V7;
