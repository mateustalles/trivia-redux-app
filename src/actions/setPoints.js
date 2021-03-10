export default function setPoints(points) {
  const SET_POINTS = 'SET_POINTS';
  const actionToken = { type: SET_POINTS, points };
  return actionToken;
}
