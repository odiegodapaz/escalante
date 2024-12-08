'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/Login.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importando os ícones de olho

export default function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            const isAdmin = localStorage.getItem('isAdmin') === 'true';
            if (isAdmin) {
                router.push('/area-admin');
            } else {
                router.push('/area-usuario');
            }
        }
    }, [router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3004/admins');
            const admins = await response.json();
            const admin = admins.find(
                admin => admin.username === formData.username && admin.password === formData.password
            );

            if (admin) {
                localStorage.setItem('authToken', '123456');
                localStorage.setItem('isAdmin', admin.isAdmin);

                if (admin.isAdmin) {
                    toast.success('Login realizado com sucesso!');
                    router.push('/area-admin');
                } else {
                    toast.info('Login realizado, mas você não tem acesso à área administrativa.');
                    router.push('/area-usuario');
                }
            } else {
                toast.error('Credenciais inválidas!');
            }
        } catch (error) {
            console.error('Erro no login:', error);
            toast.error('Erro ao tentar realizar login.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <img src="../login.png" alt="Login Icon" />
            </div>
            <div className={styles.formWrapper}>
                <h2 className={styles.title}>Member Login</h2>
                <form onSubmit={handleLogin}>
                    <div className={styles.formGroup}>
                        <label className={styles.labelBold}>Usuario</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={styles.inputField}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.labelBold}>Senha</label>
                        <div className={styles.passwordContainer}>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={styles.inputField}
                                required
                            />
                            <button
                                type="button"
                                className={styles.showPasswordButton}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Ícones de olho */}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className={styles.button} role="button">Login</button>
                </form>
                {/* <a href="#" className={styles.forgotPassword}>Forgot Username / Password?</a>
                <div>
                    <a href="#" className={styles.createAccount}>Create your Account →</a>
                </div> */}
            </div>
            <ToastContainer position="top-center" autoClose={5000} />
        </div>
    );
}
