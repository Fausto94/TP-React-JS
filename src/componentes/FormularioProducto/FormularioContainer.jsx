import React, { useState } from 'react';
import { FormularioProducto } from './FormularioProducto.jsx';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export function FormularioContainer() {
    const [datosForm, setDatosForm] = useState({
        nombre: '',
        precio: '',
        stock: '',
        imagen: '',
        destacado: false,
        detalle: '',
        categoria: ''
    });

    const [imagenFile, setImagenFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const manejarCambio = (evento) => {
        const { name, value, type, checked } = evento.target;
        setDatosForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0]);
    }

    const manejarEnvio = async (evento) => {
        evento.preventDefault();

        const nombre = datosForm.nombre.trim();
        const detalle = datosForm.detalle.trim();
        const categoria = datosForm.categoria.trim();
        const precio = Number(datosForm.precio);
        const stock = Number(datosForm.stock);

        if (!nombre || !detalle || !categoria) {
            alert('Completá todos los campos obligatorios.');
            return;
        }

        if (Number.isNaN(precio) || precio <= 0) {
            alert('El precio debe ser mayor a 0.');
            return;
        }

        if (Number.isNaN(stock) || stock <= 0 || !Number.isInteger(stock)) {
            alert('El stock debe ser un número entero mayor a 0.');
            return;
        }

        if (!imagenFile) {
            alert("Por favor, selecciona una imagen para el producto.");
            return;
        }

        const apiKey = 'a630b5f980f5187012290fa515d0c8fe';
        const formData = new FormData();
        formData.append('image', imagenFile);
        try {
            setLoading(true);
            await new Promise((resolve) =>
                setTimeout(resolve, 1000)
            );

            console.log("Subiendo imagen a Imgbb...");
            const respuestaImgbb = await
                fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formData,
                });
            const datosImgbb = await respuestaImgbb.json();

            if (datosImgbb.success) {

                console.log("Imagen subida con éxito. URL:", datosImgbb.data.url);
                const productoCompleto = {
                    ...datosForm,
                    nombre,
                    detalle,
                    categoria,
                    precio,
                    stock,
                    imagen: datosImgbb.data.url
                };

                const db = getFirestore();
                const productosCollection = collection(db, "productos");
                await addDoc(productosCollection, productoCompleto);

                setDatosForm({
                    nombre: '',
                    precio: '',
                    stock: '',
                    imagen: '',
                    destacado: false,
                    detalle: '',
                    categoria: ''
                });
                setImagenFile(null);
                alert('Producto enviado correctamente.');
            } else {
                throw new Error('La subida de la imagen a Imgbb falló.');
            }
        } catch (error) {
            console.error("Error en el proceso de envío:", error);
            alert("Hubo un error al guardar el producto. Por favor, intentá de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormularioProducto
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
            manejarCambioImagen={manejarCambioImagen}
            loading={loading}
        />
    )
}