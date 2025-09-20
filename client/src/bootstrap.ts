import { Applied, From, Late, LateShared, Lazy, Of, OwnerType, SharedSource } from "silentium";
import { FetchedData } from 'silentium-web-api';
import { errorSrc } from "./store";
import { CrudModels } from "./modules/app/CrudModels";

export const backendTransport = new Lazy(
    (r, e, a) => new FetchedData(
        new Applied(r, (r: Record<string, unknown>) => {
            return {
                baseUrl: 'http://localhost:4000',
                headers: {
                    'Content-Type': 'application/json'
                },
                ...r,
            }
        }),
        (e ?? errorSrc) as unknown as OwnerType,
        a
    )
)

export const backendCrudSrc = new CrudModels(backendTransport, new Of('data'));
export const notificationSrc = new LateShared<{
    type: 'error' | 'success' | 'info',
    content: string
}>();
notificationSrc.value(new From(console.log));
