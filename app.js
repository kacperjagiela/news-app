window.addEventListener('load', e =>{
    const defaultSource = "bbc-news";
    updateNews(defaultSource);
    updateSources(defaultSource);
});

async function updateNews(source){
    const result = await fetch(`https://newsapi.org/v2/everything?sources=${source}&apiKey=124e6d7bc3ea499abcff822a5a9509e3`);
    const json = await result.json();
    const news = json.articles.map(createNews).join("\n");

    document.getElementById("news").innerHTML = news;
}

async function updateSources(defaultSource){
    const result = await fetch("https://newsapi.org/v2/sources?apiKey=124e6d7bc3ea499abcff822a5a9509e3");
    const json = await result.json();
    const sources = json.sources.map(source=>{
        let selected="";
        if(source.id===defaultSource){
            selected = 'selected';
        }
        return `<option onclick='updateNews("${source.id}")' ${selected}>${source.name}</option>`
    }).join("\n");

    document.getElementById('sourceSelector').innerHTML = await sources;
}

function createNews(article){
    return `
        <div class="article">
            <h2>${article.title}</h2>
            <h3>${article.description}</h3>
            <img src='${article.urlToImage}'/>
            <p>${article.content} <a href='${article.url}'>Read more...</a></p>
        </div>
    `;
}