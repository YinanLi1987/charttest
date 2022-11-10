import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const URL = "http://localhost:3001/";
const V1_v2 = () => {
  const [chart_tem_month, setChart_tem_month] = useState([]);

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setChart_tem_month(response.data);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }, []);

  var data = {
    labels: chart_tem_month.map((x) => x.Time_month),
    datasets: [
      {
        label: "Global",
        data: chart_tem_month.map((x) => x.Global_anomaly_month),
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 2,
      },

      {
        label: "Northern",
        data: chart_tem_month.map((x) => x.Northern_anomaly_month),
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 2,
      },

      {
        label: "Southern",
        data: chart_tem_month.map((x) => x.Southern_anomaly_month),
        borderColor: ["rgba(255, 206, 86, 1)"],
        borderWidth: 2,
      },
    ],
  };

  var options = {
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
      <Line data={data} options={options} height={400} width={850} />

      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-primary">
          Year
        </button>
        <button type="button" className="btn btn-primary">
          Month
        </button>
      </div>
    </div>
  );
};

export default V1_v2;
