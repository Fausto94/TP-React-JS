import React, { useState, useEffect } from 'react';
import NosotrosList from '../NosotrosList/NosotrosList';
import styles from './NosotrosListContainer.module.css'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

function NosotrosListContainer({ Mensaje }) {

    const [empleado, setEmpleado] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarEmpleado = async () => {
            try {
                const empleadosDB = collection(db, 'equipo');
                const resp = await getDocs(empleadosDB);

                setEmpleado(
                    resp.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                );
            } catch (err) {
                console.error(err);
                setError('No se pudieron cargar los Empleados desde Firestore.');
            } finally {
                setCargando(false);
            }
        };
        cargarEmpleado();
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