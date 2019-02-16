import { Router, Request, Response } from 'express';
import axios, { AxiosResponse, AxiosError } from 'axios';
const aircraftWithinKilometerRange = 30
const aircraftListURL = 'http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json';

const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
  const { lat, lng, dist = aircraftWithinKilometerRange } = req.body;

  if (typeof lat === 'undefined' || typeof lng === 'undefined') {
    return res.send({
      error: 'Please specify lat and lng'
    })
  }

  const boundedAreaParams = `?lat=${lat}&lng=${lng}&fDstU=${dist}&fDstL=0`;

  axios.get(`${aircraftListURL}${boundedAreaParams}`)
    .then((resp: AxiosResponse) => {
      return res.send(resp.data['acList'])
    })
    .catch((e: AxiosError) => {
      console.error(e);
      res.send('Error contacting server')
    });
});

export const AircraftController: Router = router;
