import fs from "fs";
import fse from "fs-extra";
import path from "path";
import config from "../config.js";

const modules = process.argv.slice(2);
const cwd = process.cwd();
const demoDir = path.join(process.cwd(), config.demo.directory);

const IGNORED_ENTRIES = ["meta.json", "node_modules"];

const filterFiles = (src, _) => !IGNORED_ENTRIES.includes(path.basename(src));

const copy = (origin, target) => {
  fs.mkdirSync(target, { recursive: true });
  fse.copySync(origin, target, { filter: filterFiles });
};

// define ENUMS
const MODULE_TYPE = {
  BACKEND: "backend",
  FRONTEND: "frontend",
  SCREEN: "screen",
  FULL: "full"
};

const getModuleType = (moduleName) => {
  // if name starts with django, it's a backend only module
  if (moduleName.startsWith("django")) {
    return MODULE_TYPE.BACKEND;
  }
  // if name starts with screen, it's a screen only module
  if (moduleName.startsWith("screen")) {
    return MODULE_TYPE.SCREEN;
  }
  // if name starts with react-native, it's a frontend only module
  if (moduleName.startsWith("react-native")) {
    return MODULE_TYPE.FRONTEND;
  }
  // otherwise it's a full module
  return MODULE_TYPE.FULL;
};

const copyFullModule = (module, originModuleDir, meta) => {
  const backendeModuleName = module.replace(/-/g, "_");
  const sourceBackend = path.join(demoDir, "backend", "modules", backendeModuleName, meta.root);
  const destBackend = path.join(originModuleDir, "backend", "modules", backendeModuleName);
  console.log("backend copying ...\n", sourceBackend, destBackend);
  copy(sourceBackend, destBackend);

  console.log("\n");
  const sourceFrontend = path.join(demoDir, "modules", module, meta.root);
  const destFrontend = path.join(originModuleDir, "modules", module);
  console.log("frontend copying ...\n", sourceFrontend, destFrontend);
  copy(sourceFrontend, destFrontend);
};

const copyBackendModule = (module, originModuleDir, meta) => {
  const backendeModuleName = module.replace(/-/g, "_");
  const sourceBackend = path.join(demoDir, "backend", "modules", backendeModuleName);
  const destBackend = path.join(originModuleDir, backendeModuleName);
  console.log("backend copying ...\n", sourceBackend, destBackend);
  copy(sourceBackend, destBackend);
};

const copyFrontendModule = (module, originModuleDir, meta) => {
  const sourceFrontend = path.join(demoDir, meta.root);
  const destFrontend = path.join(originModuleDir);
  console.log("frontend copying ...\n", sourceFrontend, destFrontend);
  copy(sourceFrontend, destFrontend);
};

const copyScreenModule = (module, originModuleDir, meta) => {
  const sourceFrontend = path.join(demoDir, meta.root);
  const destFrontend = path.join(originModuleDir);
  console.log("frontend copying ...\n", sourceFrontend, destFrontend);
  copy(sourceFrontend, destFrontend);
};

modules.forEach((module) => {
  process.chdir(cwd);
  const originModuleDir = path.join(process.cwd(), "modules", module);
  const meta = JSON.parse(
    fs.readFileSync(path.join(originModuleDir, "meta.json"), "utf8")
  );

  switch (getModuleType(module)) {
    case MODULE_TYPE.FULL:
      copyFullModule(module, originModuleDir, meta);
      break;
    case MODULE_TYPE.BACKEND:
      copyBackendModule(module, originModuleDir, meta);
      break;
    case MODULE_TYPE.FRONTEND:
      copyFrontendModule(module, originModuleDir, meta);
      break;
    case MODULE_TYPE.SCREEN:
      copyScreenModule(module, originModuleDir, meta);
      break;
    default:
      console.log("Module type not recognized");
  }
});
