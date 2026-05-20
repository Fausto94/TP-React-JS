// En /componentes/ItemListContainer/ItemListContainer.jsx
import { ItemList } from "../ItemList/Itemlist";
import styles from './ItemListContainer.module.css';

function ItemListContainer({ Mensaje }) {
    const productos = [
        { id: '1234', imagen:'/images/CamaraInstantanea.jpg', nombre: 'Camara Instantánea', precio: 12000, stock: 15 },
        { id: '2344', imagen:'/images/MonitorCurvo.jpg', nombre: 'Monitor Curvo', precio: 450000, stock: 25 },
        { id: '2545', imagen:'/images/CamaraNikon.jpg', nombre: 'Camara Nikon', precio: 15000, stock: 50 },
    ];

    return (
        <div>
            <h2 className={styles.subtitulo}>{Mensaje}</h2>
            <div className={styles.productos}>
                <ItemList productos={productos} />
            </div>
        </div>
    );
}

export default ItemListContainer;