'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/Login.module.css';

export default function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Verifica se o usuário já está logado
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Verifica se é admin
            if (isAdmin) {
                router.push('/area-admin');
            } else {
                router.push('/');
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
                // Salva o estado do login no localStorage
                localStorage.setItem('authToken', '123456'); // Simula um token de autenticação
                localStorage.setItem('isAdmin', admin.isAdmin); // Salva se o usuário é admin

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
            <h2 className={styles.title}>Login</h2>
            <form onSubmit={handleLogin}>
                <div className={styles.formGroup}>
                    <label>Usuário</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Senha</label>
                    <div className={styles.passwordContainer}>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className={styles.showPasswordButton}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Ocultar" : "Mostrar"}
                        </button>
                    </div>
                </div>
                <button type="submit">Entrar</button>
            </form>
            <ToastContainer position="top-center" autoClose={5000} />
        </div>
    );
}
