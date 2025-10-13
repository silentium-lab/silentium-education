import http, { IncomingMessage } from "node:http";
import {
  ConstructorType,
  EventType,
  of,
  shared
} from "silentium";

export const webServer = (
    processSrc: ConstructorType<[EventType<IncomingMessage>], EventType<string>>,
    hostname: string = "0.0.0.0",
    port: number = 4000,
): EventType<string> => {
  return (user) => {
    const config = {
      port,
      hostname,
    };

    const server = http.createServer((req, res) => {
      const process = shared(processSrc(of(req)));
      process.event(
        (v) => {
          res.setHeader('content-type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Headers', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
          res.end(v);
          process?.destroy();
        }
      );
    });

    server.listen(config.port, config.hostname, () => {
      user(`Server running at http://${config.hostname}:${config.port}/`);
    });

    server.on("error", (error) => {
      user(["Server error:", error].join());
    });
  }
}
