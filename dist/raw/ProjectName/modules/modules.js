import { YourAppModule } from "./yourapp"

const sortNavigators = (a, b) => {
  if (a.value.hasOwnProperty("navigator") && b.value.hasOwnProperty("navigator")) {
    return 0;
  } else if (a.value.hasOwnProperty("navigator")) {
    return -1;
  } else {
    return 1;
  }
}

const sortMenu = (a, _) => {
  if (a.value.title == "App Menu") {
    return -1;
  } else {
    return 0;
  }
}

const addTitle = item => {
  const humanizeName = (name) => {
    let title = name.replace(/([A-Z])/g, " $1");
    title = title.charAt(0).toUpperCase() + title.slice(1);
    return title
  }

  let { name, value } = item;

  if (!(value && value.hasOwnProperty("title"))) {
    Object.assign(item.value, { title: humanizeName(name) })
  }

  return item
}

const addPlaceholderModule = modules => {
  if (!(modules.length && modules[0].value.hasOwnProperty("navigator"))) {
    modules.splice(0, 0, YourAppModule)
  }
}

export const getModules = (manifest) => {
  modules = manifest.map(addTitle).sort(sortNavigators).sort(sortMenu);

  addPlaceholderModule(modules)

  return modules;
}

export function getPropertyMap(source, prop) {
  let map = {};
  source.map(mod => {
    if (mod[prop]) {
      map[mod.title] = mod[prop]
    }
  });
  return map;
}
