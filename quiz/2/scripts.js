const gStr = "又，口，山，己，公，心，文，方，比，火，牛，王，出，包，句，只，右，奶，它，左，白，件，休，共，因，在，地，自，衣，住，別，每，男，那，事，些，店，念，房，所，服，杯，果，枝，玩，空，花，長，門，雨，非，室，為，紅，面，風，飛，息，氣，真／眞，馬，唸，夠，常，張，得，從，教，這，就，最，短，開，黑，塊，會，跟，過，樂，樣，頭，還，鐘"
const pStr = "Yòu, kǒu, shān, jǐ, gōng, xīn, wén, fāng, bǐ, huǒ, niú, wáng, chū, bāo, jù, zhǐ, yòu, nǎi, tā, zuǒ, bái, jiàn, xiū, gòng, yīn, zài, de/dì, zì, yī, zhù, bié, měi, nán, nà, shì, xiē, diàn, niàn, fáng, suǒ, fú, bēi, guǒ, zhī, wán, kōng, huā, zhǎng/cháng, mén, yǔ, fēi, shì, wèi, hóng, miàn, fēng, fēi, xí, qì, zhēn/zhēn, mǎ, niàn, gòu, cháng, zhāng, dé, cóng, jiào, zhè, jiù, zuì, duǎn, kāi, hēi, kuài, huì, gēn, guò, lè/yuè, yàng, tóu, hái, zhōng"
const mStr = "also/again, mouth, mountain, self, public, heart, text/language, square, compare, fire, cow, king, out, bag, sentence, only, right, milk, it, left, white, piece(unit), rest, common, cause, In, ground, self, clothing, live, don't/other, every, male, that, things, several/some, shop, think/idea, room, place, clothing, cup, fruit, branch/unit, play, empty/sky, flower, long, door, rain, Non, room, for, red, surface, wind, fly, breath, gas, serious/really, horse, read, enough, often, open, get, from, teach, this, just, most, short, open, black, block(unit), able, with/and, pass, happy/song, like, head, still, bell/hour"

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
