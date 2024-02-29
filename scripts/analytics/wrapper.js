import { configFile } from "../utils/configFile.js";
import { SEGMENT_API_KEY, OPT_IN_NAME } from "./config.js";
import { currentUser } from "../utils/user.js";
import { Analytics } from "@segment/analytics-node";

class AnalyticsWrapper {
  constructor() {
    this.analytics = null;
    this.event = { name: "", properties: {} };
  }

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

  init({ token = SEGMENT_API_KEY, options = {} } = {}) {
    if (!this.optedIn || !token) return;

    try {
      this.analytics = new Analytics({
        writeKey: token
      });
    } catch {
      // Ignore errors during initialization - TODO: log to sentry
    }
  }

  async loadAndIdentify(user) {
    await currentUser.setUser(user);
    if (!currentUser.get("email")) return;

    this.analytics.identify({
      userId: currentUser.get("email"),
      traits: {
        name: currentUser.first_name,
        email: currentUser.get("email"),
        "Django Id": currentUser.get("id")
      }
    });
  }

  async sendEvent(event) {
    this.event = event;
    const { name, properties = {}, user } = this.event;
    if (!this.optedIn) return;

    try {
      this.init();
      await this.loadAndIdentify(user);

      const userEmail = currentUser.get("email");

      const updatedProps = {
        ...properties,
        ...this.appProps,
        ...this.userProps
      };

      this.analytics.track({
        userId: userEmail,
        anonymousId: !userEmail ? `${new Date().valueOf()}` : undefined,
        event: name,
        properties: updatedProps
      });
    } catch (error) {
      console.warn("Error handling analytics - skipping");
    }
  }
}

export const analytics = new AnalyticsWrapper();
