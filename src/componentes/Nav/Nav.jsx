import styles from './Nav.module.css'
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Nav() {
    const { getCartQuantity } = useCart();
    const totalItems = getCartQuantity();
    const { user, logout } = useContext(AuthContext);
    const isAdmin = user?.rol === 'admin';

    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/"> Inicio</Link></li>
                    <li><Link to="/productos">Productos</Link></li>
                    <li><Link to="/productosdb">Productosdb</Link></li>
                    <li><Link to="/contacto">Contacto</Link></li>
                    <li><Link to="/carrito">Carrito 🛒 {totalItems > 0 && <span>{totalItems}</span>}</Link></li>
                    {user ? (
                        <>
                            {isAdmin && (
                                <>
                                    <li><Link to="/gestion">Gestión Productos</Link></li>
                                    <li><Link to="/admin/cupones">Gestión de Cupones</Link></li>
                                </>
                            )}
                            <div className={styles.userContainer}>
                                <span className={styles.user}>¡Hola, {user.email}!</span>
                                <button onClick={logout} className={styles.buttonLogout}>Cerrar Sesión</button>
                            </div>
                        </>
                    ) : (
                        <li><Link to="/login">Login</Link></li>
                    )}
                </ul>
            </nav>
        </>
    )
}

export default Nav;