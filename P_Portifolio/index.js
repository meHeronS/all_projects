const API_KEY = '2002236caca57eb9595c2b46484761c4';

function exibePopulares (){
    let divTela = document.getElementById('tela');
    let texto = '';

    //Montar texto HTML das notícias
    let dados = JSON.parse (this.responseText);
    for(i = 0; i < dados.results.length; i++){
        let filmes = dados.results[i];
        let data = new Date(filmes.release_date);
        
        texto = texto + `
        <div id="tela" class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 cartao">
            <center><img src="https://image.tmdb.org/t/p/w500/${filmes.poster_path}" alt="Poster">
            <span class="titulo">${filmes.title}</span><br>
            <span class="creditos">${data.toLocaleDateString ()}</span><br>
            <span class="avaliacao">Avaliação: ${filmes.vote_average} de 10</span><br>
            <a href="${"https://www.themoviedb.org/movie/" + filmes.id}">Leia mais...</a></center>
        </div>
        `;
    };

    //Preencher a Div com o texto HTML
    divTela.innerHTML = texto;
}



function executaPopular () {

    let xhr = new XMLHttpRequest ();
    xhr.onload = exibePopulares;
    xhr.open ('GET', `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`);
    xhr.send ();
}

    