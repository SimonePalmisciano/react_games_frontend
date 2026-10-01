import { NavLink } from "react-router";

function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg shadow-sm">
                <div className="container">
                    {/* Logo o Brand del sito */}
                    <NavLink className="navbar-brand fw-bold" to="/">
                        <img src="/Logo.png" alt="" />
                    </NavLink>

                    {/* Pulsante Hamburger per dispositivi mobili */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mainNavbar"
                        aria-controls="mainNavbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mainNavbar">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/videogames">
                                    Catalogo
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}
export default Header