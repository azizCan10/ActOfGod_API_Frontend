import React, { useEffect, useState } from 'react'

import axios from "axios";

import { Link, useParams } from 'react-router-dom';

import AddDistrict from '../modals/AddDistrict';

import { Button, Modal } from 'react-bootstrap';


export default function District() {

    /* loading districts into table */
    const [districts, setDistricts] = useState([])

    const loadDistricts = async () => {
        const result = await axios.get("/district")
        setDistricts(result.data);
    }
    /* ---------------------------- */

    /* for create discrict modal */
    const [showCreateDistrictModal, setShowCreateDistrictModal] = useState(false);

    const [createDistrict, setCreateDistrict] = useState({
        name: "",
        cityId: ""
    })

    const saveDistrict = async (e) => {
        e.preventDefault();
        await axios.post("/district", createDistrict);
        setShowCreateDistrictModal(false);
    }
    /* ------------------------- */

    const [showUpdateDistrictModal, setShowUpdateDistrictModal] = useState(false);

    const { id } = useParams();

    const updateDistrict = async (e) => {
        e.preventDefault();
        await axios.put(`/district/${id}`, createDistrict);
        setShowUpdateDistrictModal(false);
    }

    const deleteDistrict = async (e) => {
        await axios.delete(`/district/${id}`);
    }

    useEffect(() => {
        loadDistricts()
    }, [])

    return (
        <>
            <div className="container">
                <div className="py-4">
                    <button className="btn btn-primary mx-2" onClick={() => setShowCreateDistrictModal(true)}>İlçe Ekle</button>
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Index</th>
                                <th scope="col">İlçe</th>
                                <th scope="col">İl</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                districts.map((district, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{district.name}</td>
                                        <td>{district.cityName}</td>
                                        <td>
                                            <Link className="btn btn-secondary mx-2" to={`/district/${district.id}`} onClick={() => setShowUpdateDistrictModal(true)}>Güncelle</Link>
                                            <Link className="btn btn-danger mx-2" to={`/district/${district.id}`} onClick={() => deleteDistrict()}>Sil</Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create district modal */}
            <Modal show={showCreateDistrictModal} onHide={() => setShowCreateDistrictModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>İlçe Ekle</Modal.Title>
                </Modal.Header>
                <Modal.Body><AddDistrict createDistrict={createDistrict} setCreateDistrict={setCreateDistrict} /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCreateDistrictModal(false)}>İptal</Button>
                    <Button variant="success" onClick={saveDistrict}>Ekle</Button>
                </Modal.Footer>
            </Modal>

            {/* Update district modal */}
            <Modal show={showUpdateDistrictModal} onHide={() => setShowUpdateDistrictModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>İlçe Güncelle</Modal.Title>
                </Modal.Header>
                <Modal.Body><AddDistrict createDistrict={createDistrict} setCreateDistrict={setCreateDistrict} /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateDistrictModal(false)}>İptal</Button>
                    <Button variant="success" onClick={updateDistrict}>Güncelle</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}