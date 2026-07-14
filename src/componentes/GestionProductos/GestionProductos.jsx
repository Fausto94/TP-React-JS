// src/componentes/Gestion/Gestion.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { FormularioContainer } from '../FormularioProducto/FormularioContainer.jsx';
import { getFirestore, collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore";
import styles from './GestionProductos.module.css';
import { FormularioProducto } from '../FormularioProducto/FormularioProducto.jsx';

const Gestion = () => {
    const [productos, setProductos] = useState([]);

    const estadoInicialForm = {
        id: '',
        nombre: '',
        precio: '',
        stock: '',
        imagen: '',
        destacado: false,
        detalle: '',
        categoria: ''
    };

    const [datosForm, setDatosForm] = useState(estadoInicialForm);
    const [imagenFile, setImagenFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [productoAEditar, setProductoAEditar] = useState(null);

    const manejarCambio = (e) => {
        setDatosForm({
            ...datosForm,
            [e.target.name]: e.target.value
        });
    };

    const manejarCambioImagen = (e) => {
        setImagenFile(e.target.files[0]);
    };

    const cargarProductos = async () => {
        const productosRef = collection(db, "productos");
        const resp = await getDocs(productosRef);
        setProductos(
            resp.docs.map((doc) => ({ ...doc.data(), idFirestore: doc.id }))
        );
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const handleDelete = async (id) => {
        const confirmacion = window.confirm("¿Está seguro de que desea eliminar este producto?");
        //const confirmacion = true;
        if (confirmacion) {
            const docRef = doc(db, "productos", id);
            await deleteDoc(docRef);
            // Actualizamos el estado local para reflejar el cambio en la UI inmediatamente.
            setProductos(productos.filter(prod => prod.id !== id));
            alert("Producto eliminado.");
        }
    };

    const manejarEditar = (producto) => {
        setProductoAEditar(producto);
        setDatosForm(producto);
    };

    const modoEdicion = productoAEditar !== null;


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

        if (!imagenFile && !productoAEditar) {
            alert("Por favor, selecciona una imagen.");
            return;
        }


        let urlImagen = datosForm.imagen;

        try {
            setLoading(true);
            await new Promise((resolve) =>
                setTimeout(resolve, 1000)
            );

            if (imagenFile) {

                console.log("Subiendo imagen a Imgbb...");

                const apiKey = 'a630b5f980f5187012290fa515d0c8fe';
                const formData = new FormData();
                formData.append('image', imagenFile);

                const respuestaImgbb = await
                    fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                        method: 'POST',
                        body: formData,
                    });

                const datosImgbb = await respuestaImgbb.json();

                if (datosImgbb.success) {
                    console.log("Imagen subida con éxito. URL:", datosImgbb.data.url);
                    urlImagen = datosImgbb.data.url;
                } else {
                    throw new Error('La subida de la imagen a Imgbb falló.');
                }
            }

            const productoCompleto = {
                ...datosForm,
                imagen: urlImagen,
            };

            if (modoEdicion && productoAEditar) {
                const docRef = doc(db, "productos", productoAEditar.idFirestore);
                await updateDoc(docRef, productoCompleto);
                setProductoAEditar(null);
            } else {
                const productosCollection = collection(db, "productos");
                await addDoc(productosCollection, productoCompleto);
            }

            await cargarProductos();
            
            alert('Producto enviado correctamente.');

            setDatosForm(estadoInicialForm);
            setImagenFile(null);

        } catch (error) {
            console.error("Error en el proceso de envío:", error);
            alert("Hubo un error al guardar el producto. Por favor, intentá de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <h2>Gestión de Productos</h2>
            <hr />
            <FormularioProducto
                datosForm={datosForm}
                manejarCambio={manejarCambio}
                manejarCambioImagen={manejarCambioImagen}
                manejarEnvio={manejarEnvio}
                modoEdicion={modoEdicion}
                loading={loading}
                imagenFile={imagenFile}
            />
            <hr />
            <div className={styles.lista}>
                <h3>Lista de Productos</h3>
                <ul className={styles.listaProductos}>
                    {productos.map((prod) => (
                        <li key={prod.id}>
                            {prod.nombre} - ${prod.precio}
                            <div className={styles.botonesGestion}>
                                <button onClick={() => manejarEditar(prod)} className={styles.botonEditar}>
                                    Editar
                                </button>
                                <button onClick={() => handleDelete(prod.id)} className={styles.botonEliminar}>
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default Gestion;