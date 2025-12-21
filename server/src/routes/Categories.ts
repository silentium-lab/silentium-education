import { IncomingMessage } from "http";
import { Applied, Computed, Context } from "silentium";
import { First, Path, Record } from "silentium-components";
import { List } from "../modules/mongo/List";
import { RequestParams } from "../modules/request/RequestParams";

export function Categories() {
  const $req = Context<IncomingMessage>("request");
  const $code = Path(Computed(RequestParams, $req), "sectionCode");
  const $sections = List("sections", Record({ code: $code }));
  const $section = First($sections);
  const $articles = List(
    "categories",
    Record({
      section_id: Applied(Path($section, "_id"), String),
    }),
  );
  return Record({
    data: $articles,
  });
}
