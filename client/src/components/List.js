import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Constants from "../Constants.json";
const URL = process.env.REACT_APP_API_ADDRESS + "/list";

function List(props) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("jwt");
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

  const handleClick = async (event) => {
    sessionStorage.setItem(viewId, event.target.text);
  };
  const handleSubmitDeleteView = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post(process.env.REACT_APP_API_ADDRESS  + "/deleteview", {
        viewid: event.target[0].value,
      });

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>My List</h3>
      <ol>
        {list.map((view) => (
          <li key={view.customiseid}>
            <form onSubmit={handleSubmitDeleteView}>
              <Link
                onClick={handleClick}
                name="viewid"
                to={`/customise/${view.customiseid}`}
              >
                {view.customiseid}
              </Link>

              <button value={view.customiseid}>Delete this view</button>
            </form>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default List;
