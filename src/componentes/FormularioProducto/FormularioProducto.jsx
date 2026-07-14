import React, { useEffect, useState } from "react";
import styles from "./FormularioProducto.module.css"

export function FormularioProducto({
    datosForm,
    manejarCambio,
    manejarEnvio,
    manejarCambioImagen,
    loading,
    modoEdicion,
    imagenFile
}) {
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        let objectUrl = null;
        if (imagenFile) {
            objectUrl = URL.createObjectURL(imagenFile);
            setPreview(objectUrl);
            return () => {
                if (objectUrl) URL.revokeObjectURL(objectUrl);
            };
        }

        // Si no hay archivo nuevo y estamos en edición, mostrar la URL existente
        if (modoEdicion && datosForm.imagen) {
            setPreview(datosForm.imagen);
        } else {
            setPreview(null);
        }
    }, [imagenFile, modoEdicion, datosForm.imagen]);
    return (
        <div className={styles.formContainer}>
            <form className={styles.formulario} onSubmit={manejarEnvio}>
                <h3>
                    {modoEdicion
                        ? "Editar Producto"
                        : "Agregar Nuevo Producto"}
                </h3>
                <div>
                    <label>Nombre del producto</label>
                    <input
                        type="text"
                        placeholder="Ej: Ballesta"
                        name="nombre"
                        value={datosForm.nombre}
                        onChange={manejarCambio}
                        required
                        minLength="3"
                    />
                </div>
                <div>
                    <label>Precio</label>
                    <input
                        type="number"
                        placeholder="Ej: 1500"
                        name="precio"
                        value={datosForm.precio}
                        onChange={manejarCambio}
                        required
                        min="1"
                        step="0.01"
                    />
                </div>
                <div>
                    <label>Stock</label>
                    <input
                        type="number"
                        placeholder="Ej: 67"
                        name="stock"
                        value={datosForm.stock}
                        onChange={manejarCambio}
                        required
                        min="1"
                        step="1"
                    />
                </div>
                <div>
                    <label>
                        Producto destacado
                        <input
                            type="checkbox"
                            name="destacado"
                            checked={Boolean(datosForm.destacado)}
                            onChange={manejarCambio}
                        />
                    </label>
                </div>
                <div>
                    <label>Detalle</label>
                    <textarea
                        placeholder="Descripción del producto"
                        name="detalle"
                        value={datosForm.detalle}
                        onChange={manejarCambio}
                        required
                        minLength="10"
                    />
                </div>
                <div>
                    <label>Categoría</label>
                    <input
                        type="text"
                        placeholder="Ej: Armas"
                        name="categoria"
                        value={datosForm.categoria}
                        onChange={manejarCambio}
                        required
                        minLength="3"
                    />
                </div>
                <div>
                    <label>URL de imagen</label>
                    <input
                        type="file"
                        placeholder="https://..."
                        onChange={manejarCambioImagen}
                        required={!modoEdicion}
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className={styles.preview}
                        />
                    )}
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    style={{ cursor: loading ? 'wait' : 'pointer' }}
                >
                    {loading
                        ? "Procesando..."
                        : modoEdicion
                            ? "Actualizar Producto"
                            : "Guardar Producto"}
                </button>
            </form>
        </div>
    );
}