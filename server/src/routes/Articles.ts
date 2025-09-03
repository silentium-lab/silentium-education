import { Of, type OwnerType, TheInformation } from "silentium";
import { ToJson } from "silentium-components";
import { ArticleList } from "../app/ArticleList";
import { mongoTransport } from "../../bootstrap";

export class Articles extends TheInformation<string> {
  value(o: OwnerType<string>): this {
    new ToJson(
      new ArticleList(mongoTransport)
    ).value(o);
    return this;
  }
}
