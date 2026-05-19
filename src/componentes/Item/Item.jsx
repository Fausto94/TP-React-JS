import styles from './Item.module.css'
import { useState } from 'react';

// En /componentes/Item/Item.jsx
// Recibe las props usando destructuring
export function Item({ imagen, nombre, precio, stock }) {
    
    // 1. Damos "memoria" al componente
    const [cantidad, setCantidad] = useState(0);

    // 2. Creamos la lógica de la acción
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

    const CompraClick = () => {
        // Quiero que se ejecute cuando le doy clic
        alert(`¡Agregaste ${nombre} al chango!`);
    };

    const [esFavorito, setEsFavorito] = useState(false)

    const marcarComoFavorito = () => {
        setEsFavorito(prev => !prev)
    };

    return (
        <div className={styles.card}>
            <img src={imagen} alt="producto" />
            <div className={styles.body}>
                <h3>{nombre}</h3>
                <p className={styles.precio}>Precio: ${precio}</p>
                <p className={styles.stock}>Stock disponible: {stock}</p>
                <button onClick={marcarComoFavorito} className={styles.favorito}>
                    {esFavorito ? '★' : '☆'}
                </button>
            </div>
            <button onClick={CompraClick} className={styles.boton}>Comprar</button>
            <div className={styles.contador}>
            <button onClick={decrementar} className={styles.boton}>-</button>
            <p className={styles.cantidad}>{cantidad}</p>
            <button onClick={incrementar} className={styles.boton}>+</button>
            </div>
        </div>
    );
}

export default Item;