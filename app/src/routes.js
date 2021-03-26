const routes = [
    {
        path: '/',
        component: 'dotties-app',
        import: () => import('./dotties-app.js'),
    },
    {
        path: 'info',
        component: 'info-view',
        import: () => import('./info-view.js'),
    },
];
export default routes;
