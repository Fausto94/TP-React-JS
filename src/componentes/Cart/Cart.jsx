// src/components/Cart/Cart.jsx
import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import styles from './Cart.module.css'

const Cart = () => {

    const { cart, clearCart, getCartTotal, removeItem } = useCart();

    if (cart.length === 0) {
        return (
            <div className={styles.CartVacio}>
                <h1>El carrito está vacío</h1>
                <p>Agrega productos para continuar la compra.</p>
                <Link to="/productos" className="btn-volver">
                    Ver Productos
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.CartContainer}>
            <h1>Carrito de compras</h1>

            {cart.map(item => (
                <div key={item.id} className={styles.CartItem}>
                    <div className={styles.CartItemDesc}>
                        <h4>{item.nombre}</h4>
                        <p>Cantidad: {item.quantity} · Precio unitario: ${item.precio}</p>
                        <button className={styles.botonEliminar} onClick={() => removeItem(item.id)}>
                            🗑️Eliminar
                        </button>
                    </div>
                    <div className={styles.CartItemSubtotal}>
                        ${item.precio * item.quantity}
                    </div>
                </div>
            ))}

            <hr className={styles.separador} />

            <h3 className={styles.total}>
                <p>Total a pagar</p>
                <span>${getCartTotal()}</span>
            </h3>

            <div className={styles.cartActions}>
                <button className={styles.botonVaciar} onClick={clearCart}>
                    Vaciar carrito
                </button>
                <Link to="/" onClick={() => { alert("Gracias por comprar"), clearCart() }} className={styles.botonFinalizar}>
                    Finalizar compra →
                </Link>
            </div>
        </div>
    );
};
export default Cart;