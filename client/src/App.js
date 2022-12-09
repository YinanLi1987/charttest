import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import N2_EMISSIONS from "./views/N2_Emissions";
import N1_CO2_TEMP from "./views/N1_CO2_Temp";
import N3_USER_SPECIFIC from "./views/N3_User_Specific";
import AUTH from "./components/Auth";
import Customise from "./views/Customise";
import "./App.css";

function App() {
  const [userJWT, setUserJWT] = useState(null);
  const [viewid, setViewid] = useState(null);

  // When page is reloaded the user is not logged out:
  window.onload = function () {
    if (sessionStorage.getItem("jwt") != null) {
      const newuser = sessionStorage.getItem("jwt");
      setUserJWT(newuser);
    }
  };
  let authRoutes = (
    <>
      <Route
        path="/login"
        element={<AUTH login={(newJWT) => setUserJWT(newJWT)} />}
      />
    </>
  );
  if (userJWT != null) {
    authRoutes = (
      <>
        <Route
          path="/user_specific"
          element={
            <N3_USER_SPECIFIC
              jwt={userJWT}
              getViewId={(newViewid) => setViewid(newViewid)}
              userLoggedIn={userJWT != null}
            />
          }
        />
      </>
    );
  }
  return (
    <>
      <NavBar userLoggedIn={userJWT != null} />
      <Routes>
        <Route
          path="/"
          element={<N1_CO2_TEMP userLoggedIn={userJWT != null} />}
        />
        <Route
          path="/emissions"
          element={<N2_EMISSIONS userLoggedIn={userJWT != null} />}
        />
        {authRoutes}

        <Route path="*" element={<N1_CO2_TEMP />} />
        <Route path="/customise/:id" element={<Customise />} />
      </Routes>
    </>
  );
}

export default App;
