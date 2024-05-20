const API_KEY = '2002236caca57eb9595c2b46484761c4';

function exibeNoticias (){
    let divTela = document.getElementById('tela');
    let texto = '';

    //Montar texto HTML das notícias
    let dados = JSON.parse (this.responseText);
    console.log(dados);
    for(i = 0; i < dados.results.length; i++){
        let filmes = dados.results[i];
        let data = new Date(filmes.release_date);
        
        texto = texto + `
        <div id="tela" class="row">
            <div class="box-noticia">
                <img src="https://image.tmdb.org/t/p/w500/${filmes.poster_path}" alt="">
                <span class="titulo">${filmes.title}</span><br>
                <span class="creditos">${data.toLocaleDateString ()}</span><br>
                <span class="texto">${filmes.overview}</span>
                <a href="${"https://www.themoviedb.org/movie/" + filmes.id}" >Leia mais...</a>
            </div>
        </div>
        `;
    };

    //Preencher a Div com o texto HTML
    divTela.innerHTML = texto;
}

function executaPesquisa () {
    let query = document.getElementById('txtPesquisa').value;

    let xhr = new XMLHttpRequest ();
    xhr.onload = exibeNoticias;
    xhr.open ('GET', `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=pt-BR`);
    xhr.send ();
}
document.getElementById ('btnPesquisa').addEventListener ('click', executaPesquisa);
