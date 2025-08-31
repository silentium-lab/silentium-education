import http from "node:http";
import { Destroyable, From, type Lazy, Of } from "silentium";

export class WebServer extends Destroyable {
  public constructor(
    private processSrc: Lazy<string>,
    private hostname: string = "http://127.0.0.1",
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
      this.processSrc.get(new Of(req)).value(new From((r) => res.end(r)));
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
