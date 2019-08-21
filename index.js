import { Wechaty } from 'wechaty';
import { PuppetPadpro } from 'wechaty-puppet-padpro';

const WECHATY_PUPPET_PADPRO_TOKEN = 'puppet_padpro_32haef0jodv7tyax'

const puppet = new PuppetPadpro({
    token: WECHATY_PUPPET_PADPRO_TOKEN,
    PADPRO_REPLAY_MESSAGE: true,
})


const bot = new Wechaty({
    puppet,
})

function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

let guessNumber;
let guess = {};

bot
    .on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode)}`))
    .on('login', user => console.log(`User ${user} logined`))
    .on('message', async msg => {
        const contact = msg.from()
        const text = msg.text()
        const room = msg.room()
        if (room) {
            const topic = await room.topic()
            if (topic === '猜数字') {
                if (contact.id === 'loveyoubaby13145120') {
                    return;
                }
                if (/^猜数字$/i.test(text)) {
                    await msg.say('猜数字游戏开始');
                    guess = {};
                    guessNumber = randomNum(0, 10);
                    console.log('Guess number:', guessNumber);
                    return;
                }

                if (guessNumber !== undefined) {
                    if (isNaN(text)) {
                        return;
                    }

                    const userGuessNumber = parseFloat(text);

                    if (userGuessNumber > guessNumber) {
                        guess[contact.id] = {
                            name: contact.name(),
                            n: guess[contact.id] ? guess[contact.id].n + 1 : 1,
                        };

                        await msg.say(`@${contact.name()} 大了`);
                        return;
                    }

                    if (userGuessNumber < guessNumber) {
                        guess[contact.id] = {
                            name: contact.name(),
                            n: guess[contact.id] ? guess[contact.id].n + 1 : 1,
                        };

                        await msg.say(`@${contact.name()} 小了`);
                        return;
                    }

                    if (userGuessNumber === guessNumber) {
                        guess[contact.id] = {
                            name: contact.name(),
                            n: guess[contact.id] ? guess[contact.id].n + 1 : 1,
                        };
                        let t = `恭喜${contact.name()}，猜对了，就是${guessNumber}\n以下是大家的猜词统计：\n`;
                        Object.keys(guess).forEach(key => {
                            t += `${guess[key].name}: 猜词${guess[key].n}次\n`;
                        })
                        await msg.say(t);
                        guess = {};
                        guessNumber = undefined;
                        return;
                    }
                }
            }
        }


    })
    .start()

