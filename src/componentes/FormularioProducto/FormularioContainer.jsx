import React, { useState } from 'react';
import { FormularioProducto } from './FormularioProducto';

export function FormularioContainer() {
    const [datosForm, setDatosForm] = useState({
        nombre: '',
        mail: '',
        dni: '',
    });

    const [imagenFile, setImagenFile] = useState(null);

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };

    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0]);
    }

    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        // Validamos que el usuario haya seleccionado una imagen
        if (!imagenFile) {
            alert("Por favor, selecciona una imagen para el producto.");
            return;
        }

        // --- Lógica para subir la imagen a Imgbb ---
        const apiKey = 'a630b5f980f5187012290fa515d0c8fe'; // 🚨 ¡Reemplazá esto con tu clave!
        const formData = new FormData();
        formData.append('image', imagenFile);
        try {
            console.log("Subiendo imagen a Imgbb...");
            const respuestaImgbb = await
                fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formData,
                });
            const datosImgbb = await respuestaImgbb.json();
            if (datosImgbb.success) {
                console.log("Imagen subida con éxito. URL:", datosImgbb.data.url);
                // Unimos la URL de la imagen con el resto de los datos del formulario
                const productoCompleto = {
                    ...datosForm,
                    // Agregamos la URL obtenida
                    urlImagen: datosImgbb.data.url
                };
                // Por el momento hacemos un console.log
                console.log('Enviando los siguientes datos COMPLETOS a la API:',
                    productoCompleto);
            } else {
                throw new Error('La subida de la imagen a Imgbb falló.');
            }
        } catch (error) {
            console.error("Error en el proceso de envío:", error);
            alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo.");
        }
    };

    return (
        <FormularioProducto
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
            manejarCambioImagen={manejarCambioImagen}
        />
    )
}