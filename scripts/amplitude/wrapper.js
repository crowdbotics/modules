import { configFile } from "../utils/configFile.js";
import { AMPLITUDE_API_KEY, OPT_IN_NAME } from "./config.js";
import { init, track, Identify, identify } from "@amplitude/analytics-node";
import { currentUser } from "../utils/user.js";

class AmplitudeWrapper {
  get userType() {
    // TODO: Implement once we have the data available in the UserSerializer
    return undefined;
  }

  get optedIn() {
    return configFile.get(OPT_IN_NAME);
  }

  get appProps() {
    return {};
  }

  get userProps() {
    const org = currentUser.get("organization");
    return {
      "User Type": this.userType,
      "Org ID": org?.id,
      Source: "CLI"
    };
  }

  async init({ token = AMPLITUDE_API_KEY, options = {} } = {}) {
    if (!this.optedIn || !token) return;

    try {
      await init(token, { ...options, includeUtm: true }).promise;
    } catch {
      // Ignore errors during initialization
    }
  }

  async loadAndIdentify(user) {
    await currentUser.setUser(user);
    if (!currentUser.get("email")) return;

    const identifyEvent = new Identify();
    identifyEvent.set("Django Id", currentUser.get("id"));
    identify(identifyEvent, { user_id: currentUser.get("email") });
  }

  async sendEvent({ name, properties = {}, user }) {
    if (!this.optedIn) return;

    try {
      await this.init();
      await this.loadAndIdentify(user);

      const userEmail = currentUser.get("email");
      if (userEmail) {
        const updatedProps = {
          ...properties,
          ...this.appProps,
          ...this.userProps
        };

        await track(name, updatedProps, { user_id: userEmail }).promise;
      }
    } catch (error) {
      console.warn("Error handling analytics - skipping");
    }
  }
}

export const Amplitude = new AmplitudeWrapper();
