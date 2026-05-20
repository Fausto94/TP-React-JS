import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProductoDetalle.module.css'

const ProductoDetalle = () => {
    const { id } = useParams();

    const [producto, setProducto] = useState(null);

    const CompraClick = () => {
        // Quiero que se ejecute cuando le doy clic
        alert(`¡Agregaste ${nombre} al chango!`);
    };

    useEffect(() => {
        fetch('/data/productos.json')
            .then(response => response.json())
            .then(data => {
                const productoEncontrado = data.find(p => p.id === parseInt(id));
                setProducto(productoEncontrado);
            })
            .catch(error => console.error("Error al cargar el producto:", error));
    }, [id]);
    if (!producto) {
        return <h2>Cargando detalle del producto...</h2>;
    }
    if (!producto.id) {
        return <h2>Producto no encontrado.</h2>;
    }
    return (
        <div className={styles.producto}>
            <img src={producto.imagen} alt={producto.nombre} style={{maxWidth:'400px'}} />
            <div className={styles.descripcion}>
                <h2>Detalle del Producto: {producto.nombre}</h2>
                <h4>${producto.precio}</h4>
                <p>{producto.detalle}</p>
                <button onClick={CompraClick} className={styles.boton}>Comprar</button>
            </div>
        </div>
    );
};
export default ProductoDetalle;