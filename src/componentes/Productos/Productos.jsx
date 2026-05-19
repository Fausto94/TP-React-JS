// En /componentes/ItemListContainer/ItemListContainer.jsx
import React, { useState, useEffect } from 'react';
import ItemList from '../ItemList/Itemlist';
import styles from './Productos.module.css'

function ItemListContainer({ Mensaje }) {
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

    return (
        <div>
            <h2 className={styles.subtitulo}>{Mensaje}</h2>
            <div className={styles.productos}>
                <ItemList productos={productos} />
            </div>
        </div>
    );
}

export default ItemListContainer;