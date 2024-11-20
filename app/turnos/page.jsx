'use client';

import { useEffect, useState } from 'react';
import styles from '@/styles/Turnos.module.css'; // Ajuste o caminho de acordo com a sua estrutura
import { format } from 'date-fns';
import Link from 'next/link'; // Importando Link para navegação

export default function Turnos() {
  const [escalas, setEscalas] = useState([]);
  const [mesAtual, setMesAtual] = useState(format(new Date(), 'yyyy-MM'));

  useEffect(() => {
    const carregarEscalas = async () => {
      try {
        const response = await fetch('http://localhost:3004/escalas');
        const data = await response.json();
        const escalasMesAtual = data.filter(escala => escala.mes === mesAtual);
        setEscalas(escalasMesAtual);
      } catch (error) {
        console.error('Erro ao carregar escalas:', error);
      }
    };

    carregarEscalas();
  }, [mesAtual]);

  const renderCalendario = () => {
    const diasNoMes = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const dias = [];
    
    for (let i = 1; i <= diasNoMes; i++) {
      const dia = new Date(new Date().getFullYear(), new Date().getMonth(), i);
      const diaFormatado = format(dia, 'yyyy-MM-dd');
      const escalasNoDia = escalas.filter(escala => escala.dia === diaFormatado);

      dias.push(
        <div key={i} className={styles.dia}>
          <h4>{i}</h4>
          {escalasNoDia.map((escala) => (
            <div key={escala.guardaId}>
              Turno: {escala.turno} - Guarda: {escala.guardaId}
              <Link href={`/gerenciar-turnos/${escala.turno}`}>
                <button className={styles.editarBotao}>Editar</button>
              </Link>
            </div>
          ))}
        </div>
      );
    }

    return <div className={styles.calendario}>{dias}</div>;
  };

  return (
    <div>
      <h1 className={styles.titulo}>Gerenciador de Escalas</h1>
      {renderCalendario()}
    </div>
  );
}
