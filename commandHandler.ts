import {ImageID, getAIMeme} from './memeGen';
import {default as axios} from 'axios';
import acronymresolver = require("acronymresolver");

interface GMReqOptions {
    method: 'POST';
    baseURL: string;
    data: any;
    headers: any;
}

function randomEnumKey(): string {
    const IDKeys = Object.keys(ImageID).filter(x => !(parseInt(x) >= 0));
    const randomIndex = Math.floor(Math.random() * IDKeys.length);
    return IDKeys[randomIndex];
}

export async function handleAcronym(messageText: string): Promise<void>{
    const acronymText: string = messageText.substring('/acronym '.length).trim().toUpperCase();
    let groupmeText: string = "Acronym is too long. Must be under 15 chars."
    if(acronymText.length < 15){
        groupmeText = acronymresolver(acronymText);
    } else if(acronymText.length == 0){
        groupmeText = "You forgot the acronym, bonehead."
    }

    if(groupmeText.trim() !== ''){

        const groupmeMessageContent = {
            'bot_id': process.env.BOT_ID,
            'text': groupmeText
        };

        const gmReqOptions: GMReqOptions = {
            method: 'POST',
            baseURL: 'https://api.groupme.com/v3/bots/post',
            data: groupmeMessageContent,
            headers: {"content-type": "application/json"}
        }

        await axios.request(gmReqOptions).catch((error: any) => {
            console.log(error);
        });
    }
}

function getRandomInt(min: number, max: number): number{
    return Math.floor(Math.random() * (max - min)) + min;
}

export async function handleCommand(messageText: string): Promise<void>{
    let groupMeText: string = '';
    if(messageText.indexOf('-templates') !== -1){
        groupMeText = 'The following meme templates are currently supported: ';
        const IDKeys = Object.keys(ImageID).filter(x => !(parseInt(x) >= 0));
        for(let templateType of IDKeys){
            groupMeText += (templateType + '  ');
        }
    }
    else if(messageText.length > 6){
        const templateType: string = messageText.substring('/meme '.length).trim().toUpperCase();
        const templateId: ImageID = ImageID[templateType as keyof typeof ImageID];
        if(templateId){
            groupMeText = await getAIMeme(templateId);
        } else {
            groupMeText = 'Bad template name';
        }
    }
    else{
        groupMeText = await getAIMeme(ImageID[randomEnumKey() as keyof typeof ImageID]);
    }
    if(groupMeText !== ''){
        const groupmeMessageContent = {
            'bot_id': process.env.BOT_ID,
            'text': groupMeText
        };

        const gmReqOptions: GMReqOptions = {
            method: 'POST',
            baseURL: 'https://api.groupme.com/v3/bots/post',
            data: groupmeMessageContent,
            headers: {"content-type": "application/json"}
        }

        await axios.request(gmReqOptions).catch((error: any) => {
            console.log(error);
        });
    }
}

