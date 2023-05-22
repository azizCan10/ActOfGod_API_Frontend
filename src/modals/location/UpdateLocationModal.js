import React, {useState, useEffect} from 'react'

import {useParams} from "react-router-dom";

import axios from "axios";

import {GoogleMap, LoadScript} from '@react-google-maps/api';

/**
 * This function defines updating location modal
 */
export default function UpdateLocationModal({updateLocation, setUpdateLocation}) {

    //sets location parameters according to inputs
    const onLocationChange = (e) => {
        setUpdateLocation({...updateLocation, [e.target.name]: e.target.value});
    }

    //set updateLocationDto
    const {id} = useParams();

    const getLocationById = async () => {
        const result = await axios.get(`/location/${id}`);
        setUpdateLocation(result.data);
    }

    //city and district list
    const [cityList, setCityList] = useState([])
    const [districtList, setDistrictList] = useState([])

    //get city and district
    const getCityList = async () => {
        const result = await axios.get("/city")
        setCityList(result.data);
    }

    const getDistrictListByCityId = async (e) => {
        const result = await axios.get(`/district/getByCityId/${e.target.value}`);
        setDistrictList(result.data);
    }

    useEffect(() => {
        getLocationById();
        getCityList();
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
                            <input type={"text"} className="form-control" name="name" value={updateLocation.name} onChange={(e) => onLocationChange(e)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="capacity" className="form-label">Kapasite</label>
                            <input type={"text"} className="form-control" name="capacity" value={updateLocation.capacity} onChange={(e) => onLocationChange(e)}/>
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