import { configFile } from "../utils/configFile.js";
import { AMPLITUDE_API_KEY, OPT_IN_NAME } from "./config.js";
import { init, track, Identify, identify } from "@amplitude/analytics-node";
import { CUSTOMER_TYPE } from "./constants.js";
import { currentUser } from "../utils/user.js";

/**
 * Wrapper class for Amplitude analytics
 * @class AmplitudeWrapper
 * @property {Object} user - The user object
 */
class AmplitudeWrapper {
  get userType() {
    // acceptable return values: CB Employee, Agency, Customer
    // TODO: Implement once we have the data available in the UserSerializer
    // for is_agency_member and is_internal_cb_employee
    return undefined;
  }

  get optedIn() {
    return configFile.get(OPT_IN_NAME);
  }

  async init({ token = AMPLITUDE_API_KEY, options = {} } = {}) {
    if (!this.optedIn) return;
    if (!token) return;
    try {
      init(token, options);
    } catch {}
  }

  async identifyUser(user) {
    await currentUser.setUser(user);
    if (!currentUser.get("id")) return;

    const identifyEvent = new Identify();
    identifyEvent.set("Django Id", currentUser.get("id"));
    identify(identifyEvent, {
      user_id: currentUser.get("email")
    });
  }

  getAppProps(app) {
    if (!app) return {};
    return {
      "App Customer Type":
        app && app.is_enterprise ? CUSTOMER_TYPE.ENT : CUSTOMER_TYPE.SMB,
      "App ID": app.id
    };
  }

  getUserProps() {
    const org = currentUser.get("organization");
    return {
      "User Type": this.userType,
      "Org ID": org?.id,
      Source: "CLI"
    };
  }

  async sendEvent({ name, properties = {}, user, app }) {
    console.log("Opted in?", this.optedIn);
    if (!this.optedIn) return;
    try {
      await this.identifyUser(user);
      if (currentUser.get("email")) {
        const updatedProps = Object.assign(
          {},
          properties,
          this.getAppProps(app),
          this.getUserProps()
        );

        track(name, updatedProps, {
          user_id: currentUser.get("email")
        });
      }
      // TODO: Remove after done
      console.log("finished");
    } catch (error) {
      console.warn("Error handling analytics - skipping");
    }
  }
}

export const Amplitude = new AmplitudeWrapper();
