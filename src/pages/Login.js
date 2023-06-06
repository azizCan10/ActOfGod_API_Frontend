import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

/**
 * This is Login Page
 */
export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }


    const login = () => {
        if(username==='admin' && password==='admin'){
            window.location.href = '/location';
        }else{
            alert("Hatalı giriş.");
        } 
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
                            <Link className="btn btn-success mx-2" onClick={login}>Giriş Yap</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
