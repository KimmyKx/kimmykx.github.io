const gStr = "入，叉，介，戶，支，世，付，另，巧，汁，皮，立，丟，合，朵／朶，死，汗，考，而，耳，低，克，利，助，努，呀，告，弄，折，步，決，沙，究，肚，足，例，刷，刻，叔，周，味，夜，奇，姊，居，怪，拉，油，注，爬，舍，阿，附，冒，哇，城，封，度，急，拜，查，洋，流，界，研，背，胖，苦，訂，食，借，剛，員，套，浴，消，留，破，祝，級，臭，酒，乾，假，健，務，匙，參，商，啦，婚，宿，寄，康，捷，掉，排，清，瓶，甜，畢，盒，笨，紹，統，船，莓，被，逛，陪，鳥，麻，備，報，帽，提，敢，湯，無，程，窗，答，訴，超，隊，飲，傳，感，楚，業，概，溫，矮，碗，裙，裝，遊，慣，精，緊，聞，腿，舞，趕，輕，辣，酸，銀，需，餃，餅，廚，瘦，盤，碼，箱，趣，踢，輛，鞋，髮，鬧，澡，蕉，褲，選，龍，戲，戴，總，聰，賽，闆，雖，鮮，簡，舊，藍，騎，壞，簽，願，蘋，鹹，鐵，顧，讀，變，罐"
const pStr = "Rù, chā, jiè, hù, zhī, shì, fù, lìng, qiǎo, zhī, pí, lì, diū, hé, duǒ/duǒ, sǐ, hàn, kǎo, ér, ěr, dī, kè, lì, zhù, nǔ, ya, gào, nòng, zhé, bù, jué, shā, jiū, dù, zú, lì, shuā, kè, shū, zhōu, wèi, yè, qí, jiě, jū, guài, lā, yóu, zhù, pá, shě, ā, fù, mào, wa, chéng, fēng, dù, jí, bài, chá, yáng, liú, jiè, yán, bèi, pàng, kǔ, dìng, shí, jiè, gāng, yuán, tào, yù, xiāo, liú, pò, zhù, jí, chòu, jiǔ, gān, jiǎ, jiàn, wù, shi, cān, shāng, la, hūn, sù, jì, kāng, jié, diào, pái, qīng, píng, tián, bì, hé, bèn, shào, tǒng, chuán, méi, bèi, guàng, péi, niǎo, má, bèi, bào, mào, tí, gǎn, tāng, wú, chéng, chuāng, dá, sù, chāo, duì, yǐn, chuán, gǎn, chǔ, yè, gài, wēn, ǎi, wǎn, qún, zhuāng, yóu, guàn, jīng, jǐn, wén, tuǐ, wǔ, gǎn, qīng, là, suān, yín, xū, jiǎo, bǐng, chú, shòu, pán, mǎ, xiāng, qù, tī, liàng, xié, fà, nào, zǎo, jiāo, kù, xuǎn, lóng, xì, dài, zǒng, cōng, sài, bǎn, suī, xiān, jiǎn, jiù, lán, qí, huài, qiān, yuàn, píng, xián, tiě, gù, dú, biàn, guàn".toLowerCase()
const mStr = "Enter, fork, introduce, window, unit, world, pay, another, skill, juice, skin, stand, throw, close, flower unit, death, sweat, test, and, ear, low, gram, profit, help, Nu, ah, tell, alley, discount, step, decide, sand, investigate, belly, foot, example, brush, carve/moment, uncle, Zhou, taste, night, strange, sister, house, strange, pull, oil, note, Climb, house, a, attach, risk, wow, city, seal, degree, urgent, worship, check, ocean, flow, boundary, research, back, fat, bitter/suffer, order, food, borrow, recently, member, set, Bath, eliminate, stay, break, wish, grade, smell, wine, dry, holiday/fake, health, service, key, participate, business, la, marriage, accomodation, send, health, victory, drop, arrange, clear, bottle, sweet, graduate, box, stupid, introduce, system, boat, berry, quilt/passive voice, stroll, accompany, bird, troublesome, prepare, report, hat, mention, dare, soup, no, procedure, window, answer, complain, super, Team, drink, pass, sense, Chu, industry, approximate, warm, short, bowl, skirt, dress/pack, tour, habit, excellent, tight, smell, leg, dance, rush, light, spicy, sour, silver, need, Dumpling, cookie, kitchen, thin, plate, code, box, fun, kick, vehicle unit, shoes, hair, trouble, bath, banana, pants, selection, dragon, play (drama), wear, total, smart, competition, boss, although, Fresh, simple, old/used, blue, ride, bad, sign, wish, apple, salty, iron, look after, read, change, jar".toLocaleLowerCase()
    
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
