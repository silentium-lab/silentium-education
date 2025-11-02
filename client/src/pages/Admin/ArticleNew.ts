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
import {
  backendCrudSrc,
  backendTransport,
  notificationSrc,
} from "../../bootstrap";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";
import { i18n, titleSrc, urlSrc } from "../../store";
import { ArticleForm } from "./ArticleForm";

export function ArticleNew() {
  return Event<string>((transport) => {
    const title = i18n.tr("Create Article");
    title.event(titleSrc);

    const clickedSrc = LateShared();
    const formSrc = LateShared({
      title: "",
      content: "",
    });

    const backendTransportInstance = TransportDestroyable(backendTransport);
    const formUpdatedSrc = Shared(
      backendCrudSrc
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
    ).event(urlSrc);

    Constant(
      {
        type: "success",
        content: "Успешно создано",
      } as const,
      formUpdatedSrc,
    ).event(notificationSrc);

    const t = Template();
    t.template(`<div class="article">
			${t.var(Link(Of("/admin/articles"), i18n.tr("Articles"), Of("underline")))}
        <h1 class="title-1">${t.var(title)}</h1>
		${t.var(ArticleForm(formSrc))}
		${t.var(
      Button(
        Branch(formUpdateLoadingSrc, Of("Сохраняем..."), Of("Сохранить")),
        Of("btn"),
        clickedSrc.use,
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
