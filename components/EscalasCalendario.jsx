import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import styles from '@/styles/EscalasCalendario.module.css';

export default function EscalasCalendario() {
  const [escalas, setEscalas] = useState([]);
  const [mesAtual, setMesAtual] = useState(format(new Date(), 'yyyy-MM')); // Mes atual formatado
  const [isLoading, setIsLoading] = useState(true); // Para controle de carregamento

  // Carregar os dados das escalas do servidor
  useEffect(() => {
    const carregarEscalas = async () => {
      try {
        const response = await fetch('http://localhost:3004/guardas');
        if (!response.ok) throw new Error('Erro ao carregar escalas do servidor.');

        const dados = await response.json();
        // Filtra as escalas que pertencem ao mês atual
        const escalasDoMes = dados.filter((escala) => escala.mes === mesAtual);
        setEscalas(escalasDoMes); // Atualiza o estado com as escalas do mês
        setIsLoading(false); // Atualiza o estado para indicar que o carregamento acabou
      } catch (error) {
        console.error('Erro ao carregar escalas:', error);
      }
    };

    carregarEscalas();
  }, [mesAtual]); // Recarrega os dados toda vez que o mês mudar

  const renderCalendario = () => {
    const diasNoMes = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const dias = [];

    // Loop para renderizar cada dia do mês
    for (let i = 1; i <= diasNoMes; i++) {
      const dia = new Date(new Date().getFullYear(), new Date().getMonth(), i);
      const diaFormatado = format(dia, 'yyyy-MM-dd'); // Formato de data para comparação

      // Filtra as escalas para o dia específico
      const escalasNoDia = escalas.filter((escala) => escala.dia === diaFormatado);

      dias.push(
        <div key={i} className={styles.dia}>
          <h4>{i}</h4>
          {escalasNoDia.length > 0 ? (
            escalasNoDia.map((escala, idx) => (
              <div key={idx}>
                <p>Turno: {escala.turno}</p>
                <p>Guarda: {escala.nome}</p>
              </div>
            ))
          ) : (
            <p>Nenhuma escala para esse dia</p>
          )}
        </div>
      );
    }

    return <div className={styles.calendario}>{dias}</div>;
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1 className={styles.titulo}>Escala de Serviço - {mesAtual}</h1>
      {renderCalendario()}
    </div>
  );
}
