import { indexRoute } from "@/routes";
import { rootRoute } from "@/routes/__root";
import {actionsLayoutRoute} from "@/routes/actions";
import {actionsSendRoute} from "@/routes/actions/send.tsx";

export const routeTree = rootRoute
    .addChildren([
        indexRoute,
        actionsLayoutRoute.addChildren([
            actionsSendRoute
        ])
]);
