const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')


const token = '5648580999:AAH477ppUY5fRUn86lwq3rBGRPl_V9oMvh8'

const bot = new TelegramApi(token, {polling: true})

const chats = {}



const startGame = async (chatID) => {
    await bot.sendMessage(chatID, `сейчас цифра загадается отгадывай`)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatID] = randomNumber;
    await bot.sendMessage(chatID, `отгадывай`, gameOptions);


}


const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'начальное приветствие'},
        {command: '/info', description: 'вывод имени и юзернейма пользователя'},
        {command: '/game', description: 'играть ща будем'},
    ])
    
    bot.on('message', async msg => {
        const text = msg.text; // получение текста сообщения 
        const chatID = msg.chat.id; //получение id чата 
        if (text === '/start') {
            await bot.sendSticker(chatID, 'https://cdn.tlgrm.app/stickers/f87/928/f8792879-6d47-3804-91fd-f5b585fb0c9e/192/8.webp')
            return bot.sendMessage(chatID, `Welcome to my telegram bot`) // отсылка сообщений пользователю
    
        }
        if (text === '/info') {
            await bot.sendMessage(chatID, `your name : ${msg.from.first_name} your username : ${msg.from.username}`) // отсылка сообщений пользователю
        }
        if (text ==='/game') {
            return startGame(chatID);
            
        }
        else{
        return bot.sendMessage(chatID, 'i don`t undertand u');
        }
        
    })
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatID = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatID);

        }
        if (data ==chats[chatID]) {
            await bot.sendSticker(chatID, `https://tlgrm.ru/_/stickers/837/98f/83798fe7-d57e-300a-93fa-561e3027691e/1.webp`);
            return bot.sendMessage(chatID, `ты тыкнулъ в цифру ${chats[chatID]} и угадалъ, congratulations!`, againOptions);
        }
        else {
            await bot.sendSticker(chatID, `https://tlgrm.ru/_/stickers/837/98f/83798fe7-d57e-300a-93fa-561e3027691e/7.webp`);
            return bot.sendMessage(chatID, `ты тыкнулъ в цифру  и проебався, надо было тыкать в ${chats[chatID]}` , againOptions);
        }


       
    })

}
start()