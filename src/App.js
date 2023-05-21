import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Location from './pages/Location';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';

function App() {
    axios.defaults.baseURL = 'http://localhost:8080/v1';

    return (
        <div className="App">
            <Navbar />

            <Router>
                <Routes>
                    <Route index element={<Login />} />
sg
                    <Route exact path="/location" element={<Location />} />
                    <Route exact path="/location/:id" element={<Location />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
