import React from 'react'

/**
 * This is the navbar section
 */
export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/location">Konum</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Çıkış Yap</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
