import { applied, EventType, lateShared, of, EventUserType } from "silentium";
import { fetchedData } from 'silentium-web-api';
import { crudModels } from "./modules/app/CrudModels";
import { errorSrc } from "./store";

export const backendTransport = (
    r: unknown,
    e: unknown,
    a: unknown
) => fetchedData(
    applied(r as EventType<Record<string, unknown>>, (r: Record<string, unknown>) => {
        return {
            baseUrl: 'http://localhost:4000',
            headers: {
                'Content-Type': 'application/json'
            },
            ...r,
        }
    }),
    (e as EventUserType ?? errorSrc),
    a as EventType
)

export const backendCrudSrc = crudModels(of('data'));
export const notificationSrc = lateShared<{
    type: 'error' | 'success' | 'info',
    content: string
}>();
