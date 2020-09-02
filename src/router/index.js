import Vue from 'vue'
import Router from 'vue-router';
import Routes from './routes.js';
Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [].concat(Routes)
});
Vue.routerGo = router;

router.beforeEach((to, from, next) => {
    next();
})

export default router;
