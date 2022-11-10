import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const URL = "http://localhost:3001/";
const V1_v2 = () => {
  const [chart_tem, setChart_tem] = useState([]);
  const ref_year = useRef(null);
  const ref_month = useRef(null);
  const ref_btn = useRef(null);

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setChart_tem(response.data);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }, []);

  var data_month = {
    labels: chart_tem.map((x) => x.Time_month),

    datasets: [
      {
        label: "Global",
        data: chart_tem.map((x) => x.Global_anomaly_month),
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 2,
      },

      {
        label: "Northern",
        data: chart_tem.map((x) => x.Northern_anomaly_month),
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 2,
      },

      {
        label: "Southern",
        data: chart_tem.map((x) => x.Southern_anomaly_month),
        borderColor: ["rgba(255, 206, 86, 1)"],
        borderWidth: 2,
      },
    ],
  };
  
  var data_year = {
    labels: chart_tem.map((x) => x.Time),

    datasets: [
      {
        label: "Global",
        data: chart_tem.map((x) => x.Global_anomaly),
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 2,
      },

      {
        label: "Northern",
        data: chart_tem.map((x) => x.Northern_anomaly),
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 2,
      },

      {
        label: "Southern",
        data: chart_tem.map((x) => x.Southern_anomaly),
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

  //console.log(ref_btn.current.innerHTML);
  return (
    <>
      <div ref={ref_year} style={{ display: "block" }}>
        <Line data={data_year} options={options} height={400} width={850} />
      </div>

      <div ref={ref_month} style={{ display: "none" }}>
        <Line data={data_month} options={options} height={400} width={850} />
      </div>

      <button
        onClick={() =>
          ref_btn.current.innerHTML === "Go Annual"
            ? ((ref_year.current.style.display = "block"),
              (ref_month.current.style.display = "none"),
              (ref_btn.current.innerHTML = "Go Monthly"))
            : ((ref_year.current.style.display = "none"),
              (ref_btn.current.innerHTML = "Go Annual"),
              (ref_month.current.style.display = "block"))
        }
        ref={ref_btn}
      >
        Go Monthly
      </button>
    </>
  );
};

export default V1_v2;
