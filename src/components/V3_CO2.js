//Assigned to: Nenna

import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Button from "react-bootstrap/Button";

const URL_Annual = "http://localhost:3001/v3_annual";
const URL_Monthly = "http://localhost:3001/v3_monthly";
const URL_DES = "http://localhost:3001/description";

const V3_CO2 = () => {
  const [annual, setAnnual] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const ref_annual = useRef(null);
  const ref_monthly = useRef(null);
  const ref_btn = useRef(null);

  const [title, setTitle] = useState([]);

  const [description, setDescription] = useState([]);
  const [data_link, setData_link] = useState([]);
  const [description_link, setDescription_link] = useState([]);

  useEffect(() => {
    axios
      .get(URL_DES)
      .then((response) => {
        setTitle(response.data[2].v_title);
        setDescription(response.data[2].v_description);
        setData_link(response.data[2].data_link);
        setDescription_link(response.data[2].description_link);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(URL_Annual)
      .then((response) => {
        setAnnual(response.data);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(URL_Monthly)
      .then((response) => {
        setMonthly(response.data);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }, []);

  var data_monthly = {
    labels: monthly.map((x) => x.Time_month),
    datasets: [
      {
        label:
          "Mauna Loa CO2 monthly mean data (CO2 expressed as a mole fraction in dry air, micromol/mol)",
        data: monthly.map((x) => x.Monthly_mean),
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 2,
      },
    ],
  };

  var data_annual = {
    labels: annual.map((x) => x.Time),
    datasets: [
      {
        label:
          "Mauna Loa CO2 annual mean data (CO2 expressed as a mole fraction in dry air, micromol/mol)",
        data: annual.map((x) => x.Annual_mean), //.filter(Boolean),
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

  //console.log(ref_btn.current.innerHTML);
  return (
    <div className="chart-info-container">
      <h4>V3-{title}</h4>
      <div
        className="chart-container"
        ref={ref_annual}
        style={{ display: "block" }}
      >
        <Line data={data_annual} options={options} height={400} width={850} />
      </div>

      <div
        className="chart-container"
        ref={ref_monthly}
        style={{ display: "none" }}
      >
        <Line data={data_monthly} options={options} height={400} width={850} />
      </div>

      <Button
        variant="outline-secondary"
        onClick={() =>
          ref_btn.current.innerHTML === "Show Annual"
            ? ((ref_annual.current.style.display = "block"),
              (ref_monthly.current.style.display = "none"),
              (ref_btn.current.innerHTML = "Show Monthly"))
            : ((ref_annual.current.style.display = "none"),
              (ref_btn.current.innerHTML = "Show Annual"),
              (ref_monthly.current.style.display = "block"))
        }
        ref={ref_btn}
      >
        {" "}
        Show Monthly{" "}
      </Button>

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

export default V3_CO2;
