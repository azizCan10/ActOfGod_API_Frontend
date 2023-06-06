import React, {useState, useEffect} from 'react'

import axios from "axios";

import {GoogleMap, LoadScript} from '@react-google-maps/api';

/**
 * This function defines adding location modal
 */
export default function CreateLocationModal({createLocation, setCreateLocation}) {

    //sets location parameters according to inputs
    const onLocationChange = (e) => {
        setCreateLocation({...createLocation, [e.target.name]: e.target.value});
    }

    //city and district list
    const [cityList, setCityList] = useState([]);
    const [districtList, setDistrictList] = useState([]);

    //get city and district
    const getCityList = async () => {
        const result = await axios.get("/city");
        setCityList(result.data);
    }

    const getDistrictListByCityId = async (e) => {
        const result = await axios.get(`/district/getByCityId/${e.target.value}`);
        setDistrictList(result.data);
    }

    const getDistrictListForFirstOpen = async () => {
        const result = await axios.get("/district/getByCityId/1");
        setDistrictList(result.data);
    }

    useEffect(() => {
        getCityList();
        getDistrictListForFirstOpen();
    }, [])

    //google maps configurations
    const containerStyle = {
        width: '400px',
        height: '400px'
    };

    const center = {
        lat: 40.7654,
        lng: 29.9408
    };

    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setXY(lat, lng);
    };

    const setXY = (x, y) => {
        setCreateLocation({...createLocation, latitude: x, longitude: y});
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Adres Adı</label>
                            <input type={"text"} className="form-control" name="name" value={createLocation.name} onChange={(e) => onLocationChange(e)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="capacity" className="form-label">Kapasite</label>
                            <input type={"text"} className="form-control" name="capacity" value={createLocation.capacity} onChange={(e) => onLocationChange(e)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cityId" className="form-label">İl</label>
                            <select className="form-select" id="exampleFormControlSelect1" name="cityId" onChange={(e) => getDistrictListByCityId(e)}>
                                {cityList.map((city) => (
                                    <option value={city.id}>{city.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="districtId" className="form-label">İlçe</label>
                            <select className="form-select" id="exampleFormControlSelect1" name="districtId" onChange={(e) => onLocationChange(e)}>
                                {districtList.map((district) => (
                                    <option value={district.id}>{district.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <LoadScript googleMapsApiKey="YOUR_API_KEY">
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={center}
                                    zoom={10}
                                    onClick={handleMapClick}
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