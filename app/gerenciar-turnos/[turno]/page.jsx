'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Swal from 'sweetalert2';
import styles from '@/styles/GerenciarTurnos.module.css';

export default function GerenciarTurnos() {
  const [guardas, setGuardas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { turno } = useParams(); // Captura o turno da URL
  const router = useRouter();

  // Carregar guardas do servidor
  useEffect(() => {
    async function carregarGuardas() {
      try {
        const response = await fetch(`http://localhost:3004/escalas`);
        if (response.ok) {
          const dados = await response.json();
          const guardasDoTurno = dados.filter(guarda => guarda.turno === turno);
          setGuardas(guardasDoTurno);
          setIsLoading(false);
        } else {
          Swal.fire('Erro ao carregar guardas do servidor.');
        }
      } catch (error) {
        console.error('Erro ao carregar guardas:', error);
        Swal.fire('Erro ao carregar guardas.');
      }
    }

    carregarGuardas();
  }, [turno]);

  // Atualizar dados ao editar
  const handleInputChange = (id, field, value) => {
    const atualizados = guardas.map(guarda => {
      if (guarda.id === id) {
        return { ...guarda, [field]: value };
      }
      return guarda;
    });
    setGuardas(atualizados);
  };

  // Salvar os dados editados no servidor
  const handleSave = async () => {
    try {
      for (const guarda of guardas) {
        await fetch(`http://localhost:3004/escalas/${guarda.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(guarda),
        });
      }
      Swal.fire('Dados salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar guardas:', error);
      Swal.fire('Erro ao salvar os dados.');
    }
  };

  // Excluir um guarda
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3004/escalas/${id}`, {
        method: 'DELETE',
      });
      setGuardas(guardas.filter(guarda => guarda.id !== id));
      Swal.fire('Guarda excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir guarda:', error);
      Swal.fire('Erro ao excluir o guarda.');
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gerenciar Turno: {turno}</h1>
      <div className={styles.grid}>
        {guardas.map(guarda => (
          <div key={guarda.id} className={styles.item}>
            <label>Nome:</label>
            <input
              type="text"
              value={guarda.nome}
              onChange={(e) => handleInputChange(guarda.id, 'nome', e.target.value)}
            />
            <label>Horário:</label>
            <input
              type="text"
              value={guarda.horario || ''}
              onChange={(e) => handleInputChange(guarda.id, 'horario', e.target.value)}
            />
            <button className={styles.buttonExcluir} onClick={() => handleDelete(guarda.id)}>
              Excluir
            </button>
          </div>
        ))}
      </div>
      <button className={styles.buttonSalvar} onClick={handleSave}>
        Salvar Alterações
      </button>
    </div>
  );
}
