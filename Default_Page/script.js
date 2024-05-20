// Script para a página HTML

// Adiciona um ouvinte de evento ao botão "Iniciar Servidor"
document.getElementById("iniciarServidor").addEventListener("click", function(event) {
    event.preventDefault(); // Evita o comportamento padrão de recarregar a página ao clicar no link
    iniciarServidor(); // Chama a função para iniciar o servidor
});

// Função para iniciar o servidor
function iniciarServidor() {
    // Faz uma solicitação AJAX para a rota /iniciarServidor no servidor
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/iniciarServidor", true);
    xhr.onreadystatechange = function() {
        // Verifica se a solicitação foi concluída e se o status da resposta é 200 (OK)
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert("Servidor e banco de JSON iniciados com sucesso!"); // Exibe um alerta de sucesso
        }
    };
    xhr.send(); // Envia a solicitação
}

// Script para o servidor

const express = require('express'); // Importa o módulo Express
const fs = require('fs'); // Importa o módulo fs para manipulação de arquivos
const path = require('path'); // Importa o módulo path para manipulação de caminhos

const app = express(); // Cria uma instância do aplicativo Express
const PORT = process.env.PORT || 3000; // Define a porta do servidor (padrão: 3000)
const JSON_FILE_PATH = 'dbs\db.json'; // Define o caminho do arquivo JSON do banco de dados

app.use(express.static(path.join(__dirname, 'Projeto Web'))); // Define o diretório de arquivos estáticos

// Rota padrão para servir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Projeto Web', 'all_projects', 'Default_Page', 'Index.html')); // Envia o arquivo HTML como resposta
});
  
// Rota para servir os dados JSON
app.get('/dados', (req, res) => {
  fs.readFile(path.resolve(__dirname, JSON_FILE_PATH), 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo JSON:', err);
      res.status(500).send('Erro interno do servidor'); // Retorna um erro 500 em caso de falha
      return;
    }
    const jsonData = JSON.parse(data); // Converte os dados JSON para um objeto JavaScript
    res.json(jsonData); // Retorna os dados JSON como resposta
  });
});

// Rota para iniciar o servidor e o banco de JSON
app.get('/iniciarServidor', (req, res) => {
    // Coloque aqui o código para iniciar o servidor e o banco de JSON
    // Por exemplo:
    // iniciarServidor();
    // iniciarBancoDeJSON();
    res.sendStatus(200); // Retorna um status 200 (OK) em caso de sucesso
});

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`); // Exibe uma mensagem indicando que o servidor está rodando
});
