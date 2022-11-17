import NavBar from "./components/NavBar"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import N2_EMISSIONS from './views/N2_Emissions';
import N1_CO2_TEMP from './views/N1_CO2_Temp';
import N3_USER_SPECIFIC from './views/N3_User_Specific';
import './App.css';

function App() {
  return (
  <>
     <NavBar />
   <Routes>
       <Route path="/" element={<N1_CO2_TEMP />}/>
       <Route path="/emissions" element={<N2_EMISSIONS />}/>
       <Route path="/user_specific" element={<N3_USER_SPECIFIC/>}/>
       <Route path="*" element={<N1_CO2_TEMP />}/>
   </Routes>
   
    </>
  );
}

export default App;