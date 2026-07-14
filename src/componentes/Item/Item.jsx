import styles from './Item.module.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

// En /componentes/Item/Item.jsx
// Recibe las props usando destructuring
export function Item({ id, imagen, nombre, precio, stock }) {

    const producto = { id, nombre, precio, stock, imagen };

    const [cantidad, setCantidad] = useState(0);

    const incrementar = () => {
        if (cantidad < stock) {
            setCantidad(cantidad + 1);
        }
    };
    const decrementar = () => {
        if (cantidad > 0) {
            setCantidad(cantidad - 1);
        }
    };

    const { addToCart, getCantidadActual } = useCart();
    const cantidadActual = getCantidadActual(producto.id)

    const handleAddToCart = () => {
        if (cantidad > 0) {
            addToCart(producto, cantidad);
            alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`);
        }
    };

    const [esFavorito, setEsFavorito] = useState(false)

    const marcarComoFavorito = () => {
        setEsFavorito(prev => !prev)
    };

    return (
        <div className={styles.card}>
            <Link to={`/producto/${producto.id}`} className={styles.link}>
                <img src={imagen} alt="producto" />
            </Link>
            <div className={styles.body}>
                <h3>{producto.nombre}</h3>
                <p className={styles.precio}>Precio: ${producto.precio}</p>
                <p className={styles.stock}>Stock disponible: {producto.stock}</p>
                <button onClick={marcarComoFavorito} className={styles.favorito}>
                    {esFavorito ? '★' : '☆'}
                </button>
            </div>
            <button onClick={handleAddToCart} className={styles.boton}>Agregar {cantidad} al carrito</button>
            <h5 className={styles.cantidadActual}>Agregaste {cantidadActual} al Carrito</h5>
            <div className={styles.contador}>
                <button onClick={decrementar} className={styles.boton}>-</button>
                <p className={styles.cantidad}>{cantidad}</p>
                <button onClick={incrementar} className={styles.boton}>+</button>
            </div>
        </div>
    );
}

export default Item;