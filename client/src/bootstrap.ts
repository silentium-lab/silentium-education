import { applied, DataType, DataUserType, lateShared, of } from "silentium";
import { fetchedData } from 'silentium-web-api';
import { crudModels } from "./modules/app/CrudModels";
import { errorSrc } from "./store";

export const backendTransport = (
    r: unknown,
    e: unknown,
    a: unknown
) => fetchedData(
    applied(r as DataType<Record<string, unknown>>, (r: Record<string, unknown>) => {
        return {
            baseUrl: 'http://localhost:4000',
            headers: {
                'Content-Type': 'application/json'
            },
            ...r,
        }
    }),
    (e as DataUserType ?? errorSrc),
    a as DataType
)

export const backendCrudSrc = crudModels(backendTransport, of('data'));
export const notificationSrc = lateShared<{
    type: 'error' | 'success' | 'info',
    content: string
}>();
