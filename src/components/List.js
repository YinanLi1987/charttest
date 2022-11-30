import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Constants from "./Constants.json";
const URL = Constants.API_ADDRESS + "/list";

function List() {
  const token = localStorage.getItem("jwt");
  const decodedToken = jwt_decode(token);
  const user = decodedToken.user.id;
  const [userviews, setUserviews] = useState([]);

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setUserviews(response.data);
      })

      .catch((error) => {
        alert(error.response.data.error);
      });
  }, []);
  console.log(userviews);
  const list = [];
  for (let i = 0; i < userviews.length; i++) {
    if (userviews[i].userid === user) {
      list.push(userviews[i]);
    }
  }
  console.log(list);

  return (
    <div>
      <h3>My List</h3>
      <ol>
        {list.map((view) => (
          <li key={view.customiseid}>{view.customiseid}</li>
        ))}
      </ol>
    </div>
  );
}

export default List;
