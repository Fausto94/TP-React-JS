import styles from './NosotrosItem.module.css'
import { useState } from 'react';

export function NosotrosItem({ imagen, nombre, email, puesto }) {
    return (
        <div className={styles.card}>
            <img src={imagen} alt="producto" />
            <div className={styles.cuerpo}>
                <p className={styles.nombre}>{nombre}</p>
                <p className={styles.email}>{email}</p>
                <p className={styles.puesto}>Puesto: {puesto}</p>
            </div>
        </div>
    );
}

export default NosotrosItem;