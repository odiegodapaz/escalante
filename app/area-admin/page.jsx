'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/AreaAdmin.module.css';

export default function AreaAdmin() {
    const router = useRouter();

    useEffect(() => {
        // Verifica se o usuário está autenticado e é administrador
        const isAuthenticated = localStorage.getItem('authToken');
        const isAdmin = localStorage.getItem('isAdmin') === 'true';

        if (!isAuthenticated) {
            router.push('/login'); // Redireciona para login se não autenticado
        } else if (!isAdmin) {
            router.push('/area-usuario'); // Redireciona para Área de Usuário se não for admin
        }
    }, [router]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Bem-vindo à Área Admin</h1>
            <p className={styles.subtitle}>Use os recursos abaixo para gerenciar o sistema:</p>
            <div className={styles.options}>
                <button onClick={() => router.push('/turnos')}>Gerenciar Escalas</button>
                <button onClick={() => router.push('/listagem')}>Ver Listagem</button>
                <button onClick={() => {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('isAdmin');
                    router.push('/login');
                }}>
                    Sair
                </button>
            </div>
        </div>
    );
}
