import styles from './Header.module.css'
import Nav from '../Nav/Nav';

function Header() {  
    return (
        <>
        <header className={styles.header}>
            <i>La taverna de Runko</i>
            <Nav/>
        </header>
        </>
    );  
}  
export default Header;