import React, { useState, useEffect } from 'react'

import axios from "axios";

import { GoogleMap, LoadScript } from '@react-google-maps/api';

/**
 * This function defines updating location modal
 */
export default function UpdateLocationModal({ updateLocation, setUpdateLocation }) {

    //sets location parameters according to inputs
    const onLocationChange = (e) => {
        setUpdateLocation({ ...updateLocation, [e.target.name]: e.target.value });
    }

    //district list
    const [districtList, setDistrictList] = useState([])

    const getDistrictList = async () => {
        const result = await axios.get("/district")
        setDistrictList(result.data);
    }

    useEffect(() => {
        getDistrictList()
    }, [])

    //google maps configurations
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
                            <input type={"text"} className="form-control" name="name" value={updateLocation.name} onChange={(e) => onLocationChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="capacity" className="form-label">Kapasite</label>
                            <input type={"text"} className="form-control" name="capacity" value={updateLocation.capacity} onChange={(e) => onLocationChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="districtId" className="form-label">İlçe Adı</label>
                            <select className="form-select" id="exampleFormControlSelect1"  name="districtId" onChange={(e) => onLocationChange(e)}>
                                {districtList.map((district) => (
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