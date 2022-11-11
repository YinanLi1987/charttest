import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const URL_Description ="http://localhost:3001/description"
const DescriptionV1V2 = () => {

const [description,setDescription] = useState([]);
useEffect(() => {
  axios
    .get(URL_Description)
    .then((response) => {
      
      setDescription(response);
    })
    .catch((error) => {
      alert(error.response.error);
    });
}, []);
console.log();

return (
    <>
    <p>Description:{description.data[0].Description}</p>
    <a href={description.data[0].link}>Data source </a>
    </>
)

}

export default DescriptionV1V2;