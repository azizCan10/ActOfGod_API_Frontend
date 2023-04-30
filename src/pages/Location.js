import React, { useState } from 'react';
import axios from "axios";

import { Link } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

import { GoogleMap, LoadScript } from '@react-google-maps/api';

export default function Location() {

    const [location, setLocation] = useState({
        name: "",
        latitude: "",
        longitude: "",
        capacity: ""
    })

    const onInputChange = (e) => {
        setLocation({ ...location, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("/location", location);
    }

    //google maps
    const containerStyle = {
        width: '400px',
        height: '400px'
    };

    const center = {
        lat: -3.745,
        lng: -38.523
    };

    return (
        <div className="container">
            <div className="py-4">
                <div>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Adres Adı</label>
                            <input type={"text"} className="form-control" name="name" value={location.name} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="capacity" className="form-label">Kapasite</label>
                            <input type={"text"} className="form-control" name="capacity" value={location.capacity} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="mb-3">
                            <LoadScript googleMapsApiKey="AIzaSyABjQxjbQdIqytvaX7PtkQXX8rbbMpglUQ">
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={center}
                                    zoom={10}
                                >
                                </GoogleMap>
                            </LoadScript>
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
