const gStr = "力，內，巴，斤，木，毛，父，牙，卡，必，母，玉，田，石，光，向，收，次，米，羊，伯，吵，址，完，局，李，豆，其，拍，林，河，泳，物，表，金，青，屋，故，原，租，草，記，停，處，許，貨，通，雪，喂，換，景，游，發，結，華，著／着，街，詞，越，週，郵，陽，搬，爺，節，該，境，滿，算，燈，糖，親"
const pStr = "Lì, nèi, bā, jīn, mù, máo, fù, yá, kǎ, bì, mǔ, yù, tián, shí, guāng, xiàng, shōu, cì, mǐ, yáng, bó, chǎo, zhǐ, wán, jú, lǐ, dòu, qí, pāi, lín, hé, yǒng, wù, biǎo, jīn, qīng, wū, gù, yuán, zū, cǎo, jì, tíng, chù, xǔ, huò, tōng, xuě, wèi, huàn, jǐng, yóu, fā, jié, huá, zhe/zhe, jiē, cí, yuè, zhōu, yóu, yáng, bān, yé, jié, gāi, jìng, mǎn, suàn, dēng, táng, qīn".toLowerCase()
const mStr = "force, inside, -bar (particle), catty, wood, hair, father, tooth, card, must, Mother, Jade, Field, Stone, Light, Towards, Collection, Times, Rice, Sheep, Uncle, Noisy, Address, Finish, Bureau, plum, bean, its, shoot, forest, river, swimming, thing, table, gold, green, house, so, original, rent, grass, remember, stop, place, May, goods, pass, snow, feed, change, scene, travel, hair, knot, magnificent, with, Street, word, cross, week, mail, Positive, Move, Lord, Festival, Should, territory, Full, Calculate, lamp, Sugar, Kiss".toLocaleLowerCase()

let done = []
const goresans = gStr.split("，")
const pinyins = pStr.split(", ")
const means = mStr.split(", ")
means.forEach((m, i) => {
    console.log(m + ": "  + pinyins[i])
})

const question = document.querySelector(".goresan")
const meaning = document.querySelector(".meaning")
const options = document.querySelectorAll(".option")
const doneText = document.querySelector(".done")

const hanziCheck = document.querySelector("#hanziCheck")
const meaningCheck = document.querySelector("#meaningCheck")

let correctAnswer = ""
let correctOption = 0;
start()
function start() {
    // if everything is done, reset everything
    if(done.length == goresans.length)
        done = [];
    
    let qNum;
    do {
        qNum = Math.floor(Math.random() * goresans.length);
    } while(done.includes(qNum))
    doneText.textContent = `${done.length}/${goresans.length}`;
    done.push(qNum);
    question.textContent = goresans[qNum]
    meaning.textContent = means[qNum]
    correctAnswer = pinyins[qNum]

    let answers = [correctAnswer]
    for(let i = 0; i < 5; i++) {
        const ranNum = Math.floor(Math.random() * goresans.length)
        const pinyin = pinyins[ranNum]
        if(ranNum == qNum || pinyin == correctAnswer || answers.find(an => an == pinyin))
            i--
        else
            answers.push(pinyin)
    }
    answers = shuffle(answers)
    
    answers.forEach((answer, i) => {
        options[i].innerText = answer;
    })

    options.forEach((option, i) => {
        if(option.textContent == correctAnswer)
            correctOption = i
        option.onclick = () => {
            const answer = option.textContent;
            if(answer == correctAnswer) {
                option.textContent += "✅"
            }
            else {
                options[correctOption].textContent += "✅"
                option.textContent += "❌"
            }
            question.style.display = "block"
            meaning.style.display = "block"
            setTimeout(() => {
                start()
                hanziCheck.onchange()
                meaningCheck.onchange()
            }, 1000);
        }
    })
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}


hanziCheck.onchange = () => {
    const state = hanziCheck.checked
    question.style.display = state ? "block" : "none"
}
meaningCheck.onchange = () => {
    const state = meaningCheck.checked
    meaning.style.display = state ? "block" : "none"
}
