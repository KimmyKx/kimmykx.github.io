const gStr = "了，讓，把，刀，已，才，化，片，冬，功，加，北，司，市，平，末，正，瓜，交，全，冰，各，回，如，忙，成，肉，色，行，但，作，冷，希，床／牀，忘，更，汽，言，身，始，定，宜，往，怕，或，放，易，狗，直，迎，近，亮，便，係，信，南，孩，客，思，春，洗，活，相，秋，穿，計，重，音，香，哭，夏，容，差，旁，旅，桌，海，特，班，病，站，笑，紙，送，院，隻，動，唱，啊，情，接，望，條，球，眼，票，第，累，習，蛋，袋，部，魚，單，場，椅，渴，然，畫，筆，等，舒，菜，視，貴，跑，進，間，黃，園，意，準，照，當，睛，筷，經，腦，腳，萬，試，跳，較，運，飽，像，圖，慢，歌，漂，睡，種，綠，認，語，遠，鼻，嘴，影，樓，熱，練，課，豬，賣，餓，樹，糕，興，貓，錯，餐，館，網，辦，幫，懂，應，聲，臉，禮，轉，醫，雙，雞／鷄，離，題，顏，藥，識，邊，關，難，麵／麪，體，廳"
const pStr = "Le, ràng, bǎ, dāo, yǐ, cái, huà, piàn, dōng, gōng, jiā, běi, sī, shì, píng, mò, zhèng, guā, jiāo, quán, bīng, gè, huí, rú, máng, chéng, ròu, sè, xíng, dàn, zuò, lěng, xī, chuáng, wàng, gèng, qì, yán, shēn, shǐ, dìng, yí, wǎng, pà, huò, fàng, yì, gǒu, zhí, yíng, jìn, liàng, biàn/pián, xì, xìn, nán, hái, kè, sī, chūn, xǐ, huó, xiāng, qiū, chuān, jì, zhòng, yīn, xiāng, kū, xià, róng, chà, páng, lǚ, zhuō, hǎi, tè, bān, bìng, zhàn, xiào, zhǐ, sòng, yuàn, zhī, dòng, chàng, a, qíng, jiē, wàng, tiáo, qiú, yǎn, piào, dì, lèi, xí, dàn, dài, bù, yú, dān, chǎng, yǐ, kě, rán, huà, bǐ, děng, shū, cài, shì, guì, pǎo, jìn, jiān, huáng, yuán, yì, zhǔn, zhào, dāng, jīng, kuài, jīng, nǎo, jiǎo, wàn, shì, tiào, jiào, yùn, bǎo, xiàng, tú, màn, gē, piào, shuì, zhǒng, lǜ, rèn, yǔ, yuǎn, bí, zuǐ, yǐng, lóu, rè, liàn, kè, zhū, mài, è, shù, gāo, xìng, māo, cuò, cān, guǎn, wǎng, bàn, bāng, dǒng, yīng, shēng, liǎn, lǐ, zhuǎn, yī, shuāng, jī/jī, lí, tí, yán, yào, shí, biān, guān, nán, miàn/miàn, tǐ, tīng"
const mStr = "past (particle), let, hold, knife, has, just, change, slice/part, winter, work, plus, north, division, city/market, flat/peace, end, just, melon, cross, whole, ice, each, back/around, if, busy, become, flesh, color, OK, but, work, cold, hope, bed, forget, even more, steam, word, body, beginning, certainly, proper, past/towards, afraid, or, put, easy, dog, straight, welcome, near, bright, easy, connection, letter/trust, south, child, guest, thinking, spring, washing, living, photo, autumn, wearing, plan/counting, heavy, sound, fragrance, crying, summer, tolerance, difference, beside, travel, table, sea, special, class, sick, stand/station, laugh, paper, send, building, (bird unit), move, sing, ah, feelings, connect, look, strip/long piece unit, ball, eye, ticket, number prefix, tired, study, Egg, bag, department, fish, single, field, chair, thirsty, natural, painting, pencil, wait, comfortable, dish, view, expensive, run, enter, room/building unit, yellow, garden, meaning, prepare, photo, when, Eyes, chopsticks, experience, brain, feet, tens of thousands, test, jump, comparison, luck, fullness, alike, picture, slow, song, drift, sleep, seed/kind, green, recognize, language, far, nose, mouth, shadow, stair, heat, practice, class, pig, sell, hungry, tree, cake, interest, cat, wrong, meal, establishment, internet/net, office, help, understand, answer, sound, face, present, turn, doctor, pair, chicken, away/let go, question, color, Medicine, knowledge, side, close, difficult, noodle, Body, Hall"

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
