import React, { useEffect, useState } from 'react'

import { Link, useParams } from 'react-router-dom';

import { Button, Modal } from 'react-bootstrap';

import axios from "axios";

import CreateDistrictModal from '../modals/district/CreateDistrictModal';
import UpdateDistrictModal from "../modals/district/UpdateDistrictModal";

/**
 * This is District Page
 */
export default function District() {

    //district list for district table
    const [districtList, setDistrictList] = useState([])

    //modals
    const [showCreateDistrictModal, setShowCreateDistrictModal] = useState(false);
    const [showUpdateDistrictModal, setShowUpdateDistrictModal] = useState(false);

    //dtos
    const [createDistrictDto, setCreateDistrictDto] = useState({
        name: "",
        cityId: ""
    })

    const [updateDistrictDto, setUpdateDistrictDto] = useState({
        name: "",
        cityId: ""
    })

    //get id from url to update district
    const { id } = useParams();

    //crud operations
    const getDistrictList = async () => {
        const result = await axios.get("/district")
        setDistrictList(result.data);
    }

    const saveDistrict = async (e) => {
        e.preventDefault();
        await axios.post("/district", createDistrictDto);
        setShowCreateDistrictModal(false);
        getDistrictList();
    }

    const updateDistrict = async (e) => {
        e.preventDefault();
        await axios.put(`/district/${id}`, updateDistrictDto);
        setShowUpdateDistrictModal(false);
        getDistrictList();
    }

    const deleteDistrict = async (delete_id) => {
        await axios.delete(`/district/${delete_id}`);
        getDistrictList();
    }

    useEffect(() => {
        getDistrictList()
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
                                districtList.map((district, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{district.name}</td>
                                        <td>{district.cityName}</td>
                                        <td>
                                            <Link className="btn btn-secondary mx-2" to={`/district/${district.id}`} onClick={() => setShowUpdateDistrictModal(true)}>Güncelle</Link>
                                            <Link className="btn btn-danger mx-2" onClick={() => deleteDistrict(district.id)}>Sil</Link>
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
                <Modal.Body><CreateDistrictModal createDistrict={createDistrictDto} setCreateDistrict={setCreateDistrictDto} /></Modal.Body>
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
                <Modal.Body><UpdateDistrictModal updateDistrict={updateDistrictDto} setUpdateDistrict={setUpdateDistrictDto} /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateDistrictModal(false)}>İptal</Button>
                    <Button variant="success" onClick={updateDistrict}>Güncelle</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}