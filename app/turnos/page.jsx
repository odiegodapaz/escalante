'use client';

import { useEffect, useState } from 'react';
import styles from '@/styles/Turnos.module.css';
import { format } from 'date-fns';
import Link from 'next/link';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Turnos() {
  const [escalas, setEscalas] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState(new Date());

  // Carregar escalas do servidor
  useEffect(() => {
    const carregarEscalas = async () => {
      try {
        const response = await fetch('http://localhost:3004/guardas');
        const data = await response.json();
        setEscalas(data);
      } catch (error) {
        console.error('Erro ao carregar escalas:', error);
      }
    };

    carregarEscalas();
  }, []);

  // Filtrar escalas para o dia selecionado
  const escalasNoDia = escalas.filter(
    (escala) => escala.dia === format(dataSelecionada, 'yyyy-MM-dd')
  );

  return (
    <div className={styles.container}>
      {/* Título */}
      <h1 className={styles.titulo}>Gerenciador de Escalas</h1>

      {/* Container para as colunas */}
      <div className={styles.conteudo}>
        {/* Coluna do calendário */}
        <div className={styles.calendarioContainer}>
          <Calendar onChange={setDataSelecionada} value={dataSelecionada} />
        </div>

        {/* Coluna das informações */}
        <div className={styles.infoEscalas}>
          <h3>Escalas para o dia {format(dataSelecionada, 'dd/MM/yyyy')}:</h3>
          {escalasNoDia.length > 0 ? (
            escalasNoDia.map((escala, idx) => (
              <div key={idx} className={styles.escalaInfo}>
                <p>
                  <strong>Turno:</strong> {escala.turno}
                </p>
                <p>
                  <strong>Guarda:</strong> {escala.nome}
                </p>
                <Link href={`/gerenciar-turnos/${escala.id}`}>
                  <button className={styles.editarBotao}>Editar</button>
                </Link>
              </div>
            ))
          ) : (
            <p>Nenhuma escala para este dia.</p>
          )}
        </div>
      </div>
    </div>
  );
}
