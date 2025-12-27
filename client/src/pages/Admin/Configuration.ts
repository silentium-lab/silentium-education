import { Button } from "@/components/Button";
import { Error } from "@/components/Error";
import { InputId } from "@/components/Input";
import { CRUD } from "@/modules/app/CRUD";
import { ServerResponse } from "@/modules/app/ServerResponse";
import { html } from "@/modules/plugins/lang/html";
import { Mount } from "@/modules/render/Mount";
import { Tr } from "@/store";
import { MinLength, RequiredTr } from "@/validations";
import { startRegistration } from "@simplewebauthn/browser";
import { Computed, Late, MessageType, Of, Process, Shared } from "silentium";
import { Branch, Record, Shot, Template } from "silentium-components";
import {
  Validated,
  ValidationErrors,
  ValidationItems,
} from "silentium-validation";

/**
 * Configuration pager
 */
export function Configuration() {
  const behavior = ConfigurationBehavior();

  const $errors = ValidationErrors(
    Computed(
      ValidationItems,
      Record({
        name: behavior.$username,
      }),
      {
        name: [RequiredTr, MinLength(3)],
      },
    ),
  );
  const $validated = Computed(Validated, $errors);

  return Template(
    (t) =>
      html`<div class="article">
        <h1 class="title-1">${t.escaped(Tr("System configuration"))}</h1>
        <p class="mb-2">
          ${t.escaped(
            Tr(
              "Before using the admin panel, you need to configure the server. Specify the required parameters.",
            ),
          )}
        </p>
        <div class="mb-2">
          <input
            class="${t.escaped(
              InputId(behavior.$username),
            )} border-1 p-2 rounded-sm w-full"
            name="username"
          />
          ${t.raw(Mount(Error("name", $errors)))}
        </div>
        <div>
          ${t.raw(
            Mount(
              Button(
                Of("Регистрация"),
                Of("btn"),
                behavior.$register,
                Branch($validated, "", "disabled"),
              ),
            ),
          )}
        </div>
      </div>`,
  );
}

export function ConfigurationBehavior() {
  const $register = Late();

  const $username = Late<string>("");
  const $regStart = Shared(
    ServerResponse(
      CRUD("auth/registration/start").created(
        Shot(Record({ username: $username }), $register),
      ),
    ),
  );

  const $authData = Shared(
    Process($regStart, (data: any) => {
      return startRegistration({
        optionsJSON: data,
      }) as MessageType;
    }),
  );

  const $regFinish = Shared(
    ServerResponse(
      CRUD(Of("auth/registration/finish")).created(
        Record({
          data: $authData,
          username: $username,
        }),
      ),
    ),
  );

  $regFinish.then(() => {
    location.reload();
  });

  return {
    $register,
    $username,
    $regStart,
    $authData,
    $regFinish,
  };
}
