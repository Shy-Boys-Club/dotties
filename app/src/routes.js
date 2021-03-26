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
];
export default routes;
