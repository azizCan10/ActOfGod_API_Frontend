import React, { useEffect, useState } from 'react'

import axios from "axios";

import { Link, useParams } from 'react-router-dom';

import AddCity from '../modals/AddCity';

import { Button, Modal } from 'react-bootstrap';

export default function City() {

    /* loading cities into table */
    const [cities, setCities] = useState([])

    const loadCities = async () => {
        const result = await axios.get("/city")
        setCities(result.data);
    }
    /* ---------------------------- */

    /* for create city modal */
    const [showCreateCityModal, setShowCreateCityModal] = useState(false);

    const [createCity, setCreateCity] = useState({
        name: ""
    })

    const saveCity = async (e) => {
        e.preventDefault();
        await axios.post("/city", createCity);
        setShowCreateCityModal(false);
    }
    /* ------------------------- */

    const [showUpdateCityModal, setShowUpdateCityModal] = useState(false);

    const { id } = useParams();

    const updateCity = async (e) => {
        e.preventDefault();
        await axios.put(`/city/${id}`, createCity);
        setShowUpdateCityModal(false);
    }

    const deleteCity = async (e) => {
        await axios.delete(`/city/${id}`);
    }

    useEffect(() => {
        loadCities()
    }, [])

    return (
        <>
            <div className="container">
                <div className="py-4">
                    <button className="btn btn-primary mx-2" onClick={() => setShowCreateCityModal(true)}>Şehir Ekle</button>
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Index</th>
                                <th scope="col">İl</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cities.map((city, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{city.name}</td>
                                        <td>
                                            <Link className="btn btn-secondary mx-2" to={`/city/${city.id}`} onClick={() => setShowUpdateCityModal(true)}>Güncelle</Link>
                                            <Link className="btn btn-danger mx-2" to={`/city/${city.id}`} onClick={() => deleteCity()}>Sil</Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create city modal */}
            <Modal show={showCreateCityModal} onHide={() => setShowCreateCityModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>İl Ekle</Modal.Title>
                </Modal.Header>
                <Modal.Body><AddCity createCity={createCity} setCreateCity={setCreateCity} /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCreateCityModal(false)}>İptal</Button>
                    <Button variant="success" onClick={saveCity}>Ekle</Button>
                </Modal.Footer>
            </Modal>

            {/* Update city modal */}
            <Modal show={showUpdateCityModal} onHide={() => setShowUpdateCityModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>İl Güncelle</Modal.Title>
                </Modal.Header>
                <Modal.Body><AddCity createCity={createCity} setCreateCity={setCreateCity} /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateCityModal(false)}>İptal</Button>
                    <Button variant="success" onClick={updateCity}>Güncelle</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
