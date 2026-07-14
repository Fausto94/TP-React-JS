import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import styles from './ProductoDetalle.module.css'

const ProductoDetalle = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState(0);
    const [esFavorito, setEsFavorito] = useState(false);

    const { addToCart, getCantidadActual } = useCart();

    useEffect(() => {
        if (!id) return;

        const docRef = doc(db, "productos", id);

        getDoc(docRef)
            .then((resp) => {
                if (resp.exists()) {
                    setProducto({
                        ...resp.data(),
                        id: resp.id,
                    });
                } else {
                    setProducto(false);
                }
            })
            .catch((error) => {
                console.error("Error al cargar el producto:", error);
                setProducto(false);
            });
    }, [id]);

    const incrementar = () => {
        if (cantidad < producto.stock) {
            setCantidad(cantidad + 1);
        }
    };

    const decrementar = () => {
        if (cantidad > 0) {
            setCantidad(cantidad - 1);
        }
    };

    const handleAddToCart = () => {
        if (cantidad > 0 && producto) {
            const productoParaCarrito = { ...producto, id: producto.id || producto.idFirestore };
            addToCart(productoParaCarrito, cantidad);
            alert(`Agregaste ${cantidad} unidades de ${producto.nombre} al carrito.`);
        }
    };

    const marcarComoFavorito = () => {
        setEsFavorito(prev => !prev);
    };

    if (!producto) {
        return <h2>Cargando detalle del producto...</h2>;
    }

    const productoId = producto.id || producto.idFirestore;

    if (!productoId) {
        return <h2>Producto no encontrado.</h2>;
    }

    const cantidadActual = getCantidadActual(productoId);
    return (
        <div className={styles.producto}>
            <img src={producto.imagen} alt={producto.nombre} style={{ maxWidth: '400px' }} />
            <div className={styles.descripcion}>
                <h2>Detalle del Producto: {producto.nombre}</h2>
                <h3>Categoría: {producto.categoria}</h3>
                <h4>${producto.precio}</h4>
                <p>{producto.detalle}</p>
                <p className={styles.stock}>Stock disponible: {producto.stock}</p>
                <button onClick={marcarComoFavorito} className={styles.favorito}>
                    {esFavorito ? '★' : '☆'}
                </button>
                <div className={styles.contador}>
                    <button onClick={decrementar} className={styles.boton}>-</button>
                    <p className={styles.cantidad}>{cantidad}</p>
                    <button onClick={incrementar} className={styles.boton}>+</button>
                </div>
                <h5 className={styles.cantidadActual}>Agregaste {cantidadActual} al Carrito</h5>
                <button onClick={handleAddToCart} className={styles.boton}>Agregar {cantidad} al carrito</button>
            </div>
        </div>
    );
};
export default ProductoDetalle;