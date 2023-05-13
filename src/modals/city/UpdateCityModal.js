import React from 'react'

/**
 * This function defines updating city modal
 */
export default function UpdateCityModal({ updateCity, setUpdateCity }) {

    //sets city parameters according to inputs
    const onCityChange = (e) => {
        setUpdateCity({ ...updateCity, [e.target.name]: e.target.value });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">İl Adı</label>
                            <input type={"text"} className="form-control" name="name" value={updateCity.name} onChange={(e) => onCityChange(e)} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
