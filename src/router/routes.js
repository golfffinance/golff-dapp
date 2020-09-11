const Farmer = () => import(/* webpackChunkName:'Farmer' */ '@/views/farmer/index.vue');
const Trade = () => import(/* webpackChunkName:'Farmer' */ '@/views/farmer/trade.vue');
const Insurance = () => import('@/views/insurance/index.vue');
const Lend = () => import('@/views/lend/index.vue');
const Vault = () => import('@/views/vault/index.vue');
const routes = [
    {
        path: '/',
        name: 'Farmer',
        component: Farmer,
        meta: {
            title: 'Farmer',
            key: 'farmer'
        }
    },
    {
        path: '/farm',
        name: 'Farmer',
        component: Farmer,
        meta: {
            title: 'Farmer',
            key: 'farmer'
        }
    },
    {
        path: '/trade',
        name: 'Trade',
        component: Trade,
        meta: {
            title: 'Trade',
            key: 'trade'
        }
    },
    {
        path: '/Insurance',
        name: 'Insurance',
        component: Insurance,
        meta: {
            title: 'Insurance',
            key: 'Insurance'
        }
    },
    {
        path: '/Lend',
        name: 'Lend',
        component: Lend,
        meta: {
            title: 'Lend',
            key: 'insurance'
        }
    },
    {
        path: '/lend',
        name: 'Lend',
        component: Lend,
        meta: {
            title: 'Lend',
            key: 'lend'
        }
    },
    {
        path: '/vault',
        name: 'Vault',
        component: Vault,
        meta: {
            title: 'Vault',
            key: 'vault'
        }
    },
]


export default routes;
