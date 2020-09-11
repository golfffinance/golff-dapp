import Vue from 'vue';
import Vuex from 'vuex';
import errorHandler from '@/utils/errorHandler';
import i18n from '../plugins/i18n'
Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';
const state = {
    lang: 'en-US',
    network: '',
    address: '',
    walletModel: false,
    myWalletModel: false,
    stake: {
        startTime: '',
        time: '',
        leftTime: '',
        status: 0
    },
    coinList: [],
    xCoin: 'gxc',
    reloadTime: '',
    disConnet: false,
    isRouterAlive: true,
    routerLoading: false
};
const mutations = {
    updateLang (state, lang) {
        state.lang = lang;
    },
    updateNetWorkChanged (state, value) {
        state.network = value;
    },
    updateAccountsChanged (state, value) {
        state.address = value;
    },
    updateWalletModel (state, value) {
        state.walletModel = value;
    },
    updateMyWalletModel (state, value) {
        state.myWalletModel = value;
    },
    updateStakeStartTime (state, value) {
        state.stake.startTime = value;
    },
    updateStakeTime (state, value) {
        state.stake.time = value;
    },
    updateStakeLeftTime (state, value) {
        state.stake.leftTime = value;
    },
    updateStakeStatus (state, value) {
        state.stake.status = value;
    },
    updateCoinList (state, value) {
        state.coinList = value;
    },
    updateSelectCoin (state, value) {
        state.xCoin = value;
    },
    updateReload (state, value) {
        state.reloadTime = value;
    },
    updateDisNotConnet (state, value) {
        state.disConnet = value;
    },
    updateIsRouterAlive (state, value) {
        state.isRouterAlive = value;
    },
    updateRouterLoading (state, value) {
        state.routerLoading = value;
    }
};
const actions = {
    postAssetsInfo ({
        commit,
        state
    }, params) {
        return commit('updateCoinList', params);
    },
    getEthereumAddress ({
        commit,
        state
    }) {
        if (!window.ethereum) {
            Vue.prototype.$message({
                message: i18n.t('PleaseInstall'),
                type: 'warning'
            });
            return;
        }
        ethereum.enable().then((accounts) => {
            console.log('accounts', accounts)
            commit('updateAccountsChanged', accounts[0])
            commit('updateWalletModel', false);
        }).catch((err) => {
            errorHandler(err);
        })
    }
};
export default new Vuex.Store({
    state,
    mutations,
    actions,
    strict: debug
});
