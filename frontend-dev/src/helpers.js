export function findMaxId(objects) {
  return Math.max(...Object.keys(objects).map(key => parseInt(key)));
}
