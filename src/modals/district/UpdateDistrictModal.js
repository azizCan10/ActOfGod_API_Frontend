import React, { useState, useEffect } from 'react'

import axios from "axios";

/**
 * This function defines updating district modal
 */
export default function UpdateDistrictModal({ updateDistrict, setUpdateDistrict }) {

    //sets district parameters according to inputs
    const onDistrictChange = (e) => {
        setUpdateDistrict({ ...updateDistrict, [e.target.name]: e.target.value });
    }

    //city list
    const [cityList, setCityList] = useState([])

    const getCityList = async () => {
        const result = await axios.get("/city")
        setCityList(result.data);
    }

    useEffect(() => {
        getCityList()
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">İlçe Adı</label>
                            <input type={"text"} className="form-control" name="name" value={updateDistrict.name} onChange={(e) => onDistrictChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cityId" className="form-label">İl Adı</label>
                            <select class="form-select" id="exampleFormControlSelect1" name="cityId" onChange={(e) => onDistrictChange(e)}>
                                {cityList.map((city) => (
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
