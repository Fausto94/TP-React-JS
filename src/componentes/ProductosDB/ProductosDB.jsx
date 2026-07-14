import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import ItemList from '../ItemList/ItemList';
import styles from './ProductosDB.module.css';

const ProductosDB = () => {

    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const productosDB = collection(db, 'productos');
                const resp = await getDocs(productosDB);

                setProductos(
                    resp.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                );
            } catch (err) {
                console.error(err);
                setError('No se pudieron cargar los productos desde Firestore.');
            } finally {
                setCargando(false);
            }
        };
        cargarProductos();
    }, []);

    if (cargando) {
        return <p>Cargando productos...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h3 className={styles.subtitulo}> Prroductos desde Base de Datos</h3>
            <div className={styles.productos}>
                <ItemList productos={productos} />
            </div>
        </div>
    );
};

export default ProductosDB;