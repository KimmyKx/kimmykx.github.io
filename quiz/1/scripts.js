const gStr = "的，是，一，個，我，有，不，也，們，你，都，說，要，人，對，很，來，和，她，好，以，年，到，沒，大，去，他，做，看，兩，後，什，麼，時，候，台／臺，多，用，想，現，天，前，可，能，月，小，知，道，家，嗎，問，新，給，呢，三，位，吃，元，工，日，子，歲，灣，太，東，西，媽，老，師，怎，幾，高，妳，學，生，美，國，今，本，中，水，書，吧，愛，帶，起，請，走，二，喜，歡，外，點，話，四，昨，校，找，叫，分，爸，朋，友，寫，聽，買，五，先，半，錢，您，車，誰，打，拿，路，快，哪，十，謝，坐，少，久，字，六，喝，裡／裏，兒，同，早，女，七，晚，上，八，英，下，午，茶，姐，電，百，手，機，名，號，哥，法，千，九，咖，啡，妹，飯，弟，明，覺，再，見，姓，星，期，安"
const pStr = "De, shì, yī, gè, wǒ, yǒu, bù, yě, men, nǐ, dōu, shuō, yào, rén, duì, hěn, lái, hé, tā, hǎo, yǐ, nián, dào, méi, dà, qù, tā, zuò, kàn, liǎng, hòu, shén, me, shí, hòu, tái/tái, duō, yòng, xiǎng, xiàn, tiān, qián, kě, néng, yuè, xiǎo, zhī, dào, jiā, ma, wèn, xīn, gěi, ne, sān, wèi, chī, yuán, gōng, rì, zi, suì, wān, tài, dōng, xī, mā, lǎo, shī, zěn, jǐ, gāo, nǎi, xué, shēng, měi, guó, jīn, běn, zhōng, shuǐ, shū, ba, ài, dài, qǐ, qǐng, zǒu, èr, xǐ, huān, wài, diǎn, huà, sì, zuó, xiào, zhǎo, jiào, fēn, bà, péng, yǒu, xiě, tīng, mǎi, wǔ, xiān, bàn, qián, nín, chē, shuí, dǎ, ná, lù, kuài, nǎ, shí, xiè, zuò, shǎo, jiǔ, zì, liù, hē, lǐ/lǐ, er, tóng, zǎo, nǚ, qī, wǎn, shàng, bā, yīng, xià, wǔ, chá, jiě, diàn, bǎi, shǒu, jī, míng, hào, gē, fǎ, qiān, jiǔ, kā, fēi, mèi, fàn, dì, míng, jué/jiào, zài, jiàn, xìng, xīng, qī, ān"
const mStr = "Particle, is/correct, one, unit/count, me/myself, have, no, also/too, we/us, you, all, say, want, people/person, yes, very, come, and, she, good, to, years, arrive, no, big, go, he, do, see, both, later, what, what, time, time/season, stage, many, use, think/miss, present, day, before, can, can/ability, month, small, know, road, home, What(particle), ask, new, give, what(particle), three, position/place, eat, basic, work, day, son, age, bay, over/overmuch, east, west, mother, old, teacher/expert, how, a few, high, you(women), learn, Health/life, beauty, country, today, origin/real/book, middle, water, book, (particle), love, striped, get up, please, walk/run/go, two, like, like, outside, point/times unit, talk, four, yesterday, school, find, call, minute/part, dad, friend, friend, write, listen, buy, five, first/early/former, half, money, you(formal), car, who, hit, take, road, fast, where, ten, thanks, sit, less, long/long time, word, Six, drink, (particle), child, same, morning, female, seven, evening/night, upper, eight, English, afternoon, afternoon, tea, elder sister, electricity, hundred, hand, machine, name, number, elder brother, law, Thousand, nine, coffee, coffee, little sister, rice, little brother, bright/tomorrow, sleep, see you again, see you again, last name, star/day, period, peace/safe"

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
