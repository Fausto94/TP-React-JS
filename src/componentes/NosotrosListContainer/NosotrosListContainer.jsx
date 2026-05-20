import React, { useState, useEffect } from 'react';
import NosotrosList from '../NosotrosList/NosotrosList';
import styles from './NosotrosListContainer.module.css'

function NosotrosListContainer({ Mensaje }) {
    const [empleado, setEmpleado] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch('/data/nosotros.json')
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error('No se pudo cargar la información de los empleado');
                }
                return respuesta.json();
            })
            .then((datos) => {
                setEmpleado(datos);
                console.log("empleado obtenidos de la api");
            })
            .catch((error) => {
                setError(error.message);
                console.log("hubo un error en la carga de datos")
            })
            .finally(() => {
                setCargando(false);
            });
    }, []);

    if (cargando) {
        return <p>Cargando empleado, por favor espere...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <p className={styles.subtitulo}>{Mensaje}</p>
            <div className={styles.empleados}>
                <NosotrosList empleado={empleado} />
            </div>
        </div>
    );
}

export default NosotrosListContainer;