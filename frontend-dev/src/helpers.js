export function findMaxId(objects) {
  debugger;
  return Math.max(...Object.keys(objects).map(key => parseInt(key)));
}
