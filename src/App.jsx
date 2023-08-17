import { BrowserRouter as Router, Routes, Route} from "react-router-dom"

import HomeLogin from "./page/HomeLogin";
import Home from "./page/Home";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLogin/>}/>
        <Route path="/home" element={<Home />} />
       
      </Routes>
    </Router>
  );
}

export default App;
