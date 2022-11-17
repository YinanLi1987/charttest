import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const URL = "http://localhost:3001/";
const URL_DES = "http://localhost:3001/description";

const V1 = () => {
  const [chart_tem_month, setChart_tem_month] = useState([]);
  const [chart_tem_year, setChart_tem_year] = useState([]);
  const ref_year = useRef(null);
  const ref_month = useRef(null);
  const ref_btn = useRef(null);
  const [title, setTitle] = useState([]);

  const [description, setDescription] = useState([]);
  const [data_link, setData_link] = useState([]);
  const [description_link, setDescription_link] = useState([]);

  useEffect(() => {
    axios
      .get(URL_DES)
      .then((response) => {
       setTitle(response.data[0].v_title);
       setDescription(response.data[0].v_description);
       setData_link(response.data[0].data_link);
       setDescription_link(response.data[0].description_link);
      
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setChart_tem_year(response.data.slice(0, 380));
        setChart_tem_month(response.data);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }, []);

  var data_month = {
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

  var data_year = {
    labels: chart_tem_year.map((x) => x.Time).filter(Boolean),

    datasets: [
      {
        label: "Global",
        data: chart_tem_year.map((x) => x.Global_anomaly).filter(Boolean),
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 2,
      },

      {
        label: "Northern",
        data: chart_tem_year.map((x) => x.Northern_anomaly).filter(Boolean),
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 2,
      },

      {
        label: "Southern",
        data: chart_tem_year.map((x) => x.Southern_anomaly).filter(Boolean),
        borderColor: ["rgba(255, 206, 86, 1)"],
        borderWidth: 2,
      },

      {
        label: "Norhtern Reconstr",
        data: chart_tem_year.map((x) => x.Northern_recon).filter(Boolean),
        borderColor: ["rgba(75, 192, 192, 1)"],
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

  //console.log(ref_btn.current.innerHTML);
  return (
    <div className="chart-info-container">
      <h3>v1-{title}</h3>
      <div
        ref={ref_year}
        style={{ display: "block" }}
        className="chart-container"
      >
        <Line data={data_year} options={options} height={400} width={850} />
      </div>

      <div
        ref={ref_month}
        style={{ display: "none" }}
        className="chart-container"
      >
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
      <div className="chart-description">
        <p>Introduction: {description}</p>
        <a href={data_link }>Data source</a><br/>
        <a href={description_link}>Data description</a>
      </div>
    </div>
  );
};

export default V1;
