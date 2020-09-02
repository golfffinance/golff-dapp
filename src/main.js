import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store';
import Vue18n from 'vue-i18n'
import Cookie from 'js-cookie'

import './plugins/element';
import './plugins/mixin';

import './styles/fonts.css'


Vue.use(Vue18n);

const i18n = new Vue18n({
    locale: Cookie.get('lang') || 'en-US',
    messages: {
        'en-US': require('./locale/en').default,
        'zh-CN': require('./locale/zh').default,
        'ko-KR': require('./locale/ko').default
    }
})


Vue.config.productionTip = false;
new Vue({
    router,
    i18n,
    store,
    render: h => h(App),
}).$mount('#app')
