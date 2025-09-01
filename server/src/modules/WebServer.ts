import http from "node:http";
import { Destroyable, From, type Lazy, Of, Shared } from "silentium";

export class WebServer extends Destroyable {
  public constructor(
    private processSrc: Lazy<string>,
    private hostname: string = "127.0.0.1",
    private port: number = 3000,
  ) {
    super(processSrc);
  }

  public start() {
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
      console.log(
        `Server running at http://${config.hostname}:${config.port}/`,
      );
    });

    server.on("error", (error) => {
      console.error("Server error:", error);
    });
  }
}
