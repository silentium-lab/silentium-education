import { IncomingMessage } from "http";
import { Any, Applied, Computed, Context, Of } from "silentium";
import { First, Path, Record, Shot } from "silentium-components";
import { List } from "../modules/mongo/List";
import { RequestParams } from "../modules/request/RequestParams";

export function Articles() {
  const $req = Context<IncomingMessage>("request");
  const $params = Computed(RequestParams, $req);

  const $sectionCode = Path($params, "section");
  const $sections = List("sections", Record({ code: $sectionCode }));
  const $section = First($sections);
  const $sectionArticles = List(
    "documents",
    Record({
      published: true,
      section_id: Applied(Path($section, "_id"), String),
    }),
  );

  const $categoryCode = Path($params, "category");
  const $category = First(List("categories", Record({ code: $categoryCode })));
  const $categoryArticles = List(
    "documents",
    Record({
      published: true,
      category_id: Applied(Path($category, "_id"), String),
    }),
  );

  const $code = Path($params, "code");
  const $article = First(
    List(
      "documents",
      Record({
        published: true,
        code: $code,
      }),
    ),
  );

  return Record({
    data: Any($sectionArticles, $categoryArticles, $article),
    meta: Any(
      Record({
        category: $category,
      }),
      Record({
        section: $section,
      }),
      Shot(Of({}), $code),
    ),
  });
}
