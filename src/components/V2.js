import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const URL = "http://localhost:3001/";
const URL_DES = "http://localhost:3001/description";

const V1_v2 = () => {
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
        setTitle(response.data[1].v_title);

        setDescription(response.data[1].v_description);
        setData_link(response.data[1].data_link);
        setDescription_link(response.data[1].description_link);
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
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }, []);

  var data_year = {
    labels: chart_tem_year.map((x) => x.Time).filter(Boolean),

    datasets: [
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
      <h3>V2-{title}</h3>
      <div style={{ display: "block" }} className="chart-container">
        <Line data={data_year} options={options} height={400} width={850} />
      </div>

      <div className="chart-description">
        <p>Introduction: {description}</p>
        <a href={data_link}>Data source</a>
        <br />
        <a href={description_link}>Data description</a>
      </div>
    </div>
  );
};

export default V1_v2;
