//Assigned to: Yinan
//Fuctions: show v1 and v2 as required
//Requirements:
//Use HadCRUT5 data (HadCRUT5 analysis time series: ensemble means and uncertainties)
//Provide zoomable line chart with toggle options for monthly and annual data
//Plot all three data series by their anomaly values and each series with different color
//Global (NH+SH)/2
//Northern hemisphere
//Southern hemisphere
//The horizontal axis of the chart should be years
//Provide link to data sources

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const URL = "http://localhost:3001/";
const V1_v2 = () => {
  const [chart_tem_year, setChart_tem_year] = useState([]);

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        console.log(response.data);
        setChart_tem_year(response.data);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }, []);

  var data = {
    labels: chart_tem_year.map((x) => x.Time_month),
    datasets: [
      {
        label: "Global (NH+SH)/2",
        data: chart_tem_year.map((x) => x.Global_anomaly_month),
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
    ],
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      labels: {
        fontSize: 26,
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} height={400} />
    </div>
  );
};

export default V1_v2;
