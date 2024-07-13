
const form = document.querySelector("#form")
const player = document.querySelector("#player-option")
const playerImg = document.querySelector("#player-img")
const botImg = document.querySelector("#bot-img")
const result_poll = document.querySelector("#result")
const submit = document.querySelector("#submit")
const bar = document.querySelector("#bar")
const pBar = document.querySelector("#p-bar")

const reset = document.querySelector("#reset")
const point1 = document.querySelector("#point1")
const point2 = document.querySelector("#point2")

let pointVal1=0;
let pointVal2=0;
let result = 0;

function imgChange(val, image) {
    if (val == 1) image.src = "img/stone.png"
    else if (val == 2) image.src = "img/paper.avif"
    else image.src = "img/scissors.webp"
}

function setTime(bot) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            imgChange(bot, botImg)
            resolve()
        }, 200)
    })
}

form.addEventListener('submit', async function (e) {
    e.preventDefault()
    let bot
    submit.disabled=true;
    player.disabled=true;
    pBar.classList.remove("d-none")
    for (let i = 0; i < 10; i++) {
        await setTime(i%3+1)
        bar.style.width= `${(i+1)*10}%`
    }
    bar.style.width= `0%`
    pBar.classList.add("d-none")
    bot = Math.floor(Math.random() * 3) + 1;
    imgChange(bot, botImg)
    console.log(bot)
    if (player.value == bot) result = 0;
    else if (player.value == 1 && bot == 2) result = -1;
    else if (player.value == 1 && bot == 3) result = 1;
    else if (player.value == 2 && bot == 3) result = -1;
    else if (player.value == 2 && bot == 1) result = 1;
    else if (player.value == 3 && bot == 1) result = -1;
    else if (player.value == 3 && bot == 2) result = 1;

    result_poll.classList.remove("text-success","text-danger","text-muted")
    if (result == 0) {
        result_poll.innerHTML = "match draw"
        result_poll.classList.add("text-muted")
    }
    else if (result == 1){
        result_poll.innerHTML = "win"
        result_poll.classList.add("text-success")
        pointVal1++;
        point1.innerHTML= pointVal1
    }
    else {
        result_poll.innerHTML = "lose"
        result_poll.classList.add("text-danger")
        pointVal2++;
        point2.innerHTML= pointVal2
    }
    submit.disabled=false;
    player.disabled=false;

})

player.addEventListener('change', function () {
    imgChange(player.value, playerImg)
})

reset.addEventListener('click',function(){
    pointVal1=0
    pointVal2=0
    point1.innerHTML= 0
    point2.innerHTML= 0
    result_poll.classList.remove("text-success","text-danger","text-muted")
    result_poll.innerHTML = "Result"
})


