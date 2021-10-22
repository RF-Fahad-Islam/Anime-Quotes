let api;
let page = 2
let count = 0
let generateQuoteBtn = document.getElementById("generateQuote")
let quoteArea = document.getElementById("quoteArea")
let quoteCard = document.getElementById("quoteCard")
let quoteCardHeader = document.getElementById("quoteCardHeader")
let searchBar = document.getElementById("searchBar")
let form = document.getElementById("form")
form.addEventListener("submit", e=> e.preventDefault())
const skeletonOfQuoteCard = `
<div class="card-header placeholder-glow" id="quoteCardHeader">
    <span class="placeholder bg-secondary col-6"></span>
    <span class="placeholder bg-secondary col-4"></span>
</div>
<div class="card-body"  id="quoteArea">
    <blockquote class="blockquote mb-0 placeholder-glow">
    <footer class="blockquote-footer bg-secondary placeholder col-12"></footer>
    <footer class="blockquote-footer placeholder col-12"></footer>
    <span class="placeholder col-6"></span>
    <span class="placeholder col-5"></span>
    </blockquote>
</div>
`
generateQuoteBtn.addEventListener("click", () => {
    if (searchBar.value == "") {
        api = `https://animechan.vercel.app/api/random`
    } else {
        api = `https://animechan.vercel.app/api/quotes/character?name=${searchBar.value}&page=1`
    }
    generateQuoteBtn.innerHTML = `<div class="spinner-border" role="status">
<span class="visually-hidden">Loading...</span>
</div>`
    quoteCard.innerHTML = skeletonOfQuoteCard
    generateQuote(api)
})

function generateQuote(api) {
    fetch(api).then(response => {
        return response.json()
    }).then(data => {
        if(searchBar.value !== ""){
            data = data[Math.round(Math.random()*data.length)]
        }
        console.log(data);
        
        quoteCard.innerHTML = `
        <div class="card-header placeholder-glow" id="quoteCardHeader">
        <h3 class="text-center"<b> ${data.character}</b></h3>
        </div>
        <div class="card-body">
        <blockquote class="blockquote mb-0">
            <p>${data.quote}</p>
            <footer class="blockquote-footer"> <b class="text-primary">${data.character}</b> from <b title="${data.anime}">${data.anime}</b></footer>
        </blockquote>
        </div>`
        generateQuoteBtn.innerHTML = "Get More..."
        generateQuoteBtn.style.backgroundColor = "#8bc34a"
    }).catch(error => {
        generateQuoteBtn.innerHTML = `Not Found or Error!`
        generateQuoteBtn.style.backgroundColor = "red"
    })
}