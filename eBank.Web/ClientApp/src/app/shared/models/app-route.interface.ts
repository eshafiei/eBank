import { AppRouteItem } from './app-route-item.interface';

export interface AppRoute {
    routeHeader: string;
    routeItems: AppRouteItem[];
}

export type AppRouteList = [AppRoute];
