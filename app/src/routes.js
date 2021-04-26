/** @type {Array<import('@simplr-wc/router').SimplrRoute>} */
const routes = [
    {
        path: '/',
        component: 'dotties-app',
        import: () => import('./dotties-app.js'),
    },
    {
        path: 'user',
        component: 'profile-view',
        import: () => import('./views/profile.js'),
        routes: [
            {
                path: ":username",
                component: "profile-view",
                import: () => import('./views/profile.js')
            }
        ]
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
        routes: [
            {
                path: ":username/:repository",
                component: "gallery-entry-view",
                import: () => import("./views/gallery-entry.js")
            },
            {
                path: "new",
                component: "repository-add-view",
                import: () => import("./views/repository-add.js"),
                routes: [
                    {
                        path: ":username/:repository",
                        component: "repository-add-view",
                        import: () => import("./views/repository-add.js"),
                        routes: [
                            {
                                path: "export",
                                component: "repository-add-view",
                                import: () => import("./views/repository-add.js")
                            }
                        ]
                    },
                ]
            }
        ]
    },
];
export default routes;
