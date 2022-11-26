import React from "react";
import jwt_decode from "jwt-decode";

function N3_USER_SPECIFIC(props) {
  const decodedToken = jwt_decode(props.jwt);
  console.log(decodedToken);
  var URL = "https://github.com/";
  var customURL = "team11webdev";
  var customID = 23;

  return (
    <>
      <div>
        Decoded Token from payload
        <br />
        User Id:{decodedToken.user.id}
        <br />
        User Email:{decodedToken.user.Email}
        <br />
        User Name:{decodedToken.user.Username}
        <br />
        <button>Delete my counte</button>
      </div>
      <div className="n3-view-container">
        <div className="created-custom-container">
          <h3>Created Custom Views</h3>
          <div id={customID} className="created-custom-views">
            <div className="custom-view-info">
              <p>{customID} - </p>
              <a href={URL + customURL}>{URL + customURL}</a>
              <p>Copy link</p>
              <p>Delete</p>
            </div>
            <div id={customID} className="custom-view-info">
              <p>{customID} - </p>
              <a href={URL + customURL}>{URL + customURL}</a>
              <p>Copy link</p>
              <p>Delete</p>
            </div>
            <div id={customID} className="custom-view-info">
              <p>{customID} - </p>
              <a href={URL + customURL}>{URL + customURL}</a>
              <p>Copy link</p>
              <p>Delete</p>
            </div>
          </div>
        </div>

        <div className="custom-view-creator-container">
          <h3>Create Custom View</h3>
          <form className="form-container">
            <div className="v-container">
              <input type="checkbox" id="v1" name="v1" value="v1"></input>
              <label htmlFor="v1">V1</label>
              <input type="checkbox" id="v2" name="v2" value="v2"></input>
              <label htmlFor="v2">+ V2</label>
              <input
                type="text"
                id="custom-desc-v1"
                placeholder="Input Description"
              ></input>
            </div>

            <div className="v-container">
              <input type="checkbox" id="v3" name="v3" value="v3"></input>
              <label htmlFor="v3">V3</label>
              <input type="checkbox" id="v4" name="v4" value="v4"></input>
              <label htmlFor="v4">+ V4</label>
              <input type="checkbox" id="v10" name="v10" value="v10"></input>
              <label htmlFor="v10">+ V10</label>
              <input
                type="text"
                id="custom-desc-v3"
                placeholder="Input Description"
              ></input>
            </div>

            <div className="v-container">
              <input type="checkbox" id="v5" name="v5" value="v5"></input>
              <label htmlFor="v5">V5</label>
              <input
                type="text"
                id="custom-desc-v5"
                placeholder="Input Description"
              ></input>
            </div>

            <div className="v-container">
              <input type="checkbox" id="v6" name="v6" value="v6"></input>
              <label htmlFor="v6">V6</label>
              <input
                type="text"
                id="custom-desc-v6"
                placeholder="Input Description"
              ></input>
            </div>

            <div className="v-container">
              <input type="checkbox" id="v7" name="v7" value="v7"></input>
              <label htmlFor="v7">V7</label>
              <input type="checkbox" id="v10" name="v10" value="v10"></input>
              <label htmlFor="v10">+ V10</label>
              <input
                type="text"
                id="custom-desc-v7"
                placeholder="Input Description"
              ></input>
            </div>

            <div className="v-container">
              <input type="checkbox" id="v8" name="v8" value="v8"></input>
              <label htmlFor="v8">V8</label>
              <input
                type="text"
                id="custom-desc-v8"
                placeholder="Input Description"
              ></input>
            </div>

            <div className="v-container">
              <input type="checkbox" id="v9" name="v9" value="v9"></input>
              <label htmlFor="v9">V9</label>
              <input
                type="text"
                id="custom-desc-v9"
                placeholder="Input Description"
              ></input>
            </div>

            <div className="column-toggle-container">
              <input
                type="radio"
                id="col-1"
                name="col-number"
                value="col-toggle"
              ></input>
              <label htmlFor="col-1">One Column</label>
              <input
                type="radio"
                id="col-2"
                name="col-number"
                placeholder="col-toggle"
              ></input>
              <label htmlFor="col-2">Two Columns</label>
            </div>

            <input type="submit" value="Create"></input>
          </form>
        </div>

        <form className="user-deleter">
          <input type="submit" value="Delete User"></input>
        </form>
      </div>
    </>
  );
}

export default N3_USER_SPECIFIC;
