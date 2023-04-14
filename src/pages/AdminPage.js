import React, { useState } from 'react';
import axios from "axios";

import { Link} from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

export default function DealPage() {

    const [location, setLocation] = useState({
        adressName: "",
        x: "",
        y: "",
        openAdress: "",
        capacity: ""
    })

    const onInputChange = (e) => {
        setLocation({ ...location, [e.target.name]: e.target.value });
    }

    //TODO API PATH WILL BE WRITTEN
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("/", location);
    }

    return (
        <div className="container">
            <div className="py-4">
                <div>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="adressName" className="form-label">Adres Adı</label>
                            <input type={"text"} className="form-control" name="adressName" value={location.adressName} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="capacity" className="form-label">Kapasite</label>
                            <input type={"text"} className="form-control" name="capacity" value={location.capacity} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="mb-3">
                            
                        </div>
                        <div>
                            <Link className="btn btn-success mx-2" to={`/admin`} onClick={(e) => handleSubmit(e)}>Konum Ekle</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
