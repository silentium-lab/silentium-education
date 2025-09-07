import { Applied, Lazy, Of, OwnerType } from "silentium";
import { FetchedData } from 'silentium-web-api';
import { errorSrc } from "./store";
import { CrudModels } from "./modules/app/CrudModels";

export const backendTransport = new Lazy(
    (r, e, a) => new FetchedData(
        new Applied(r, (r: Record<string, unknown>) => {
            return {
                baseUrl: 'http://localhost:4000',
                ...r,
            }
        }),
        (e ?? errorSrc) as unknown as OwnerType,
        a
    )
)

export const backendCrudSrc = new CrudModels(backendTransport, new Of('data'));
