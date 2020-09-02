const Farmer = () => import('@/views/farmer/index.vue');
const Exchange = () => import('@/views/farmer/exchange.vue');
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
        path: '/exchange',
        name: 'Exchange',
        component: Exchange,
        meta: {
            title: 'Exchange',
            key: 'exchange'
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
