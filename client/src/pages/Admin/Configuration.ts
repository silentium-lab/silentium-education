import {
  Event,
  EventType,
  LateShared,
  Of,
  Shared,
  Transport,
  TransportDestroyable,
} from "silentium";
import { RecordOf, Shot, Template, ToJson } from "silentium-components";
import { $backendCrud, backendTransport } from "../../bootstrap";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { i18n } from "../../store";

/**
 * Configuration page
 */
export function Configuration(): EventType<string> {
  return Event((transport) => {
    i18n.tr("Configuration");

    const $username = LateShared("");
    const $password = LateShared("");
    const $form = RecordOf({
      username: $username,
      password: $password,
    });

    const $saved = LateShared();

    const $savedForm = Shot($form, $saved);

    const transportInstance = TransportDestroyable(backendTransport);
    const $formUpdated = Shared(
      $backendCrud
        .ofModelName(Of("settings"))
        .created(transportInstance, ToJson($savedForm)),
    );

    $formUpdated.event(Transport(() => location.reload()));

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
                <input class="${t.var(Input($username))} border-1 p-2 rounded-sm w-full" />
            </div>
            <div class="mb-2">
                Пароль
                <input class="${t.var(Input($password))} border-1 p-2 rounded-sm w-full" />
            </div>
            ${t.var(Button(Of("Сохранить"), Of("btn"), $saved))}
		</div>`);
    t.event(transport);

    return () => {
      t.destroy();
      transportInstance.destroy();
    };
  });
}
