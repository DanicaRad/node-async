const baseURL = 'http://numbersapi.com'

const multipleNums = document.getElementById("multiple-nums")
const favNum = document.getElementById("fav-num")
const errors = document.getElementById("errors")

document.addEventListener("DOMContentLoaded", getFacts)

function getFacts() {
    errors.innerText = ""
    getNumsFacts()
    getFavFacts()
}

async function getNumsFacts() {
    try {
        let resp = await axios.get(`${baseURL}/1..10`)
        for(let d in resp.data) {
            let fact = putFactsOnPage(resp.data[d])
            multipleNums.append(fact)
        }
    } catch(e) {
        console.log(e)
        errors.innerText = "Something went wrong; refresh to page to try again."
    }
}

async function getFavFacts() {
    try {
        for(let i = 0; i < 4; i++) {
            let fact = await axios.get(`${baseURL}/27`)
            console.log(fact.data)
            let factLi = putFactsOnPage(fact.data)
            favNum.append(factLi)
        }

    } catch(e) {
        console.log(e)
        errors.innerText = "Something went wrong. Refresh page to try again."
    }
}

function putFactsOnPage(fact) {
    let factLi = document.createElement("li")
    factLi.innerText = fact
    return factLi
}