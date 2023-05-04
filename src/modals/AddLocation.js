import React, { useState, useEffect } from 'react'

import axios from "axios";

import { GoogleMap, LoadScript } from '@react-google-maps/api';

export default function AddDistrict({ createLocation, setCreateLocation }) {

    const onInputChange = (e) => {
        setCreateLocation({ ...createLocation, [e.target.name]: e.target.value });
    }

    /* loading districts into table */
    const [districts, setDistricts] = useState([])

    const loadDistricts = async () => {
        const result = await axios.get("/district")
        setDistricts(result.data);
    }
    /* ---------------------------- */

    useEffect(() => {
        loadDistricts()
    }, [])

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
            <div className="row">
                <div className="col">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Adres Adı</label>
                            <input type={"text"} className="form-control" name="name" value={createLocation.name} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="capacity" className="form-label">Kapasite</label>
                            <input type={"text"} className="form-control" name="capacity" value={createLocation.capacity} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="districtId" className="form-label">İlçe Adı</label>
                            <select class="form-select" id="exampleFormControlSelect1"  name="districtId" onChange={(e) => onInputChange(e)}>
                                {districts.map((district) => (
                                    <option value={district.id}>{district.name}</option>
                                ))}
                            </select>
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
                    </form>
                </div>
            </div>
        </div>
    )
}