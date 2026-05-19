// En src/componentens/FormularioProducto/FormularioProducto
import React from "react";
// Por ahora, es un componente súper simple. Solo muestra el HTML.
export function FormularioProducto({ datosForm, manejarCambio, manejarEnvio, manejarCambioImagen }) {
    const formStyle = {
        display: "flex",
        flexDirection: "column",
        maxWidth: "24rem",
        margin: "3rem auto",
        padding: "1.5rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        gap: "16px",
    };
    return (
        /*
        <form style={formStyle}>
            <h3>Agregar Nuevo Producto</h3>
            <div>
                <label>Nombre del Producto:</label>
                <input type="text" placeholder="Ej: Mangual" />
            </div>
            <div>
                <label>Precio:</label>
                <input type="number" placeholder="Ej: 95" />
            </div>
            <div>
                <label>Stock:</label>
                <input type="number" placeholder="Ej: 5" />
            </div>
            <div>
                <label>Imagen:</label>
                <input type="file" placeholder="https://..." />
            </div>
            <button type="submit">Guardar Producto</button>
        </form>
        */

        <form style={formStyle} onSubmit={manejarEnvio}>
            <h3>Agregar Nuevo Producto</h3>
            <div>
                <label>Nombre del Producto:</label>
                <input
                    type="text"
                    placeholder="Ej: Espada"
                    name="nombre"
                    value={datosForm.nombre}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Precio: $</label>
                <input
                    type="number"
                    placeholder="Ej: 95"
                    name="precio"
                    value={datosForm.precio}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Stock:</label>
                <input
                    type="number"
                    placeholder="Ej: 5"
                    name="stock"
                    value={datosForm.stock}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Imagen:</label>
                <input
                    type="file"
                    placeholder="https://..."
                    onChange={manejarCambioImagen}
                />
            </div>
            <button type="submit">Guardar Producto</button>
        </form>

    );
}