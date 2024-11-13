'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/Login.module.css';
import logService from '@/utils/logService';

export default function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const router = useRouter();

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
            const admin = admins.find(admin => admin.username === formData.username && admin.password === formData.password);

            if (admin) {
                toast.success('Login realizado com sucesso!');
                await logService.logAction('Login', `Administrador ${formData.username} fez login`);
                router.push('/');
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
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit">Entrar</button>
            </form>
            <ToastContainer position="top-center" autoClose={5000} />
        </div>
    );
}
