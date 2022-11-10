
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Co2_temp from './views/Co2_temp';
import Emission from './views/Emission';
import User_specific from './views/User_specific';
import NavBar from './components/NavBar';




function App() {
  return (
    <>
     <NavBar />
   <Routes>
       <Route path="/" element={<Co2_temp />}/>
       <Route path="/emission" element={<Emission />}/>
       <Route path="/user_specific" element={<User_specific />}/>
   </Routes>
   
    </>
  
  );
}

export default App;