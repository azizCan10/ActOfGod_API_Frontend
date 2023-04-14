import React, { useState } from 'react';
import axios from "axios";

import { Link} from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

    const [username, setUsername] = useState("")

    const onUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const [password, setPassword] = useState("")

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    //TODO API PATH WILL BE WRITTEN
    const login = async (username_, password_) => {

        await axios.post(`/`, null, { params: {
            username: username_,
            password: password_,
        }});
    }

    return (
        <div className="container">
            <div className="py-4">
                <div>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">Kullanıcı Adı</label>
                            <input type={"text"} className="form-control" name="userName" onChange={(e) => onUsernameChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Şifre</label>
                            <input type={"password"} className="form-control" name="password" onChange={(e) => onPasswordChange(e)} />
                        </div>
                        <div>
                            <Link className="btn btn-success mx-2" to={`/admin`} onClick={() => login(username, password)}>Giriş Yap</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
