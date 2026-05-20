import { NosotrosItem } from "../NosotrosItem/NosotrosItem.jsx";
import styles from './NosotrosList.module.css'

export function NosotrosList({ empleado }) {
    return (
        <div className={styles.cajas}>
            {empleado.map(emp => (
                <NosotrosItem key={emp.id} {...emp} />
            ))}
        </div>
    );
}

export default NosotrosList;