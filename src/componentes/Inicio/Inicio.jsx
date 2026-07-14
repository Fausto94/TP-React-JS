import Productos from '../Productos/Productos.jsx';
import styles from './Inicio.module.css'
import { Link } from 'react-router-dom';

function Inicio() {
    return (
        <>
            <div className={styles.bienvenido}>
                <h4>Bienvenido a La Taverna de Runko</h4><br />
                <p>Donde los héroes se equipan y las leyendas comienzan.</p>
                <p>Entre nuestras paredes encontrarás espadas forjadas por maestros herreros, arcos precisos como la mirada de un elfo y armaduras capaces de resistir el aliento de un dragón.</p>
                <p>Ya seas un mercenario en busca de acero, un explorador preparando su próxima expedición o un aventurero novato dando sus primeros pasos, en La Taverna de Runko siempre habrá un lugar junto al fuego y el equipo que necesitás para sobrevivir al camino.</p>
                <div className={styles.botonRegistro}>
                    <p className={styles.registro}>¿No tenés una cuenta?</p>
                    <Link to="/registro">Registrate aquí</Link>
                </div>
            </div>
            <Productos Mensaje={"Productos destacados"} Destacados={true} />
        </>
    );
}
export default Inicio;