import * as Sentry from "@sentry/node";

class SentryMonitoring {
  constructor() {
    try {
      Sentry.init({
        dsn: "https://9a87cf40be32750e4fc2a1b3246349e6@o263664.ingest.sentry.io/4506825798647808",
        // Don't log the name of our users computers. Feels a bit much?
        serverName: "-"
      });
    } catch {
      // Do nothing, but prevent any sentry errors from blocking commands from executing
    }
  }

  registerCommandName(commandName) {
    try {
      Sentry.setTag("command", commandName);
    } catch {
      // Do nothing, but prevent any sentry errors from blocking commands from executing
    }
  }
}

export const sentryMonitoring = new SentryMonitoring();
