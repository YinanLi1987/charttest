import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import N2_EMISSIONS from "./views/N2_Emissions";
import N1_CO2_TEMP from "./views/N1_CO2_Temp";
import N3_USER_SPECIFIC from "./views/N3_User_Specific";
import Auth from "./components/Auth";
import { useState } from "react";
import "./App.css";

function App() {
  const [userJWT, setUserJWT] = useState(null);

  let authRoutes = (
    <>
      <Route
        path="/login"
        element={<Auth login={(newJWT) => setUserJWT(newJWT)} />}
      />
    </>
  );
  if (userJWT != null) {
    authRoutes = (
      <>
       <Route
          path="/user_specific"
          element={<N3_USER_SPECIFIC jwt={userJWT} />}
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
      </Routes>
    </>
  );
}

export default App;
