import { IncomingMessage } from "http";
import { Applied, Computed, Context } from "silentium";
import { First, Path, Record } from "silentium-components";
import { List } from "../modules/mongo/List";
import { RequestParams } from "../modules/request/RequestParams";

export function Articles() {
  const $req = Context<IncomingMessage>("request");
  const $code = Path(Computed(RequestParams, $req), "code");
  const $sections = List("sections", Record({ code: $code }));
  const $section = First($sections);
  const $articles = List(
    "documents",
    Record({
      published: true,
      section_id: Applied(Path($section, "_id"), String),
    }),
  );
  return Record({
    data: $articles,
  });
}
