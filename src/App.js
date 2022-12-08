import "bootstrap/dist/css/bootstrap.css";
import "./styleHomePage.css";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import HomePage from "./HomePage";

function App() {


  return (
    <div className="App">
      <Router>
          <Routes>
            <Route exact path="/" element={<Login/>}/>
            <Route exact path="/homepage" element={<HomePage/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
