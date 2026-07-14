// En src/componentes/ProductosNacionales/ProductosNacionalesDetalle.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Importaciones clave para obtener un solo documento
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import styles from './productosNacionales.module.css';

const ProductosNacionalesDetalle = () => {

    const [prod, setItem] = useState(null);

    const { id } = useParams(); //Tomamos el parámetro id
    
    useEffect(() => {
        if (id) {
            // Creamos la referencia al documento
            const docRef = doc(db, "Productos nacionales", id);
            getDoc(docRef)
                .then((resp) => {
                    if (resp.exists()) { // Verificamos si el documento existe
                        setItem({ ...resp.data(), id: resp.id });
                    } else {
                        console.log("No se encontró el producto");
                    }
                })
                .catch(error => console.log(error));
        }
    }, [id]);
    return (
        <div className={styles.CartaDetalle}>
            {prod ? (
                <p></p>// Reenderiza sus propiedades
            ) : (
                <p>Cargando producto...</p>
            )}
        </div >
    );
};

export default ProductosNacionalesDetalle;