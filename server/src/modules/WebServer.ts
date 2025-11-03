import http, { IncomingMessage } from "node:http";
import {
  ConstructorType,
  Event,
  EventType,
  Of,
  Shared,
  Transport,
} from "silentium";

export function WebServer(
  processSrc: ConstructorType<[EventType<IncomingMessage>], EventType<string>>,
  hostname: string = "0.0.0.0",
  port: number = 4000,
): EventType<string> {
  return Event((transport) => {
    const config = {
      port,
      hostname,
    };

    const server = http.createServer((req, res) => {
      const process = Shared(processSrc(Of(req)));
      process.event(
        Transport((v) => {
          res.setHeader("content-type", "application/json");
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Headers", "*");
          res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, OPTIONS",
          );
          res.end(v);
          process?.destroy();
        }),
      );
    });

    server.listen(config.port, config.hostname, () => {
      transport.use(
        `Server running at http://${config.hostname}:${config.port}/`,
      );
    });

    server.on("error", (error) => {
      transport.use(["Server error:", error].join());
    });
  });
}
