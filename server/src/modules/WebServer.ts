import { head } from "lodash-es";
import http, { IncomingMessage } from "node:http";
import {
  ConstructorType,
  Message,
  MessageType,
  Of,
  Shared,
  Transport,
} from "silentium";

export function WebServer(
  processSrc: ConstructorType<
    [MessageType<IncomingMessage>],
    MessageType<Record<string, unknown>>
  >,
  hostname: string = "0.0.0.0",
  port: number = 4000,
) {
  return Message<string>((transport) => {
    const config = {
      port,
      hostname,
    };

    const server = http.createServer((req, res) => {
      const headers = () => {
        res.setHeader("content-type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:1234");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.setHeader(
          "Access-Control-Allow-Methods",
          "GET, POST, PUT, DELETE, OPTIONS",
        );
      };

      if (req.method === "OPTIONS") {
        headers();
        res.end("");
      } else {
        const process = Shared(processSrc(Of(req)));
        process.to(
          Transport((v) => {
            headers();
            if (v.headers) {
              Object.entries(v.headers).forEach(([name, value]) => {
                res.setHeader(name, value);
              });
              delete v.headers;
            }
            if (v.status) {
              res.statusCode = v.status as number;
              delete v.status;
            }
            res.end(JSON.stringify(v));
            process?.destroy();
          }),
        );
      }
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
