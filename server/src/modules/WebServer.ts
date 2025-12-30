import { AsyncLocalStorage } from "node:async_hooks";
import http, { IncomingMessage } from "node:http";
import {
  ConstructorType,
  ContextOf,
  ContextType,
  Message,
  MessageType,
  Of,
  Shared,
} from "silentium";

const requestStorage = new AsyncLocalStorage();

// Configure request to every thread
ContextOf("request").then((context: ContextType) => {
  const req = requestStorage.getStore();
  if (req && context.result) {
    context.result(req);
  } else if (context.error) {
    context.error("No request in context!");
  }
});

export function WebServer(
  processSrc: ConstructorType<
    [MessageType<IncomingMessage>],
    MessageType<Record<string, unknown>>
  >,
  hostname: string = "0.0.0.0",
  port: number = 4000,
) {
  return Message<string>((resolve) => {
    const config = {
      port,
      hostname,
    };

    const server = http.createServer((req, res) => {
      const headers = () => {
        res.setHeader("content-type", "application/json");
        res.setHeader(
          "Access-Control-Allow-Origin",
          req.headers["origin"] ?? "*",
        );
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
        const processInStore = Message<Record<string, unknown>>(
          (resolve, reject) => {
            requestStorage.run(req, () => {
              process.catch(reject).then(resolve);
            });
          },
        );
        processInStore.then((v) => {
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
        });
        process.catch((e: any) => {
          headers();
          res.statusCode = 500;
          res.end(
            JSON.stringify({
              error: e.message,
            }),
          );
        });
      }
    });

    server.listen(config.port, config.hostname, () => {
      resolve(`Server running at http://${config.hostname}:${config.port}/`);
    });

    server.on("error", (error) => {
      resolve(["Server error:", error].join());
    });
  });
}
