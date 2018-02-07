export const equalityCoordinatesFunc = (coordinate) => {
  return item => item.lng === coordinate.lng && item.lat === coordinate.lat;
};

export const equalityCoordinates = (coordinate, item) => {
  return item.lng === coordinate.lng && item.lat === coordinate.lat;
};