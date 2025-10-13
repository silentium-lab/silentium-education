import { constructorDestroyable, EventType, late, lateShared, of, shared, type SourceType } from "silentium";
import { i18n } from "../../store";
import { recordOf, shot, template, toJson } from "silentium-components";
import { button } from "../../components/Button";
import { input } from "../../components/Input";
import { backendCrudSrc, backendTransport } from "../../bootstrap";

/**
 * Configuration page
 */
export function Configuration(): EventType<string> {
    return (user) => {
        i18n.tr("Configuration");

        const username = lateShared('');
        const password = lateShared('');
        const formSrc = recordOf({
            username: username.event,
            password: password.event,
        });

        const savedSrc = lateShared();

        const savedFormSrc = shot(formSrc, savedSrc.event);

	    const transport = constructorDestroyable(backendTransport);
        const formUpdatedSrc = shared(
            backendCrudSrc
                .ofModelName(of("settings"))
                .created(transport.get, toJson(savedFormSrc)),
        );

        formUpdatedSrc.event(() => location.reload());

		const t = template();
		t.template(`<div class="article">
			<h1 class="title-1">Конфигурирование системы</h1>
            <p class="mb-2">
                Перед использованием панели администратора
                необходимо провести конфигурацию сервера,
                Укажите обязательные параметры
            </p>
            <div class="mb-2">
                Имя пользователя
                <input class="${t.var(input(username))} border-1 p-2 rounded-sm w-full" />
            </div>
            <div class="mb-2">
                Пароль
                <input class="${t.var(input(password))} border-1 p-2 rounded-sm w-full" />
            </div>
            ${t.var(button(
                of('Сохранить'),
                of("btn"),
                savedSrc.use,
            ))}
		</div>`);
	    t.value(user);

        return () => {
            t.destroy();
            transport.destroy();
        }
    }
}
