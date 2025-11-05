import { Any, Event, LateShared, Of, Shared } from "silentium";
import {
  Branch,
  Constant,
  Loading,
  Path,
  RecordOf,
  Shot,
  Task,
  Template,
} from "silentium-components";
import { $notification } from "@/bootstrap";
import { Button } from "@/components/Button";
import { Link } from "@/components/Link";
import { i18n, $title, $url } from "@/store";
import { ArticleForm } from "@/pages/Admin/ArticleForm";
import { CRUD } from "@/modules/app/CRUD";
import { ServerResponse } from "@/modules/app/ServerResponse";

export function ArticleNew() {
  return Event<string>((transport) => {
    const title = i18n.tr("Create Article");
    title.event($title);

    const clickedSrc = LateShared();
    const formSrc = LateShared({
      title: "",
      content: "",
    });

    const $formUpdated = Shared(
      ServerResponse(
        CRUD(Of("private/articles"))
          .created(Shot(formSrc, clickedSrc))
          .result(),
      ),
    );
    const formUpdateLoadingSrc = Any(
      Loading(clickedSrc, $formUpdated),
      Of(false),
    );

    const insertedIdSrc = Path($formUpdated, Of("insertedId"));
    Task(
      Template(
        Of("/admin/articles/$id/"),
        RecordOf({
          $id: insertedIdSrc,
        }),
      ),
      900,
    ).event($url);

    Constant(
      {
        type: "success",
        content: "Успешно создано",
      } as const,
      $formUpdated,
    ).event($notification);

    const t = Template();
    t.template(`<div class="article">
			${t.var(Link(Of("/admin/articles"), i18n.tr("Articles"), Of("underline")))}
        <h1 class="title-1">${t.var(title)}</h1>
		${t.var(ArticleForm(formSrc))}
		${t.var(
      Button(
        Branch(formUpdateLoadingSrc, Of("Сохраняем..."), Of("Сохранить")),
        Of("btn"),
        clickedSrc,
      ),
    )}
      </div>`);
    t.event(transport);

    return () => {
      t.destroy();
    };
  });
}
