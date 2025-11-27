import { indexRoute } from "@/routes";
import { rootRoute } from "@/routes/__root";

export const routeTree = rootRoute.addChildren([indexRoute]);
