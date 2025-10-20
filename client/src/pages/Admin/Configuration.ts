import {
  ConstructorDestroyable,
  EventType,
  LateShared,
  Of,
  Shared,
} from "silentium";
import { RecordOf, Shot, Template, ToJson } from "silentium-components";
import { backendCrudSrc, backendTransport } from "../../bootstrap";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { i18n } from "../../store";

/**
 * Configuration page
 */
export function Configuration(): EventType<string> {
  return (user) => {
    i18n.tr("Configuration");

    const username = LateShared("");
    const password = LateShared("");
    const formSrc = RecordOf({
      username: username.event,
      password: password.event,
    });

    const savedSrc = LateShared();

    const savedFormSrc = Shot(formSrc, savedSrc.event);

    const transport = ConstructorDestroyable(backendTransport);
    const formUpdatedSrc = Shared(
      backendCrudSrc
        .ofModelName(Of("settings"))
        .created(transport.get, ToJson(savedFormSrc)),
    );

    formUpdatedSrc.event(() => location.reload());

    const t = Template();
    t.template(`<div class="article">
			<h1 class="title-1">Конфигурирование системы</h1>
            <p class="mb-2">
                Перед использованием панели администратора
                необходимо провести конфигурацию сервера,
                Укажите обязательные параметры
            </p>
            <div class="mb-2">
                Имя пользователя
                <input class="${t.var(Input(username))} border-1 p-2 rounded-sm w-full" />
            </div>
            <div class="mb-2">
                Пароль
                <input class="${t.var(Input(password))} border-1 p-2 rounded-sm w-full" />
            </div>
            ${t.var(Button(Of("Сохранить"), Of("btn"), savedSrc.use))}
		</div>`);
    t.value(user);

    return () => {
      t.destroy();
      transport.destroy();
    };
  };
}
