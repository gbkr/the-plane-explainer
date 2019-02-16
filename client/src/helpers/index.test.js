import React from 'react';
import {
  bearing,
  distance,
  timeAgoInWords,
  aircraftInDirection,
} from './index'

describe("bearing", () => {
  it('A. calculates initial bearing from 2 sets of lat/lng coordinates', () => {
    const brng = bearing('50.0', '0.35', '51.000', '0.35');
    expect(brng.toFixed(2)).toBe('360.00');
  })


  it('B. calculates initial bearing from 2 sets of lat/lng coordinates', () => {
    const brng = bearing('51.7527', '0.3394', '51.676987', '0.567874');
    expect(brng.toFixed(2)).toBe('241.95');
  })
});

describe("distance", () => {
  it('A. calculates the distance between 2 sets of lat/lng coordinates', () => {
    const dist = distance('0', '0', '10', '10', 1);
    expect(dist.toFixed(2)).toBe('1568.52');
  })

  it('B. calculates the distance between 2 sets of lat/lng coordinates', () => {
    const dist = distance('51.7527', '0.3394', '51.676987', '0.567874', 1);
    expect(dist.toFixed(2)).toBe('17.85');
  })

  it("A. calculates the distance between a ground point and nearby point in the very high sky", () => {
    const dist = distance('0', '0', '1', '1', 328084);
    expect(dist.toFixed(2)).toBe('186.35');
  })

  it("B. calculates the distance between a ground point and aircraft", () => {
    const dist = distance('51.7527', '0.3394', '51.676987', '0.567874', 30000);
    expect(dist.toFixed(2)).toBe('20.06');
  })
});

describe ('timeAgoInWords', () => {
  it ('return the time ago in words if the period is more than a day', () => {
    const d1 = 1547078400000;
    const d2 = 1549821018910;
    expect(timeAgoInWords(d1, d2)).toBe('more than a day ago');
  })

  it ('returns the time ago in words showing hours, minutes and seconds', () => {
    const d1 = 1549756800000;
    const d2 = 1549821018910;
    expect(timeAgoInWords(d1, d2)).toBe('17h 50m 18.91s ago');
  })

  it ('returns the time ago in words showing minutes and seconds', () => {
    const d1 = 1549819138708;
    const d2 = 1549819251684;
    expect(timeAgoInWords(d1, d2)).toBe('1m 52.98s ago');
  })

  it ('returns the time ago in words showing only seconds', () => {
    const d1 = 1549821013519;
    const d2 = 1549821018910;
    expect(timeAgoInWords(d1, d2)).toBe('5.39s ago');
  })
})

describe('aircraftInDirection', () => {
  const aircraft = [
    {
      "Id": 1,
      "Lat": 21.248422,
      "Long": -155.677910,
    },
    {
      "Id": 2,
      "Lat": 19.590844,
      "Long": -152.899593,
    },
    {
      "Id": 3,
      "Lat": 17.800996,
      "Long": -155.622804,
    }
  ];

  const usrLat = 19.896767;
  const usrLong = -155.582779;

  it ('returns the correct order of the aircraft when facing North', () => {
    expect(aircraftInDirection(1, usrLat, usrLong, aircraft).map(e => e["Id"])).toEqual([1, 2, 3]);
  })

  it ('returns the correct order of the aircraft when facing South', () => {
    expect(aircraftInDirection(180, usrLat, usrLong, aircraft).map(e => e["Id"])).toEqual([3, 2, 1]);
  })
})