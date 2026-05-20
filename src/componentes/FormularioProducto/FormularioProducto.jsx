import React from "react";
import styles from "./FormularioProducto.module.css"

export function FormularioProducto({ datosForm, manejarCambio, manejarEnvio, manejarCambioImagen }) {
    return (
        
        <form className={styles.formulario} onSubmit={manejarEnvio}>
            <h3>Participar en el sorteo</h3>
            <div>
                <label>Nombre completo</label>
                <input
                    type="text"
                    placeholder="Ej: Juan Perez"
                    name="nombre"
                    value={datosForm.nombre}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Gmail</label>
                <input
                    type="email"
                    placeholder="Ej: pepito@gmail.com"
                    name="precio"
                    value={datosForm.precio}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>DNI:</label>
                <input
                    type="number"
                    placeholder="Ej: 4444-4444"
                    name="stock"
                    value={datosForm.stock}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Foto:</label>
                <input
                    type="file"
                    placeholder="https://..."
                    onChange={manejarCambioImagen}
                />
            </div>
            <button type="submit">Enviar</button>
        </form>
    );
}