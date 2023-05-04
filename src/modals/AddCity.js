import React from 'react'

export default function AddCity({ createCity, setCreateCity }) {
    
    const onInputChange = (e) => {
        setCreateCity({ ...createCity, [e.target.name]: e.target.value });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">İl Adı</label>
                            <input type={"text"} className="form-control" name="name" value={createCity.name} onChange={(e) => onInputChange(e)} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
