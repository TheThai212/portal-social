import {Routes} from '@angular/router';

const Routing: Routes = [
    {
        path: 'dashboard',
        loadChildren: () =>
            import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    },
    {
        path: 'overview',
        loadChildren: () =>
            import('./overview/overview.module').then((m) => m.OverviewModule),
    },
    {
        path: 'privacy-policy',
        loadChildren: () =>
            import('./privacy-policy/privacy-policy.module').then((m) => m.PrivacyPolicyModule),
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: 'error/404',
    },
];

export {Routing};
