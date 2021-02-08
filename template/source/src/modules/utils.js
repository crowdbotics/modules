export function getPropertyMap(source, prop) {
  let map = {};
  source.map(mod => {
    if (mod[prop]) {
      map[mod.name] = mod[prop]
    }
  });
  return map;
}
