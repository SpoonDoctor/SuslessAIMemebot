import * as express from 'express';
import {handleCommand, handleAcronym} from '../commandHandler';


const router = express.Router();

router.use(express.urlencoded({extended: false}));
router.use(express.json());

router.post('/', (req: express.Request, res: express.Response) => {
    const messageText: string = req.body.text;
    if(req.body && messageText.indexOf('/meme') !== -1 && req.body.sender_type === "user"){
        handleCommand(messageText);
    } else if(req.body && messageText.indexOf('/acronym') !== -1 && req.body.sender_type === "user"){
        handleAcronym(messageText);
    }
    res.sendStatus(200);
});

export {router};