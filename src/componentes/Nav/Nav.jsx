import styles from './Nav.module.css'
import { Link } from 'react-router-dom';

function Nav(){
    return(
        <>
        <nav>
            <ul>
                <li><Link to="/"> Inicio</Link></li>
                <li><Link to="/productos">Productos</Link></li>
                <li><Link to="/contacto">Contacto</Link></li>
                <li><Link to="/Sorteo">Sorteo</Link></li>
                <li><Link to="/carrito">Carrito</Link></li>
            </ul>
        </nav>
        </>
    )
}

export default Nav;