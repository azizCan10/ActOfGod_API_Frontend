import React, { useState, useEffect } from 'react'

import axios from "axios";

export default function AddDistrict({ createDistrict, setCreateDistrict }) {

    const onInputChange = (e) => {
        setCreateDistrict({ ...createDistrict, [e.target.name]: e.target.value });
        console.log(createDistrict)
    }

    /* loading cities into table */
    const [cities, setCities] = useState([])

    const loadCities = async () => {
        const result = await axios.get("/city")
        setCities(result.data);
    }
    /* ---------------------------- */

    useEffect(() => {
        loadCities()
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">İlçe Adı</label>
                            <input type={"text"} className="form-control" name="name" value={createDistrict.name} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cityId" className="form-label">İl Adı</label>
                            <select class="form-select" id="exampleFormControlSelect1" name="cityId" onChange={(e) => onInputChange(e)}>
                                {cities.map((city) => (
                                    <option value={city.id}>{city.name}</option>
                                ))}
                            </select>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
