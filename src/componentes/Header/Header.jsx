import styles from './Header.module.css'
import Nav from '../Nav/Nav';

function Header() {  
    return (
        <>
        <header className={styles.header}>
            <h1>La taverna de Runko</h1>
            <Nav/>
        </header>

        {/*<button className="miBoton">momomo</button>*/}
        </>
    );  
}  
export default Header;