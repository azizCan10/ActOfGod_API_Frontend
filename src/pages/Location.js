import React, { useEffect, useState } from 'react';

import axios from "axios";

import { Link, useParams } from 'react-router-dom';

import AddLocation from '../modals/AddLocation';

import { Button, Modal } from 'react-bootstrap';

export default function Location() {

    /* loading locations into table */
    const [locations, setLocations] = useState([])

    const loadLocations = async () => {
        const result = await axios.get("/location")
        setLocations(result.data);
    }
    /* ---------------------------- */

    /* for create location modal */
    const [showCreateLocationModal, setShowCreateLocationModal] = useState(false);

    const [createLocation, setCreateLocation] = useState({
        name: "",
        latitude: "",
        longitude: "",
        capacity: "",
        districtId: ""
    })

    const saveLocation = async (e) => {
        e.preventDefault();
        await axios.post("/location", createLocation);
    }
    /* ------------------------- */

    const [showUpdateLocationModal, setShowUpdateLocationModal] = useState(false);

    const { id } = useParams();

    const updateLocation = async (e) => {
        e.preventDefault();
        await axios.put(`/location/${id}`, createLocation);
        setShowUpdateLocationModal(false);
    }

    useEffect(() => {
        loadLocations()
    }, [])

    return (
        <>
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
                                locations.map((location, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{location.name}</td>
                                        <td>{location.latitude},{location.longitude}</td>
                                        <td>{location.capacity}</td>
                                        <td>{location.districtName}</td>
                                        <td>
                                            <Link className="btn btn-secondary mx-2" to={`/location/${location.id}`} onClick={() => setShowUpdateLocationModal(true)}>Güncelle</Link>
                                            <Link className="btn btn-danger mx-2">Sil</Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create location modal */}
            <Modal show={showCreateLocationModal} onHide={() => setShowCreateLocationModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Konum Ekle</Modal.Title>
                </Modal.Header>
                <Modal.Body><AddLocation createLocation={createLocation} setCreateLocation={setCreateLocation} /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCreateLocationModal(false)}>İptal</Button>
                    <Button variant="success" onClick={saveLocation}>Ekle</Button>
                </Modal.Footer>
            </Modal>

            {/* Update location modal */}
            <Modal show={showUpdateLocationModal} onHide={() => setShowUpdateLocationModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Konum Güncelle</Modal.Title>
                </Modal.Header>
                <Modal.Body><AddLocation createLocation={createLocation} setCreateLocation={setCreateLocation} /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateLocationModal(false)}>İptal</Button>
                    <Button variant="success" onClick={updateLocation}>Güncelle</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
