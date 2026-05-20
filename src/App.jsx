import './App.css'

import Saludar from './Saludar.jsx';
import CuerpoPosteo from './CuerpoPosteo.jsx';
import { Layout } from './componentes/Layout/Layout.jsx';
import Asistente from './Asistente';
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer.jsx';
import { Contador } from './componentes/Contador/Contador.jsx';
import Productos from './componentes/Productos/Productos.jsx';
import { FormularioContainer } from './componentes/FormularioProducto/FormularioContainer.jsx';
import { Routes, Route } from 'react-router-dom';
import NosotrosListContainer from './componentes/NosotrosListContainer/NosotrosListContainer.jsx';
import Cart from './componentes/Cart/Cart.jsx';
import Inicio from './componentes/Inicio/Inicio.jsx';
import ProductoDetalle from './componentes/ProductoDetalle/ProductoDetalle.jsx';

function App() {
  return (
    <>
      {/*<Contador/>*/}
      {/*<FormularioContainer/>*/}
      {/*
    <Layout>
      <h1>¡Bienvenidos a mi página!</h1>
      <p>Este es el contenido principal.</p>
      <Productos Mensaje="Nuestro productos destacados"/>
      <Cart/>
    </Layout>
    */}

      {/**/}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos Mensaje={"Todos los productos"} />} />
          <Route path="/contacto" element={<NosotrosListContainer />} />
          <Route path="/sorteo" element={<FormularioContainer />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="*" element={<h1>404 - Página no encontrada</h1>}
          />
        </Route>
      </Routes>

    </>
  )
}
export default App;
