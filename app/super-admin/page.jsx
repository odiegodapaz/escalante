'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/SuperAdmin.module.css'; // Ajuste para o seu CSS de SuperAdmin

export default function SuperAdmin() {
    const router = useRouter();

    useEffect(() => {
        // Verifica se o usuário está autenticado
        const isAuthenticated = localStorage.getItem('authToken');
        if (!isAuthenticated) {
            router.push('/login'); // Redireciona para login se não autenticado
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('isAdmin');
        router.push('/login');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Super Admin Dashboard</h1>
            <p className={styles.subtitle}>Aqui você pode controlar todas as configurações do sistema.</p>
            <div className={styles.options}>
                {/* <button className={styles.button} onClick={() => router.push('/area-admin')}>Área Admin</button> */}
                <button className={styles.button} onClick={() => router.push('/gerenciar-turnos')}>Gerenciar Turnos</button>
                <button className={styles.button} onClick={() => router.push('/listagem')}>Ver Listagem</button>
                <button className={`${styles.button} ${styles.logoutButton}`} onClick={handleLogout}>Sair</button>
            </div>
        </div>
    );
}
