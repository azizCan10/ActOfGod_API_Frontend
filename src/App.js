import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import AdminPage from './pages/AdminPage';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';

function App() {
    //TODO API PATH WILL BE WRITTEN
    axios.defaults.baseURL = 'http://localhost:8080/';

    return (
        <div className="App">
            <Navbar />

            <Router>
                <Routes>
                    <Route index element={<Login />} />

                    <Route exact path="/admin" element={<AdminPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
