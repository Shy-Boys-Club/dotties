import SimplrRouter from '@simplr-wc/router';
import routes from './routes.js';
import "./components/nav-bar";

const routerOptions = {
    // transitionSpeed: 200,
    // notFoundAction: () => console.error("not found"),
    // forbiddenAction () => console.error("forbidden"),
    routes: routes,
    // rootPath: my-app,
    // disableTransition: false
};

const router = new SimplrRouter(routerOptions);
router.init();
