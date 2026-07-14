import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import styles from './GestionCupones.module.css';

const estadoInicial = {
    codigo: "",
    descuento: ""
};

const GestionCupones = () => {

    const [datosForm, setDatosForm] = useState(estadoInicial);
    const [cupones, setCupones] = useState([]);
    const [cuponAEditar, setCuponAEditar] = useState(null);

    // Cargar cupones
    const obtenerCupones = async () => {

        try {

            const respuesta = await getDocs(collection(db, "cupones"));

            const lista = respuesta.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setCupones(lista);

        } catch (error) {

            console.error("Error al obtener los cupones:", error);
            alert("Ocurrió un error al cargar los cupones.");

        }

    };

    useEffect(() => {
        obtenerCupones();
    }, []);

    // Manejo de los cambios en el formulario
    const manejarCambio = (e) => {
        const { name, value } = e.target;

        setDatosForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Crear o editar un cupón (CREATE o UPDATE)
    const manejarEnvio = async (e) => {

        e.preventDefault();

        if (!datosForm.codigo || !datosForm.descuento) {
            alert("Complete todos los campos");
            return;
        }

        if (cuponAEditar) {

            await updateDoc(
                doc(db, "cupones", cuponAEditar.id),
                {
                    codigo: datosForm.codigo,
                    descuento: Number(datosForm.descuento)
                }
            );

        } else {

            await addDoc(
                collection(db, "cupones"),
                {
                    codigo: datosForm.codigo,
                    descuento: Number(datosForm.descuento)
                }
            );

        }

        setDatosForm(estadoInicial);
        setCuponAEditar(null);

        obtenerCupones();

    };

    // Manejar Editar un cupón 
    const editarCupon = (cupon) => {

        setCuponAEditar(cupon);

        setDatosForm({
            codigo: cupon.codigo,
            descuento: String(cupon.descuento)
        });

    };

    // Eliminar un cupón (DELETE)
    const eliminarCupon = async (id) => {

        await deleteDoc(doc(db, "cupones", id));

        if (cuponAEditar?.id === id) {
            setCuponAEditar(null);
            setDatosForm(estadoInicial);
        }

        obtenerCupones();

    };

    // Cancelar edición
    const cancelarEdicion = () => {
        setCuponAEditar(null);
        setDatosForm(estadoInicial);
    };

    return (
        <div className={styles.cuponesPage}>

            <h2>⚜ Administración de Cupones</h2>

            <form className={styles.cuponesForm} onSubmit={manejarEnvio}>

                <input
                    type="text"
                    name="codigo"
                    placeholder="Código del cupón"
                    required
                    value={datosForm.codigo}
                    onChange={manejarCambio}
                />

                <input
                    type="number"
                    name="descuento"
                    placeholder="Descuento %"
                    min="1"
                    max="100"
                    required
                    value={datosForm.descuento}
                    onChange={manejarCambio}
                />

                <button type="submit">
                    {cuponAEditar ? "Actualizar Cupón" : "Crear Cupón"}
                </button>

                {
                    cuponAEditar &&
                    <button type="button" onClick={cancelarEdicion}>
                        Cancelar
                    </button>
                }
            </form>

            <hr className={styles.cuponDivider} />

            <h3>Listado de Cupones</h3>

            {cupones.map((cupon) => (
                <div key={cupon.id} className={styles.cuponCard}>
                    <div className={styles.cuponDatos}>
                        <p><strong>Código:</strong> {cupon.codigo}</p>
                        <p><strong>Descuento:</strong> {cupon.descuento}%</p>
                    </div>
                    <div className={styles.cuponBotones}>
                        <button onClick={() => editarCupon(cupon)} className={styles.botonEditar}>
                            Editar
                        </button>
                        <button onClick={() => eliminarCupon(cupon.id)} className={styles.botonEliminar}>
                            Eliminar
                        </button>
                    </div>
                </div>
            ))}

        </div>
    );
};

export default GestionCupones;