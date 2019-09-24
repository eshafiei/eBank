import { AppRouteItem } from './app-route-item.interface';

export interface AppRoute {
    routeHeader: string;
    adminAccess?: boolean;
    routeItems: AppRouteItem[];
}

export type AppRouteList = [AppRoute];
