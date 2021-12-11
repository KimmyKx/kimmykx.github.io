let counter = 0
shuffle()

function shuffle() {
    const NAME = document.getElementById("name")
    if(counter == 10){
        NAME.innerHTML = '<span style="color: blueviolet;">Kim</span>my'
        NAME.style.transform = 'translate(0,0)'
        return
    }
    if(counter == 9) NAME.style.transform = 'translate(70px, 0px)'
    if(counter == 8) NAME.style.transform = 'translate(-70px, 0px)'
    const name = "Kimmy"
    let shuffled = name.split("")
    const n = shuffled.length
    for (let i = n - 1; i > 0; i--) {
        const ran = Math.floor(Math.random() * (i + 1))
        const tmp = shuffled[i]
        shuffled[i] = shuffled[ran]
        shuffled[ran] = tmp
    }
    const result = shuffled.join("")
    NAME.innerHTML = '<span style="color: blueviolet;">'+ result.substring(0,3) +'</span>'+ result.substring(3,5)
    counter++
    setTimeout(shuffle, 100 + counter * 10);
}

const logo = document.querySelectorAll(".project .logo")
for(let i = 0; i < logo.length; i++){
    if(i % 2 != 0){
        logo[i].style.right = "-20px"
        logo[i].style.left = "inherit"
    }
}


const icons = document.querySelectorAll(".skill i")
icons.forEach(el => {
    const colors = el.style.color
    el.style.textShadow = `0 0 3px ${colors}`
})