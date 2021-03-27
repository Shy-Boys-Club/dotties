const routes = [
    {
        path: '/',
        component: 'dotties-app',
        import: () => import('./dotties-app.js'),
    },
    {
        path: 'profile',
        component: 'profile-view',
        import: () => import('./views/profile.js'),
    },
    {
        path: 'settings',
        component: 'settings-view',
        import: () => import('./views/settings.js'),
    },
    {
        path: 'gallery',
        component: 'gallery-view',
        import: () => import('./views/gallery.js'),
    },
];
export default routes;
