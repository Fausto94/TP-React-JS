import styles from './Footer.module.css'
import NosotrosListContainer from '../NosotrosListContainer/NosotrosListContainer';

function Footer() {  
    return (  
        <footer className={styles.footer}>  
            <NosotrosListContainer Mensaje={"Nosotros"}/>
            <p>&copy; 2025 - Mi Aplicación React</p>
        </footer>  
    );  
}  
export default Footer;  