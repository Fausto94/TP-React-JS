// En /components/Layout/Layout.jsx
import styles from './Layout.module.css'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

// Todo lo que pongamos dentro de <Layout> en App.jsx será el "children".
export function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        {children}
        <Outlet/>
      </main>
      <Footer />
    </div>
    );
}