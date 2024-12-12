import { format, addMonths } from 'date-fns';

export const gerarEscalaParaProximoMes = async () => {
  const mesAtual = new Date();
  const proximoMes = addMonths(mesAtual, 1);  // Pegando o próximo mês
  const mesFormatado = format(proximoMes, 'yyyy-MM');  // Ex: "2024-12"
  
  const escalas = await fetch('http://localhost:3004/escalas').then(res => res.json());

  // Filtrando escalas do mês atual
  const escalasMesAtual = escalas.filter(escala => escala.mes === format(mesAtual, 'yyyy-MM'));

  // Gerando escalas para o próximo mês
  const novasEscalas = escalasMesAtual.map(escala => ({
    ...escala,
    mes: mesFormatado
  }));

  // Enviar as escalas para o servidor (JSON Server)
  await fetch('http://localhost:3004/escalas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(novasEscalas),
  });

  console.log(`Escalas para o mês de ${mesFormatado} geradas com sucesso!`);
};
