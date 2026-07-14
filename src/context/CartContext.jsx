import React, { useState, useContext, createContext } from 'react';

export const CartContext = createContext();

//Consumidor
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};

//Proveedor
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product, quantity) => {
        const itemInCart = cart.find(item => item.id === product.id);
        if (itemInCart) {
            const updatedCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
            setCart(updatedCart);
        } else {
            setCart(prevCart => [...prevCart, { ...product, quantity }]);
        }
    };
    
    const removeItem = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
    };

    const clearCart = () => {
        setCart([]);
    };

    //cantidad total
    const getCartQuantity = () => {
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    };

    //Precio total
    const getCartTotal = () => {
        return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
    };

    //Obtener la cantidad de un item específico
    const getCantidadActual = (productId) => {
        const item = cart.find(item => item.id === productId);
        return item ? item.quantity : 0;
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeItem,
            clearCart,
            getCartQuantity,
            getCartTotal,
            getCantidadActual
        }}>
            {children}
        </CartContext.Provider>
    );
};