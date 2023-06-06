import React, { useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';

import { Button, Modal } from 'react-bootstrap';

import axios from "axios";

import CreateLocationModal from '../modals/location/CreateLocationModal';
import UpdateLocationModal from "../modals/location/UpdateLocationModal";
import LogoutNavbar from '../layout/LogoutNavbar';

/**
 * This is Location Page
 */
export default function Location() {

    //location list for location table
    const [locationList, setLocationList] = useState([])

    //modals
    const [showCreateLocationModal, setShowCreateLocationModal] = useState(false);
    const [showUpdateLocationModal, setShowUpdateLocationModal] = useState(false);

    //dtos
    const [createLocationDto, setCreateLocationDto] = useState({
        name: "",
        latitude: "",
        longitude: "",
        capacity: "",
        districtId: ""
    })

    const [updateLocationDto, setUpdateLocationDto] = useState({
        name: "",
        latitude: "",
        longitude: "",
        capacity: "",
        districtId: ""
    })

    //get id from url to update location
    const { id } = useParams();

    //crud operations
    const getLocationList = async () => {
        const result = await axios.get("/location")
        setLocationList(result.data);
    }

    const saveLocation = async (e) => {
        e.preventDefault();
        await axios.post("/location", createLocationDto);
        setShowCreateLocationModal(false);
        getLocationList();
        clearCreateLocationDto();
        window.location.reload()
    }
    const clearCreateLocationDto =()=>{
        setCreateLocationDto({
            name: "",
            latitude: "",
            longitude: "",
            capacity: "",
            districtId: ""
        });
    }

    const updateLocation = async (e) => {
        e.preventDefault();
        await axios.put(`/location/${id}`, updateLocationDto);
        setShowUpdateLocationModal(false);
        getLocationList();
        window.location.reload()
    }

    const deleteLocation = async (delete_id) => {
        await axios.delete(`/location/${delete_id}`);
        getLocationList();
    }

    const setUpdateLocationModal =()=>{
        setShowUpdateLocationModal(false)
        window.location.reload()
    }

    const setCreateLocationModal =()=>{
        setShowCreateLocationModal(false)
        window.location.reload()
    }

    useEffect(() => {
        getLocationList();
    }, [])

    return (
        <>
            <LogoutNavbar/>
            <div className="container">
                <div className="py-4">
                    <button className="btn btn-primary mx-2" onClick={() => setShowCreateLocationModal(true)}>Konum Ekle</button>
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Index</th>
                                <th scope="col">İsim</th>
                                <th scope="col">Konum</th>
                                <th scope="col">Kapasite</th>
                                <th scope="col">İlçe Adı</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                locationList.map((location, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{location.name}</td>
                                        <td>{location.latitude},{location.longitude}</td>
                                        <td>{location.capacity}</td>
                                        <td>{location.districtName}</td>
                                        <td>
                                            <Link className="btn btn-secondary mx-2" to={`/location/${location.id}`} onClick={() => setShowUpdateLocationModal(true)}>Güncelle</Link>
                                            <Link className="btn btn-danger mx-2" onClick={() => deleteLocation(location.id)}>Sil</Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create location modal */}
            <Modal show={showCreateLocationModal} onHide={() => setCreateLocationModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Konum Ekle</Modal.Title>
                </Modal.Header>
                <Modal.Body><CreateLocationModal createLocation={createLocationDto} setCreateLocation={setCreateLocationDto} /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setCreateLocationModal()}>İptal</Button>
                    <Button variant="success" onClick={saveLocation}>Ekle</Button>
                </Modal.Footer>
            </Modal>

            {/* Update location modal */}
            <Modal show={showUpdateLocationModal} onHide={() => setUpdateLocationModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>Konum Güncelle</Modal.Title>
                </Modal.Header>
                <Modal.Body><UpdateLocationModal updateLocation={updateLocationDto} setUpdateLocation={setUpdateLocationDto} /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setUpdateLocationModal()}>İptal</Button>
                    <Button variant="success" onClick={updateLocation}>Güncelle</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
