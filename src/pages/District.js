import React, { useEffect, useState } from 'react'

import axios from "axios";

import { Link } from 'react-router-dom';

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
                                            <Link className="btn btn-secondary mx-2">Güncelle</Link>
                                            <Link className="btn btn-danger mx-2">Sil</Link>
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
        </>
    )
}