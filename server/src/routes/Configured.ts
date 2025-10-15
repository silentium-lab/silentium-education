import { EventType } from "silentium";
import { mongoTransport } from "../../bootstrap";
import { RecordOf, ToJson } from "silentium-components";
import { settingsModels } from "../models/settingsModels";

/**
 * Is admin panel configured
 */
export function Configured(): EventType<string> {
    return ToJson(
        RecordOf({
            data: RecordOf({
                configured: settingsModels.isConfigured(mongoTransport())
            })
        })
    )
}
