const degreesToRadians = (deg) => {
  return deg * Math.PI / 180
}

const radiansToDegrees = (radians) => {
  return radians * 180 / Math.PI;
}

const feetInMeters = 3.2808;

// Haversine formula to calculate great-circle distance
// https://www.movable-type.co.uk/scripts/latlong.html

export const distance = (lat1, lng1, lat2, lng2, altitudeInFeet) => {
  const earthRadiusInMeters = 6371e3;
  const φ1 = degreesToRadians(lat1);
  const φ2 = degreesToRadians(lat2);
  const Δφ = degreesToRadians(lat2 - lat1);
  const Δλ = degreesToRadians(lng2 - lng1);

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = earthRadiusInMeters * c;

  const altInMeters = altitudeInFeet / feetInMeters;
  const hypotenuse = Math.sqrt(Math.pow(d, 2) + Math.pow(altInMeters, 2))
  return hypotenuse / 1000;
}

export const bearing = (lat1, lng1, lat2, lng2) => {
  const φ1 = degreesToRadians(lat1);
  const λ1 = degreesToRadians(lng1);
  const φ2 = degreesToRadians(lat2);
  const λ2 = degreesToRadians(lng2);

  const y = Math.sin(λ2 - λ1) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1);
  const brng = radiansToDegrees(Math.atan2(y, x));
  const compassBrng = 360 - ((brng + 360) % 360);
  return compassBrng;
}

export const aircraftInDirection = (userDirection, usrlat, usrlng, aircraft) => {
  const enhanceAircraft = aircraft.map(e => {
    const bearingFromNorth = bearing(usrlat, usrlng, e.Lat, e.Long);
    const bearingFromUserBearing = ((Math.abs(bearingFromNorth - userDirection) % 180) + 180) % 180
    return { ...e, bearingFromUserBearing };
  })

  let sortedAircraft = enhanceAircraft.sort((a, b) => {
    return a.bearingFromUserBearing - b.bearingFromUserBearing;
  })

  return sortedAircraft;
}

export const timeAgoInWords = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const dt = Math.abs(d2 - d1) / 1000;
  const sec = (dt % 60).toFixed(2);
  const totalMin = Math.floor(dt / 60);
  const min = totalMin % 60;
  const hours = Math.floor(totalMin / 60);
  if (hours > 24) return 'more than a day ago';
  const dtInWords = (min == 0) ? `${sec}s` :
    (hours == 0) ? `${min}m ${sec}s` : `${hours}h ${min}m ${sec}s`;
  return `${dtInWords} ago`;
}

