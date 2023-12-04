import path from "path";
import os from "os";
import fsExtra from "fs-extra";

const CONFIG_FILE_NAME = "auth.json";
const CONFIG_FOLDER_NAME = ".crowdbotics";

const HOME_DIR = process.env.HOME || process.env.USERPROFILE || os.homedir();
const CONFIG_FOLDER_PATH = path.resolve(HOME_DIR, CONFIG_FOLDER_NAME);
const CONFIG_FILE_PATH = path.resolve(CONFIG_FOLDER_PATH, CONFIG_FILE_NAME);

class ConfigFile {
  constructor() {
    this._configData = this._getConfigDataFromFile();
  }

  get(name) {
    return this._configData[name];
  }

  set(name, value) {
    this._configData[name] = value;
  }

  save() {
    fsExtra.mkdirSync(CONFIG_FOLDER_PATH, { recursive: true });
    fsExtra.writeJSONSync(CONFIG_FILE_PATH, this._configData, { flag: "w" });
  }

  _getConfigDataFromFile() {
    if (!fsExtra.existsSync(CONFIG_FILE_PATH)) {
      return {};
    }

    try {
      return fsExtra.readJSONSync(CONFIG_FILE_PATH);
    } catch {
      return {};
    }
  }
}

// Singleton pattern for Config file to prevent multiple instantiation.
export const configFile = new ConfigFile();
