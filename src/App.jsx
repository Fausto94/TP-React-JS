import './App.css'

import Saludar from './Saludar.jsx';
import CuerpoPosteo from './CuerpoPosteo.jsx';
import { Layout } from './componentes/Layout/Layout.jsx';
import Asistente from './Asistente';
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer';
import { Contador } from './componentes/Contador/Contador.jsx';
import Productos from './componentes/Productos/Productos.jsx';
import { FormularioContainer } from './componentes/FormularioProducto/FormularioContainer.jsx';
import { Routes, Route } from 'react-router-dom';
import NosotrosListContainer from './componentes/NosotrosListContainer/NosotrosListContainer.jsx';
import Cart from './componentes/Cart/Cart.jsx';

function App() {
  const asistentes = [ { nombre: 'Juan Pérez', tarea: 'Frontend Developer', emoji: '👨‍💻' },
  { nombre: 'Ana Gómez', tarea: 'Diseñadora UX/UI', emoji: '🎨' },
  { nombre: 'Carlos Ruiz', tarea: 'Backend Developer', emoji: '👩‍💻' }];
  
  return (
    <>
    {/*<Contador/>*/}
    {/**/}
    {/**/}
    <Layout>
      <h1>¡Bienvenidos a mi página!</h1>
      <p>Este es el contenido principal.</p>
      <Productos Mensaje="Nuestro productos destacados"/>
      <FormularioContainer/>
      <Cart/>
    </Layout>
    
    {/*
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<h1>Página de Inicio</h1>} />
        <Route path="/productos" element={<Productos Mensaje={"Todos los productos"}/>} />
        <Route path="/contacto" element={<NosotrosListContainer/>} />
        <Route path="/cart" element={<Cart/>} />
      </Route>
    </Routes>
    */}
    </>
  )
}
export default App;
