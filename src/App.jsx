import './App.css'

import Saludar from './Saludar.jsx';
import CuerpoPosteo from './CuerpoPosteo.jsx';
import { Layout } from './componentes/Layout/Layout.jsx';
import Asistente from './Asistente';
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer.jsx';
import { Contador } from './componentes/Contador/Contador.jsx';
import Productos from './componentes/Productos/Productos.jsx';
import { Routes, Route } from 'react-router-dom';
import NosotrosListContainer from './componentes/NosotrosListContainer/NosotrosListContainer.jsx';
import Cart from './componentes/Cart/Cart.jsx';
import Inicio from './componentes/Inicio/Inicio.jsx';
import ProductoDetalle from './componentes/ProductoDetalle/ProductoDetalle.jsx';
import Login from './componentes/Login/Login.jsx';
import ProductosDB from './componentes/ProductosDB/ProductosDB.jsx';
import Gestion from './componentes/GestionProductos/GestionProductos.jsx';
import GestionCupones from './componentes/GestionCupones/GestionCupones.jsx';
import Registro from './componentes/Registro/Registro.jsx';
import ProtectedRoute from './componentes/ProtectedRoute/ProtectedRoute.jsx';

function App() {
  return (
    <>

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos Mensaje={"Todos los productos"} />} />
          <Route path="/contacto" element={<NosotrosListContainer Mensaje={"Conoce a nuestro equipo"} />} />
          <Route
            path="/gestion"
            element={
              <ProtectedRoute rolesPermitidos={['admin']}>
                <Gestion />
              </ProtectedRoute>
            }
          />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
          <Route path="/productosdb" element={<ProductosDB />} />
          <Route
            path="/admin/cupones"
            element={
              <ProtectedRoute rolesPermitidos={['admin']}>
                <GestionCupones />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Route>
      </Routes >
    </>
  )
}
export default App;