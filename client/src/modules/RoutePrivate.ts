import { all, DataType } from "silentium";
import { authenticatedSrc, urlSrc } from "../store";

export const routePrivate = (
    baseSrc: DataType<string>,
    loginRoute: string = '/admin'
): DataType<string> => {
    return (u) => {
        all(authenticatedSrc.value, baseSrc)(
            ([auth, content]) => {
                if (!auth) {
                    setTimeout(() => {
                        urlSrc.give(loginRoute);
                    })
                } else {
                    u(content);
                }
            }
        )
    }
}
