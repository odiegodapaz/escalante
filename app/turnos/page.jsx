'use client';

import { useEffect, useState } from 'react';
import styles from '@/styles/Turnos.module.css';
import { format } from 'date-fns';
import Link from 'next/link';
import Calendar from 'react-calendar'; // Importando a biblioteca de calendário
import 'react-calendar/dist/Calendar.css'; // Estilo básico do react-calendar

export default function Turnos() {
  const [escalas, setEscalas] = useState([]);
  const [mesAtual, setMesAtual] = useState(format(new Date(), 'yyyy-MM'));
  const [dataSelecionada, setDataSelecionada] = useState(new Date());

  // Carregar escalas do servidor
  useEffect(() => {
    const carregarEscalas = async () => {
      try {
        const response = await fetch('http://localhost:3004/guardas');
        const data = await response.json();
        setEscalas(data); // Carregando os dados de escalas
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
    <div>
      <h1 className={styles.titulo}>Gerenciador de Escalas</h1>
      <div className={styles.calendarioContainer}>
        {/* Exibindo o calendário */}
        <Calendar
          onChange={setDataSelecionada}
          value={dataSelecionada}
        />
      </div>
      
      <div className={styles.infoEscalas}>
        {/* Exibindo as escalas do dia selecionado */}
        <h3>Escalas para o dia {format(dataSelecionada, 'dd/MM/yyyy')}:</h3>
        {escalasNoDia.length > 0 ? (
          escalasNoDia.map((escala, idx) => (
            <div key={idx} className={styles.diaInfo}>
              <p><strong>Turno:</strong> {escala.turno}</p>
              <p><strong>Guarda:</strong> {escala.nome}</p>
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
  );
}
