'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/AreaUsuario.module.css';

export default function AreaUsuario() {
    const router = useRouter();

    useEffect(() => {
        // Verifica se o usuário está autenticado
        const isAuthenticated = localStorage.getItem('authToken');
        if (!isAuthenticated) {
            router.push('/login'); // Redireciona para login se não autenticado
        }
    }, [router]);

    return (
        <div className={styles.options}>
        <button
            className={styles.button}
            onClick={() => router.push('/expediente')}
        >
            Ver Expediente
        </button>
        <button
            className={styles.button}
            onClick={() => {
                localStorage.removeItem('authToken');
                router.push('/login');
            }}
        >
            Sair
        </button>
    </div>
    
    );
}
