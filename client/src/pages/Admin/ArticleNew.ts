import {
  Any,
  Event,
  LateShared,
  Of,
  Shared,
  TransportDestroyable,
} from "silentium";
import {
  Branch,
  Constant,
  Loading,
  Path,
  RecordOf,
  Shot,
  Task,
  Template,
  ToJson,
} from "silentium-components";
import { $backendCrud, backendTransport, $notification } from "../../bootstrap";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";
import { i18n, $title, $url } from "../../store";
import { ArticleForm } from "./ArticleForm";

export function ArticleNew() {
  return Event<string>((transport) => {
    const title = i18n.tr("Create Article");
    title.event($title);

    const clickedSrc = LateShared();
    const formSrc = LateShared({
      title: "",
      content: "",
    });

    const backendTransportInstance = TransportDestroyable(backendTransport);
    const formUpdatedSrc = Shared(
      $backendCrud
        .ofModelName(Of("private/articles"))
        .created(backendTransportInstance, ToJson(Shot(formSrc, clickedSrc))),
    );
    const formUpdateLoadingSrc = Any(
      Loading(clickedSrc, formUpdatedSrc),
      Of(false),
    );

    const insertedIdSrc = Path(formUpdatedSrc, Of("insertedId"));
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
      formUpdatedSrc,
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
      backendTransportInstance.destroy();
      t.destroy();
    };
  });
}
