import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Constants from "./Constants.json";
const URL = Constants.API_ADDRESS + "/list";

function List(props) {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const decodedToken = jwt_decode(token);
  const user = decodedToken.user.id;
  const [userviews, setUserviews] = useState([]);
  const [viewId, setViewId] = useState("");

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

  const list = [];
  for (let i = 0; i < userviews.length; i++) {
    if (userviews[i].userid === user) {
      list.push(userviews[i]);
    }
  }
  console.log(list);
  const handleClick = async (event) => {
    console.log(event.target.text);
    localStorage.setItem(viewId, event.target.text);
    const receivedViewId = localStorage.getItem(viewId);
    console.log(receivedViewId);
  };

  return (
    <div>
      <h3>My List</h3>
      <ol>
        {list.map((view) => (
          <li key={view.customiseid}>
            <Link
              onClick={handleClick}
              name="viewid"
              to={`/customise/${view.customiseid}`}
            >
              {view.customiseid}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default List;
