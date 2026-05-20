import styles from './Footer.module.css'
import NosotrosListContainer from '../NosotrosListContainer/NosotrosListContainer';

function Footer() {
    return (
        <footer className={styles.footer}>
            <NosotrosListContainer Mensaje={"Nosotros"} />
            <p>
                Forjando el equipo de los aventureros desde tiempos olvidados.
                Equipamiento para quienes se atreven a explorar lo desconocido.
            </p>
            <p>© 2026 La Taverna de Runko - Todos los derechos reservados.</p>
        </footer>
    );
}
export default Footer;  