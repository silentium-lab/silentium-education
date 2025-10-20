import {
  Any,
  ConstructorDestroyable,
  type EventType,
  LateShared,
  Of,
  Shared,
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

export function ArticleNew(): EventType<string> {
  return (user) => {
    const title = i18n.tr("Create Article");
    title(titleSrc.use);

    const clickedSrc = LateShared();
    const formSrc = LateShared({
      title: "",
      content: "",
    });

    const transport = ConstructorDestroyable(backendTransport);
    const formUpdatedSrc = Shared(
      backendCrudSrc
        .ofModelName(Of("private/articles"))
        .created(transport.get, ToJson(Shot(formSrc.event, clickedSrc.event))),
    );
    const formUpdateLoadingSrc = Any(
      Loading(clickedSrc.event, formUpdatedSrc.event),
      Of(false),
    );

    const insertedIdSrc = Path(formUpdatedSrc.event, Of("insertedId"));
    Task(
      Template(
        Of("/admin/articles/$id/"),
        RecordOf({
          $id: insertedIdSrc,
        }),
      ).value,
      900,
    )(urlSrc.use);

    Constant(
      {
        type: "success",
        content: "Успешно создано",
      } as const,
      formUpdatedSrc.event,
    )(notificationSrc.use);

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
    t.value(user);

    return () => {
      transport.destroy();
      t.destroy();
    };
  };
}
