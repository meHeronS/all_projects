document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/jogos')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('jogos-container');
            data.forEach(jogo => {
                const card = document.createElement('div');
                card.className = 'col-lg-4 col-md-6 mb-4';
                card.innerHTML = `
                    <div class="card h-100">
                        <img class="card-img-top" src="${jogo.imagem}" alt="${jogo.titulo}">
                        <div class="card-body">
                            <h4 class="card-title">${jogo.titulo}</h4>
                            <p class="card-text">${jogo.descricao}</p>
                            <p class="card-text"><a href="${jogo.pagina_desenvolvedora}" target="_blank">Página do Desenvolvedor</a></p>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => console.log('Ocorreu um erro:', error));
});
