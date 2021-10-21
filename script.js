
let api;
let generateQuoteBtn = document.getElementById("generateQuote")
let quoteArea = document.getElementById("quoteArea")
let quoteCard = document.getElementById("quoteCard")
let quoteCardHeader = document.getElementById("quoteCardHeader")
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
    api = `https://animechan.vercel.app/api/random`
    generateQuoteBtn.innerHTML = `<div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>`
    quoteCard.innerHTML = skeletonOfQuoteCard
    generateQuote()
})

function generateQuote() {
    fetch(api).then(response => {
      return response.json()
    }).then(data => {
        quoteCard.innerHTML = `
        <div class="card-header placeholder-glow" id="quoteCardHeader">
        <h3 class="text-center">#Quote - <b> ${data.character}</b></h3>
        </div>
        <div class="card-body">
        <blockquote class="blockquote mb-0">
            <p>${data.quote}</p>
            <footer class="blockquote-footer"> <b class="text-primary">${data.character}</b> from <b title="${data.anime}">${data.anime}</b></footer>
        </blockquote>
        </div>`
        generateQuoteBtn.innerHTML = "Success! Need More?"
    }).catch(error=> {
        generateQuoteBtn.innerHTML = `Error!`
    })
}