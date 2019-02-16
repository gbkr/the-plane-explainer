import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { aircraftInDirection } from './helpers';
import { AIRCRAFT_SERVER_URL } from '../env';
import { API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE } from './redux';
import { Location } from 'expo';

const aircraftWithinKilometerRange = 30;

export function* watcherSaga() {
  yield takeLatest(API_CALL_REQUEST, workerSaga);
}

function fetchAircraft(location={}) {
  return axios.post(`${AIRCRAFT_SERVER_URL}/api/feed`, {
    ...location,
    dist: aircraftWithinKilometerRange,
  });
}

function* workerSaga(action) {
  try {
    const { coords: { longitude: lng, latitude: lat } } = yield Location.getCurrentPositionAsync({})
    const location = { lng, lat };
    const response = yield call(fetchAircraft, location);
    const aircraft = response.data;
    if (typeof aircraft === 'string') throw aircraft;
    if (aircraft.length == 0) throw 'No aircraft data found';
    const sortedAircraft = yield call(aircraftInDirection, action.userDirection, location.lat, location.lng, aircraft);
    yield put({ type: API_CALL_SUCCESS, aircraft: sortedAircraft });
  } catch (error) {
    yield put({ type: API_CALL_FAILURE, error });
  }
}