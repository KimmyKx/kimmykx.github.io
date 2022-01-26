let counter = 0
let isDark = 0;
if(!!localStorage.getItem("mode")) dark()
else isDark = 1
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

const darkmode = document.querySelector("darkmode")
darkmode.addEventListener("click", toggleMode)

function toggleMode(){
    if(isDark % 2 == 0) light()
    else dark()
}

function dark(){
    localStorage.setItem("mode", "dark")
    const colors = {
        color: "white",
        backgroundColor: "rgb(50,50,50)", 
        header: "rgb(40,40,40)",
        drop: "white",
        boxShadow: "0 0 5px 0 black"
    }
    changes(colors)
    isDark = 0
}

function light(){
    localStorage.removeItem("mode")
    const colors = {
        color: "inherit",
        backgroundColor: "white", 
        header: "inherit",
        drop: "black",
        boxShadow: "0 0 5px 0 grey",
        remove: true
    }
    changes(0, colors)
    isDark = 1
}

function changes(dark, white){
    document.body.style.color = `${white?.color || dark.color}`
    document.body.style.backgroundColor = `${white?.backgroundColor || dark.backgroundColor}`
    document.querySelector("header").style.backgroundColor = `${white?.header || dark.header}`
    document.querySelector(".drop").style.borderTopColor = `${white?.drop || dark.drop}`
    document.querySelectorAll(".project .tier").forEach(tier => tier.style.boxShadow = `${white?.boxShadow || dark.boxShadow}`)
    document.querySelectorAll(".project .logo").forEach(logo => {
        logo.style.backgroundColor= `${white?.backgroundColor || dark.backgroundColor}`
        logo.style.boxShadow = `${white?.boxShadow || dark.boxShadow}`
    })

    white?.remove ? document.getElementById("styles").remove() :
    document.head.innerHTML += `
    <style id="styles">
    .container .history .content .inner::after {
        border-bottom-color: ${dark.backgroundColor};
    }
    .container .history .content .inner::before {
        border-bottom-color: rgba(0,0,0,.5);
    }
    .container .history .content .inner {
        box-shadow: ${dark.boxShadow}
    }

    </style>
    `

    document.querySelectorAll('.logo').forEach(logo => logo.style.boxShadow = `${white?.boxShadow || dark.boxShadow}`)
}