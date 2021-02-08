export function getPropertyMap(source, prop) {
  let map = {};
  source.map(mod => {
    if (mod[prop]) {
      map[mod.title] = mod[prop]
    }
  });
  return map;
}
