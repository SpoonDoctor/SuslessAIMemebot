import * as https from 'https';
import * as fs from 'fs';
import {default as axios} from 'axios';
let FormData = require('form-data'); //Gotta be a better way to do this
import * as qs from 'qs';

export enum ImageID {
    DISTRACTED = 112126428,
    BATMANSLAP = 438680,
    TWOBUTTONS = 87743020,
    DRAKE = 181913649,
    ONEDOESNOT = 61579,
    MOCKINGSB = 102156234,
    EXPANDING = 93895088,
    CHANGEMYMIND = 129242436,
    OFFRAMP = 124822590,
    ALIENS = 101470,
    THINKABOUTIT = 89370399,
    FUTURAMAFRY = 61520,
    BOARDMEETING = 1035805,
    SKELETON = 4087833,
    XEVERYWHERE = 91538330,
    WOMANYELLINGATCAT = 188390779,
    NUTBUTT = 119139145,
    INTERESTINGMAN = 61532,
    CHEERS = 5496396,
    SURPRISEDPIKA = 155067746,
    PIGEON = 100777631,
    SEAGULL = 114585149,
    DOGE = 8072285,
    DISASTER = 97984,
    THEROCK = 21735,
    YALLGOTANY = 124055727,
    HIDETHEPAIN = 27813981,
    SCROLLTRUTH = 123999232,
    BEGREAT = 563423,
    THIRDWORLDSKEPTIC = 101288,
    UNO = 217743513,
    FINDINGNEVERLAND = 6235864,
    TRUMP = 91545132,
    TUXEDOPOOH = 178591752,
    SMUGSPONGEBOB = 101511,
    YODA = 14371066,
    GRANDMA = 61556,
    TOM = 175540452,
    THIRDWORLDSUCCESS = 101287,
    HANDSHAKE = 135256802,
    EVILKERMIT = 84341851,
    MARKEDSAFE = 161865971,
    WHOKILLED = 135678846,
    SWALLOW = 132769734,
    HEADOUT = 196652226
}


interface AxiosOptions {
    method: "GET" | "POST";
    baseURL: string;
    url: string;
    data?: any;
    headers: any;
    httpsAgent: any;
    withCredentials: true;
}

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    cert: fs.readFileSync('./SSL/cert.pem'),
    key: fs.readFileSync('./SSL/key.pem'),
    passphrase: 'pass'
});

export async function getAIMeme(imgId: ImageID): Promise<string> {

    const dataGetOptions: AxiosOptions = {
        method: "GET",
        baseURL: "https://imgflip.com",
        url: '/ajax_get_le_data',
        headers: {
            'Accept': '*/*',
            'Connection': 'keep-alive',
            'Host': 'imgflip.com'
        },
        httpsAgent,
        withCredentials: true
    }
    const dataGetResponse: any = await axios.request(dataGetOptions).catch((error: any) => {
        console.log(error);
    });

    const cookies: any = dataGetResponse.headers["set-cookie"];
    const __tok: any = dataGetResponse.data.__tok;
    

    let getMemeTextCookieString: string = parseCookies(cookies);

    const form = new FormData();
    form.append('meme_id', imgId);
    form.append('init_text', '');
    form.append('__tok', __tok);
    form.append('__cookie_enabled', '1');

    const formHeaders = form.getHeaders();

    const getMemeTextOptions: AxiosOptions = {
        method: "POST",
        baseURL: "https://imgflip.com",
        url: '/ajax_ai_meme',
        headers: {
            'Accept': '*/*',
            'Connection': 'keep-alive',
            'Host': 'imgflip.com',
            'Cookie': getMemeTextCookieString,
            ...formHeaders
        },
        httpsAgent,
        data: form,
        withCredentials: true
    }

    const memeTextGetResponse: any = await axios.request(getMemeTextOptions).catch((error: any) => {
        console.log(error);
    });

    const memeText: any = memeTextGetResponse.data.texts;

    const textBoxes = [];

    for(const text of memeText){
        textBoxes.push({text})
    }

    const queryParams = qs.stringify({
        template_id: imgId,
        username: "AIMemeBot",
        password: 'thisismypassword1',
        boxes: textBoxes
    });

    const captionImageOptions: AxiosOptions = {
        method: 'POST',
        baseURL: 'https://api.imgflip.com',
        url: "/caption_image?" + queryParams,
        headers: {'content-type': 'application/json'},
        httpsAgent,
        withCredentials: true
    }

    const captionImageResponse: any = await axios.request(captionImageOptions).catch((error: any) => {
        console.log(error);
    });

    return captionImageResponse.data.data.url;
}

function parseCookies(cookies: any): string {
    let cookieString: string = '';
    let addSpace: boolean = false;
    for(let cookie of cookies){
        if(addSpace){
            cookieString += ' ';
        }
        addSpace = true;
        const endOfCookie: number = cookie.indexOf(';');
        const usefulBit: string = cookie.substring(0, endOfCookie+1);
        cookieString += usefulBit
    }
    return cookieString;
}