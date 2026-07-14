import React, { useState, useEffect } from 'react';
import ItemList from '../ItemList/ItemList';
import styles from './Productos.module.css'

function Productos({ Mensaje, Destacados }) {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch('/data/productos.json')
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error('No se pudo cargar la información de los productos');
                }
                return respuesta.json();
            })
            .then((datos) => {
                setProductos(datos);
                console.log("productos obtenidos de la api");
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setCargando(false);
            });
    }, []);

    if (cargando) {
        return <p>Cargando productos, por favor espere...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }

    const productosAMostrar = Destacados ? productos.filter(producto => producto.destacado) : productos;

    return (
        <div>
            <h3 className={styles.subtitulo}>{Mensaje}</h3>
            <div className={styles.productos}>
                <ItemList productos={productosAMostrar} />
            </div>
        </div>
    );
}

export default Productos;