import React, { useEffect, useState } from 'react'

import { Link, useParams } from 'react-router-dom';

import { Button, Modal } from 'react-bootstrap';

import axios from "axios";

import CreateCityModal from '../modals/city/CreateCityModal';
import UpdateCityModal from "../modals/city/UpdateCityModal";

/**
 * This is City Page
 */
export default function City() {

    //city list for city table
    const [cityList, setCityList] = useState([])

    //modals
    const [showCreateCityModal, setShowCreateCityModal] = useState(false);
    const [showUpdateCityModal, setShowUpdateCityModal] = useState(false);

    //dtos
    const [createCityDto, setCreateCityDto] = useState({
        name: ""
    })

    const [updateCityDto, setUpdateCityDto] = useState({
        name: ""
    })

    //get id from url to update city
    const { id } = useParams();

    //crud operations
    const getCityList = async () => {
        const result = await axios.get("/city")
        setCityList(result.data);
    }

    const saveCity = async (e) => {
        e.preventDefault();
        await axios.post("/city", createCityDto);
        setShowCreateCityModal(false);
        getCityList();
    }

    const updateCity = async (e) => {
        e.preventDefault();
        await axios.put(`/city/${id}`, updateCityDto);
        setShowUpdateCityModal(false);
        getCityList();
    }

    const deleteCity = async (delete_id) => {
        await axios.delete(`/city/${delete_id}`);
        getCityList();
    }

    useEffect(() => {
        getCityList()
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
                                cityList.map((city, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{city.name}</td>
                                        <td>
                                            <Link className="btn btn-secondary mx-2" to={`/city/${city.id}`} onClick={() => setShowUpdateCityModal(true)}>Güncelle</Link>
                                            <Link className="btn btn-danger mx-2" onClick={() => deleteCity(city.id)}>Sil</Link>
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
                <Modal.Body><CreateCityModal createCity={createCityDto} setCreateCity={setCreateCityDto} /></Modal.Body>
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
                <Modal.Body><UpdateCityModal updateCity={updateCityDto} setUpdateCity={setUpdateCityDto} /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateCityModal(false)}>İptal</Button>
                    <Button variant="success" onClick={updateCity}>Güncelle</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
