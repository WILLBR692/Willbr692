// Substitua pelas suas credenciais do Supabase
const SUPABASE_URL = 'https://lrkdrpbgvyflhtcvpbqk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxya2RycGJndnlmbGh0Y3ZwYnFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1NTg2MzMsImV4cCI6MjA1MTEzNDYzM30.EAXXps-1ks1SGTihlPe7SNVPIMsck1OvnDFCRG3YQ4E';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Referências aos elementos do DOM
const totalOcorrencias = document.getElementById('total-ocorrencias');
const totalManutencoes = document.getElementById('total-manutencoes');
const listaOcorrencias = document.getElementById('lista-ocorrencias');
const formOcorrencia = document.getElementById('form-ocorrencia');

// Função para carregar dados iniciais
async function carregarDados() {
  // Carregar total de ocorrências
  const { data: ocorrencias, error: errOcorrencias } = await supabase
    .from('ocorrencias')
    .select('*');
  if (errOcorrencias) {
    console.error('Erro ao carregar ocorrências:', errOcorrencias);
  } else {
    totalOcorrencias.textContent = ocorrencias.length;
    listaOcorrencias.innerHTML = '';
    ocorrencias.forEach((ocorrencia) => {
      const li = document.createElement('li');
      li.textContent = `${ocorrencia.titulo} - ${ocorrencia.tipo}`;
      listaOcorrencias.appendChild(li);
    });
  }

  // Carregar total de manutenções
  const { data: manutencoes, error: errManutencoes } = await supabase
    .from('manutencoes')
    .select('*');
  if (errManutencoes) {
    console.error('Erro ao carregar manutenções:', errManutencoes);
  } else {
    totalManutencoes.textContent = manutencoes.length;
  }
}

// Função para adicionar uma nova ocorrência
formOcorrencia.addEventListener('submit', async (e) => {
  e.preventDefault();
  const titulo = document.getElementById('titulo').value;
  const descricao = document.getElementById('descricao').value;
  const tipo = document.getElementById('tipo').value;

  const { error } = await supabase.from('ocorrencias').insert([
    {
      titulo,
      descricao,
      tipo,
      status: 'aberto',
    },
  ]);

  if (error) {
    console.error('Erro ao adicionar ocorrência:', error);
  } else {
    alert('Ocorrência adicionada com sucesso!');
    formOcorrencia.reset();
    carregarDados();
  }
});

// Inicializar o carregamento
carregarDados();
