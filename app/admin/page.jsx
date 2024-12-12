'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from '@/styles/Admin.module.css';

export default function Admin() {
    const [guardas, setGuardas] = useState([]);
    const router = useRouter();

    // Simula obter os dados do JSON Server
    useEffect(() => {
        async function fetchGuardas() {
            const response = await fetch("http://localhost:3004/guardas");
            const data = await response.json();
            setGuardas(data);
        }

        fetchGuardas();
    }, []);

    const handleLogout = () => {
        // Limpa as credenciais de login (se houver) e redireciona para a página de login
        localStorage.removeItem("admin");
        router.push("/login");
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Painel de Administração</h2>
            <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>

            <div className={styles.listContainer}>
                <h3>Guardas Cadastrados</h3>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Expediente</th>
                            <th>Turno</th>
                            <th>Fiscal</th>
                            <th>Coordenador</th>
                            <th>Administrador</th>
                        </tr>
                    </thead>
                    <tbody>
                        {guardas.map((guarda) => (
                            <tr key={guarda.id}>
                                <td>{guarda.nome}</td>
                                <td>{guarda.expediente}</td>
                                <td>{guarda.turno}</td>
                                <td>{guarda.fiscal ? "Sim" : "Não"}</td>
                                <td>{guarda.coordenador ? "Sim" : "Não"}</td>
                                <td>{guarda.isAdmin ? "Sim" : "Não"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
