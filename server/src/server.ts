import express from 'express';
import bodyParser from "body-parser";
import compression from 'compression';
import cors from 'cors';

import { AircraftController } from './controllers';

const app: express.Application = express();

const port: number = +(process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());

app.use('/api/feed', AircraftController);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});

