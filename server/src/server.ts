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


// https://www.movable-type.co.uk/scripts/latlong.html
// the client sends a lat & long coordinates
// it receives back an array af aircraft within the vicitity
// the client calculates the bearing from itself to each aircraft
// it then takes a compass bearing and calculates which
// aircraft is the most likely for it to be pointing at
// it shows this to the user, as well as the distance to the
// aircraft (taking height of the aircraft into account).
// at the bottom of the page it says something like
// 'not the plane you were expecting? see x other planes nearby'
// pressing that will pull up a list of nearby planes, their bearing
// and distance and all associated info
// there should also be a refresh button somewhere to receive up-to-date info
