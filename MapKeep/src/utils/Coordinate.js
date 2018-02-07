export const equalityCoordinatesFunc = (coordinate) => {
  return item => item.lng === coordinate.lng && item.lat === coordinate.lat;
};

export const equalityCoordinates = (coordinate, item) => {
  return item.lng === coordinate.lng && item.lat === coordinate.lat;
};

export const distance = (lat1, lon1, lat2, lon2) => {
  let radlat1 = Math.PI * lat1 / 180;
  let radlat2 = Math.PI * lat2 / 180;
  let theta = lon1 - lon2;
  let radtheta = Math.PI * theta / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist)
  dist = dist * 180 / Math.PI
  dist = dist * 60 * 1.1515
  return dist
}

export const coordinatesSydney = {
  latitude: -33.865143,
  longitude: 151.209900,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}