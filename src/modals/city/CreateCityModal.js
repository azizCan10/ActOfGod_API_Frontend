import React from 'react'

/**
 * This function defines adding city modal
 */
export default function CreateCityModal({ createCity, setCreateCity }) {

    //sets city parameters according to inputs
    const onCityChange = (e) => {
        setCreateCity({ ...createCity, [e.target.name]: e.target.value });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">İl Adı</label>
                            <input type={"text"} className="form-control" name="name" value={createCity.name} onChange={(e) => onCityChange(e)} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
