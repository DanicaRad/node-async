const baseURL = 'http://deckofcardsapi.com/api/deck'

const cardBtn = document.getElementById("draw-card")
const cardsDiv = document.getElementById("cards")
const errMsg = document.getElementById("errors")

const deck = {
    async init() {
        errMsg.innerText = ""
        try {
        let resp = await axios.get(`${baseURL}/new/shuffle`);
        globalThis.deckId = resp.data.deck_id;

        } catch(e) {
            console.log(e);
            errMsg.innerText = "Something went wrong. Refresh page to try again.";
        }
    },

    async getNewCard() {
        errMsg.innerText = ""
        try {
            let resp = await axios.get(`${baseURL}/${globalThis.deckId}/draw/?count=1`)
            deck.putCardOnPage(resp.data.cards[0].image)

        } catch(e) {
            console.log(e) 
            errMsg.innerText = "Something went wrong. Try again"
        }
    },

    putCardOnPage(cardImg) {
        let img = document.createElement("img")
        img.src = cardImg
        cardsDiv.prepend(img)
    }
}

document.addEventListener("DOMContentLoaded", deck.init)
cardBtn.addEventListener("click", deck.getNewCard)