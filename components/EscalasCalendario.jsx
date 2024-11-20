import { useEffect, useState } from 'react';
import { format, addMonths } from 'date-fns';
import styles from '@/styles/EscalasCalendario.module.css';

export default function EscalasCalendario() {
  const [escalas, setEscalas] = useState([]);
  const [mesAtual, setMesAtual] = useState(format(new Date(), 'yyyy-MM'));

  useEffect(() => {
    // Carregar escalas do banco de dados
    const carregarEscalas = async () => {
      const data = await fetch('http://localhost:3004/escalas').then(res => res.json());
      const escalasMes = data.filter(escala => escala.mes === mesAtual);
      setEscalas(escalasMes);
    };

    carregarEscalas();
  }, [mesAtual]);

  const renderCalendario = () => {
    const diasNoMes = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const dias = [];
    
    for (let i = 1; i <= diasNoMes; i++) {
      const dia = new Date(new Date().getFullYear(), new Date().getMonth(), i);
      const diaFormatado = format(dia, 'yyyy-MM-dd');

      // Filtrando as escalas para este dia
      const escalasNoDia = escalas.filter(escala => escala.mes === mesAtual && escala.dia === diaFormatado);

      dias.push(
        <div key={i} className={styles.dia}>
          <h4>{i}</h4>
          {escalasNoDia.map((escala) => (
            <div key={escala.guardaId}>
              Turno: {escala.turno} - Guarda: {escala.guardaId}
            </div>
          ))}
        </div>
      );
    }

    return <div className={styles.calendario}>{dias}</div>;
  };

  return (
    <div>
      <h1>Escala de Serviço - {mesAtual}</h1>
      {renderCalendario()}
    </div>
  );
}
