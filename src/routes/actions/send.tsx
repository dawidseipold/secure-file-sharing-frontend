import {createRoute} from "@tanstack/react-router";
import {ActionsSendPage} from "@/pages/actions/send.tsx";
import {actionsLayoutRoute} from "@/routes/actions/index.tsx";
import {setActionsLayout} from "@/stores/actionsLayoutStore.ts";


export const actionsSendRoute = createRoute({
    getParentRoute: () => actionsLayoutRoute,
    path: "/send",
    component: ActionsSendPage,
    beforeLoad: () => {
        setActionsLayout({
            title: "Secure transfer",
            subtitle: "End-to-end encrypted file sharing."
        });
    },
})