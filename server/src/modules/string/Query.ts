import type { IncomingMessage } from "node:http";
import {
  Applied,
  type InformationType,
  type OwnerType,
  TheInformation,
} from "silentium";

export class Query extends TheInformation<string> {
  public constructor(private req: InformationType<IncomingMessage>) {
    super(req);
  }

  value(o: OwnerType<string>): this {
    new Applied(this.req, (r) => `${r.method}:${r.url}`).value(o);
    return this;
  }
}
