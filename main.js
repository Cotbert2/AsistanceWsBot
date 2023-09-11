
//dependencies

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const hourHandler = require('./hourHandler');
const dat = require('./num.json')
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const child_process = require('child_process');


const list = {
    
}


let fileName = `${hourHandler.hour().date}_0${hourHandler.hour().month}.txt`
const listString  = `Listado 10267 ${fileName}`
console.log(dat)

const createFileSync = () => {
    if (!fs.existsSync(path.join(__dirname, fileName))){
        fs.writeFileSync( path.join(__dirname,fileName), `Listado 10267 ${fileName}`);
        
    }
}


const myClient = new Client({
    puppeteer: {
        headless: false
    },
    authStrategy: new LocalAuth()
});



const num = (number) => {
    return number.substring(3,12);
}




const  verifyTime = () => {
    createFileSync();
    if(hourHandler.hour().hour >= 11 && hourHandler.hour().hour < 20  ){
        console.log(true);
        return true;
    }else {
        console.log(false);
        return false;
    }    
}

myClient.on('qr', (qr) => {
    console.log(qr);
    qrcode.generate(qr)
});

myClient.on('ready', () => {
    console.log('ok');
});

myClient.on('authenticated', (session) => {
    console.log('auth');
});

myClient.on('message', (msg) => {
    if (msg.body.toLocaleLowerCase() == 'presente'  
    &&(hourHandler.hour().day == 1 || hourHandler.hour().day == 3 || hourHandler.hour().day == 5)
    && verifyTime()
    ){
        console.log(num(msg.from));
        let numRaw = num(msg.from);
        if(dat[numRaw] != "" && list[numRaw] != true){
            msg.reply(`Hola ${dat[numRaw]}!, tu asistencia ha sido registrada exitosamente`);
            list[numRaw] = true;
            child_process.execSync(`sh insertinFile.sh ${dat[numRaw]} ${fileName}`)
        } else if(list[numRaw] == true){
            msg.reply(`Que ya estás en lista gil`);
        }
        
        //msg.reply(`Registrado en el sistema ${msg.author}`);
        //Callfun
    }
    console.log(msg.body);
});

console.log(hourHandler.hour());
setInterval(verifyTime, 3000);


app.get('/', (req,res) => {
    res.send('ok');
});

myClient.initialize();