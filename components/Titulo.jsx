import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.css'
import styles from '../styles/Navbar.module.css';

export default function Titulo() {
    return (
        <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
            <div className="container">
                <Link className="navbar-brand" href="/">
                    <img src="../s.png" alt="Logo" width="72" height="60" className="d-inline-block align-text-top" />
                    <h2 className={`${styles.title} ${styles.ms20}`}>Sistema de controle de horarios Escalente</h2>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <Link className="nav-link " aria-current="page" href="#">Expediente</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/cadastro">Turno</Link>
                        </li>
                        <li className="nav-item">
                            <Link class="nav-link" href="#">Operacional</Link>
                        </li>
                    </ul>
                </Link>
            </div>
        </nav>
    )
}