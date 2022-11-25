//Assigned to: Nenna

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const URL_sectors = "http://localhost:3001/v9_sectors";
const URL_sub_sectors = "http://localhost:3001/v9_sub_sectors";
const URL_DES = "http://localhost:3001/description";

export default function V9_CO2_SECTOR() {
  const [sectors, setSectors] = useState([]);
  const [subSectors, setSubSectors] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [data_link, setData_link] = useState([]);
  const [description_link, setDescription_link] = useState([]);
  useEffect(() => {
    axios
      .get(URL_DES)
      .then((response) => {
        setTitle(response.data[8].v_title);
        setDescription(response.data[8].v_description);
        setData_link(response.data[8].data_link);
        setDescription_link(response.data[8].description_link);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(URL_sectors)
      .then((response) => {
        setSectors(response.data);
        //console.log(response.data)
        //console.log(response.data[0].Sector)
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(URL_sub_sectors)
      .then((response) => {
        setSubSectors(response.data);
        //console.log(response.data)
        //console.log('sub sector id: ' + response.data[0].Sector_id)
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const sectorData = {
    labels: sectors.map((s) => s.Sector),
    datasets: [
      /*{
      label: 'Sub-Sectors',
      data: subSectors.map((s) => s.Percentage),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      circumference: (ctx) => {
        console.log(ctx.chart.data.datasets[ctx.datasetIndex + 1].data)
        console.log('Energy total: ' + ctx.chart.data.datasets[ctx.datasetIndex + 1].data[0])
        console.log('Industry total: ' + ctx.chart.data.datasets[ctx.datasetIndex + 1].data[1])
        console.log('Waste total: ' + ctx.chart.data.datasets[ctx.datasetIndex + 1].data[2])
        console.log('Agriculture, Forestry & Land Use (AFOLU) total: ' + ctx.chart.data.datasets[ctx.datasetIndex + 1].data[3])
        //const total = 100;
        const total = [...ctx.chart.data.datasets[ctx.datasetIndex + 1].data].reduce((a, b) => a + b, 0)
        console.log(total)
        //const currentSegment = 73.2;
        const currentSegment = ctx.chart.data.datasets[ctx.datasetIndex + 1].data[0]
        const radius = 360;
        const segmentPercentage = radius * (currentSegment/ total)
        console.log(segmentPercentage)
        return(segmentPercentage)
      }
    },*/
      {
        label: "Sectors",
        data: sectors.map((s) => s.Percentage),
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
      },
    ],
  };

  const options = {
    /*onClick: (e, activeElement) => {
      let datasetIndex = activeElement[0].datasetIndex
      let dataIndex = activeElement[0].index
      let datasetLabel = e.chart.data.datasets[datasetIndex].label
      let value = e.chart.data.datasets[datasetIndex].data[dataIndex]
      let label = e.chart.data.labels[dataIndex]
      console.log("In click", datasetLabel, label, value)
      console.log(sectors.map((s) => s.Sector_id + s.Sector))
      console.log(subSectors.map((s) => s.Sector_id + s.Sub_sector))
      return (
        alert("Hello" + label)
      )
    },*/
    plugins: {
      tooltip: {
        //enabled: false,
        callbacks: {
          title: (context) => {
            return context.map((s) => s.label + " " + s.parsed + "%");
          },
          label: (context) => {
            return "Sub-Sectors of " + context.label + ":";
          },
          afterLabel: (context) => {
            let subEnergy = [];
            let subIndustry = [];
            let subWaste = [];
            let subAgri = [];
            for (let i = 0; i < subSectors.length; i++) {
              if (subSectors[i].Sector_id === 1) {
                subEnergy.push(
                  subSectors[i].Sub_sector +
                    " " +
                    subSectors[i].Percentage +
                    "%"
                );
              } else if (subSectors[i].Sector_id === 2) {
                subIndustry.push(
                  subSectors[i].Sub_sector +
                    " " +
                    subSectors[i].Percentage +
                    "%"
                );
              } else if (subSectors[i].Sector_id === 3) {
                subWaste.push(
                  subSectors[i].Sub_sector +
                    " " +
                    subSectors[i].Percentage +
                    "%"
                );
              } else if (subSectors[i].Sector_id === 4) {
                subAgri.push(
                  subSectors[i].Sub_sector +
                    " " +
                    subSectors[i].Percentage +
                    "%"
                );
              }
            }
            if (context.parsed === 73.2) {
              return subEnergy;
            } else if (context.parsed === 5.2) {
              return subIndustry;
            } else if (context.parsed === 3.2) {
              return subWaste;
            } else if (context.parsed === 18.4) {
              return subAgri;
            }
          },
        },
      },
    },
  };

  return (
    <div className="chart-info-container">
      <h3>V9-{title}</h3>
      <div className="chart-container">
        <Doughnut data={sectorData} options={options} />
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
}
