import http from "node:http";
import {
  From,
  type Lazy,
  Of,
  type OwnerType,
  Shared,
  TheInformation,
} from "silentium";

export class WebServer extends TheInformation<string> {
  public constructor(
    private processSrc: Lazy<string>,
    private hostname: string = "127.0.0.1",
    private port: number = 3000,
  ) {
    super(processSrc);
  }

  public value(o: OwnerType<string>) {
    const config = {
      port: this.port,
      hostname: this.hostname,
    };

    const server = http.createServer((req, res) => {
      const process = new Shared(this.processSrc.get(new Of(req)));
      process.value(
        new From((v) => {
          res.end(v);
          process?.destroy();
        }),
      );
    });

    server.listen(config.port, config.hostname, () => {
      o.give(`Server running at http://${config.hostname}:${config.port}/`);
    });

    server.on("error", (error) => {
      o.give(["Server error:", error].join());
    });

    return this;
  }
}
