import SimplrRouter from '@simplr-wc/router';
import routes from './routes.js';


export function init() {
    const routerOptions = {
        transitionSpeed: 100,
        // notFoundAction: () => console.error("not found"),
        // forbiddenAction () => console.error("forbidden"),
        routes: routes,
        // rootPath: my-app,
        disableTransition: true
    };

    const router = new SimplrRouter(routerOptions);
    router.init();
}
