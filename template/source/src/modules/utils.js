export function getPropertyMap(source, prop) {
  let map = {};
  source.map(mod => map[mod.name] = mod[prop]);
  return map;
}
