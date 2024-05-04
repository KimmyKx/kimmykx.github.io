const gStr = "丁，土，寸，切，及，反，夫，且，主，代，失，布，民，由，目，示，存，式，此，何，形，改，村，求，里，京，具，初，取，受，命，妻，姑，府，性，於，社，虎，保，品，哈，架，派，珍，眉，約，軍，孫，害，展，座，根，珠，神，般，除，偷，婆，救，殺，深，淺，猜，理，終，連，喔，寓，晴，棒，痛，象，費，貼，鄉，量，雲，傷，圓，極，煙／烟，煩，獅，義，舅，解，農，遇，厭，實，演，管，領，價，數，線，論，齒，器，整，燒，隨，舉／擧，櫃，類，籃，覽，觀"
const pStr = "Dīng, tǔ, cùn, qiè, jí, fǎn, fū, qiě, zhǔ, dài, shī, bù, mín, yóu, mù, shì, cún, shì, cǐ, hé, xíng, gǎi, cūn, qiú, lǐ, jīng, jù, chū, qǔ, shòu, mìng, qī, gū, fǔ, xìng, yú, shè, hǔ, bǎo, pǐn, hā, jià, pài, zhēn, méi, yuē, jūn, sūn, hài, zhǎn, zuò, gēn, zhū, shén, bān, chú, tōu, pó, jiù, shā, shēn, qiǎn, cāi, lǐ, zhōng, lián, ō, yù, qíng, bàng, tòng, xiàng, fèi, tiē, xiāng, liàng, yún, shāng, yuán, jí, yān/yān, fán, shī, yì, jiù, jiě, nóng, yù, yàn, shí, yǎn, guǎn, lǐng, jià, shù, xiàn, lùn, chǐ, qì, zhěng, shāo, suí, jǔ/jǔ, guì, lèi, lán, lǎn, guān".toLowerCase()
const mStr = "Ding, soil, inch, cut, and, anti, husband, and, main, generation, loss, cloth, people, by, eye, show, save, style, this, what, shape, change, village, seek, inside, Jing, Ju, Chu, take, accept, order, wife, aunt, house, sex, Yu, society, tiger, Bao, product, ha, frame, faction, treasure, eyebrow, about, army, grandson, harm, exhibition, seat, root, bead, god, like, except, steal, mother-in-law, save, kill, deep, shallow, guess, reason, end, connect, oh, apartment, clear, stick, pain, elephant, fee, stick, hometown, Quantity, cloud, injury, round, extreme, smoke/smoke, trouble, lion, righteousness, uncle, solution, farmer, encounter, disgust, reality, performance, tube, collar, price, number, line, theory, tooth, implement, assemble, burn, follow, lift/lift, cabinet, sort, basket, view, watch".toLocaleLowerCase()
    
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
