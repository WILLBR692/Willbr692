// Supabase Configuração
const SUPABASE_URL = 'https://your-supabase-url.supabase.co';
const SUPABASE_KEY = 'your-anon-key';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Função para carregar o dashboard
async function loadDashboard() {
  const { data: ocorrencias } = await supabase.from('ocorrencias').select('*');
  const { data: manutencoes } = await supabase.from('manutencoes').select('*');
  
  document.getElementById('content').innerHTML = `
    <h2>Dashboard</h2>
    <p>Total de Ocorrências: ${ocorrencias.length}</p>
    <p>Total de Manutenções: ${manutencoes.length}</p>
  `;
}

// Função para carregar seções
function loadSection(section) {
  let content = '';

  switch (section) {
    case 'ocorrencias':
      content = `
        <h2>Ocorrências</h2>
        <button onclick="addOcorrencia()">Adicionar Ocorrência</button>
        <div id="list-ocorrencias"></div>
      `;
      loadOcorrencias();
      break;

    case 'manutencoes':
      content = `
        <h2>Manutenções</h2>
        <button onclick="addManutencao()">Adicionar Manutenção</button>
        <div id="list-manutencoes"></div>
      `;
      loadManutencoes();
      break;

    case 'condominios':
      content = '<h2>Condomínios</h2>';
      break;

    case 'prestadores':
      content = '<h2>Prestadores</h2>';
      break;

    default:
      content = '<p>Seção inválida.</p>';
  }

  document.getElementById('content').innerHTML = content;
}

// Exemplo: Listar Ocorrências
async function loadOcorrencias() {
  const { data: ocorrencias } = await supabase.from('ocorrencias').select('*');
  let list = ocorrencias.map(o => `<p>${o.titulo} - ${o.status}</p>`).join('');
  document.getElementById('list-ocorrencias').innerHTML = list;
}

// Exemplo: Adicionar Ocorrência
async function addOcorrencia() {
  const titulo = prompt('Digite o título da ocorrência:');
  const descricao = prompt('Digite a descrição:');
  const tipo = prompt('Tipo (preventiva/corretiva):');

  if (titulo && descricao && tipo) {
    await supabase.from('ocorrencias').insert([{ titulo, descricao, tipo, status: 'aberto' }]);
    alert('Ocorrência adicionada!');
    loadOcorrencias();
  }
}
