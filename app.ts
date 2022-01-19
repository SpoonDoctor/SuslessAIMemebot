import * as express from 'express';
import {router as mainRouter} from './router/mainRoute';

const app = express();

app.use('/', mainRouter);

app.listen(process.env.PORT || 8080, function () {
    console.log('Listening!');
});