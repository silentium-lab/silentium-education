import { $notification } from "@/bootstrap";
import { Button } from "@/components/Button";
import { Link } from "@/components/Link";
import { CRUD } from "@/modules/app/CRUD";
import { ServerResponse } from "@/modules/app/ServerResponse";
import { ArticleForm } from "@/pages/Admin/ArticleForm";
import { $title, $url, i18n } from "@/store";
import { Any, LateShared, Message, Of, Shared } from "silentium";
import {
  Branch,
  Constant,
  Loading,
  Path,
  Record,
  Shot,
  Task,
  Template,
} from "silentium-components";

export function ArticleNew() {
  return Message<string>((transport) => {
    const title = i18n.tr("Create Article");
    title.pipe($title);

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
        Record({
          $id: insertedIdSrc,
        }),
      ),
      900,
    ).pipe($url);

    Constant(
      {
        type: "success",
        content: "Успешно создано",
      } as const,
      $formUpdated,
    ).pipe($notification);

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
    t.pipe(transport);

    return () => {
      t.destroy();
    };
  });
}
