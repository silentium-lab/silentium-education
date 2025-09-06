import { Lazy, OwnerType } from "silentium";
import { FetchedData } from 'silentium-web-api';
import { errorSrc } from "./store";

export const backendTransport = new Lazy(
    (r, e, a) => new FetchedData(
        r,
        (e ?? errorSrc) as unknown as OwnerType,
        a
    )
)
