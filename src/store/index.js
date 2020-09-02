import Vue from 'vue';
import Vuex from 'vuex';

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
    disConnet: false
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
    }
};
const actions = {
    postAssetsInfo ({
        commit,
        state
    }, params) {
        return commit('updateCoinList', params);
    },
};
export default new Vuex.Store({
    state,
    mutations,
    actions,
    strict: debug
});
