// src/componentes/Login/Login.jsx
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                /*Vacia los inputs después del login exitoso
                setEmail("");
                setPassword("");
                */
                const user = userCredential.user;
                console.log("Usuario logueado:", user);
                alert("¡Inicio de sesión exitoso!");
                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Error en el login:", errorCode, errorMessage);
                alert("Error: " + errorMessage);
            });
    };
    return (
        <div className={styles.loginPage}>
            <div className={styles.loginCard}>
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className={styles.loginButton}>
                        Ingresar
                    </button>
                    <b>Cuenta admin=soyeladmin@gmail.com | Contraseña=admin1234</b>
                    <div className={styles.botonRegistro}>
                        <p className={styles.registro}>¿No tenés una cuenta?</p>
                        <Link to="/registro">Registrate aquí</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;