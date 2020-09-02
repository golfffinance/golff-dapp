import Vue from 'vue'
import pool_abi from './json/POOLABI.json';
import erc_abi from './json/ERC20.json';
import Contract from 'web3-eth-contract'
import Web3 from 'web3'
Contract.setProvider(window.ethereum)
// console.log(window.ethereum)
// Contract.setProvider(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/e785d37207f14487a811e41820b4fab8'));

export const address = {
    token: '0xbCa868791a8B78c81088Cebb5a0F96367098e0B2',
    gxc: {
        pool: '0xb07B71d02Fe312B9718C06a15A6932025DfBc757',
        erc20: '0x0d8602f560ecdE04708328DCda78f5d5cf9ef011'
    },
    ht: {
        pool: '0x5A043127b6a0058Dbb06517D2cA18b59915fd047',
        erc20: '0x96b3373956FAAEC0182275752Bb9bdC8A92960a1'
    },
    link: {
        pool: '0x9B818B60B0CE989500f804B604DF3e204C0A560E',
        erc20: '0x469e7ba4D9e40476Af4a0A87F8BBBdad66D738da'
    },
    usdt: {
        pool: '0x604CD2bD79a0D97B19A76081C5F0BDd0804C302b',
        erc20: '0xDf7Ba0C628b982955b1EB0b0305B9C65aeF4BC9a'
    },
    eth: {
        pool: '0x715f7e59Ec38E14F223595D3C4E380D99bC84138',
        erc20: '0x42438B93AfBdBd106Dc0e420BA058b2563D6ce25'
    },
    yfii: {
        pool: '0xE1c6db417Ef51A3E0A402fad9e2028eDE1812e61',
        erc20: '0x18Ea21B9D7a8E2879FF2D227AB95e6638b3A291E'
    },
}


export const initContracts = () => {
    return {
        address: address,
        token: new Contract(erc_abi.abi, address.token),
        gxc: {
            pool: new Contract(pool_abi.abi,address.gxc.pool),
            erc20: new Contract(erc_abi.abi,address.gxc.erc20)
        },
        ht: {
            pool: new Contract(pool_abi.abi, address.ht.pool),
            erc20: new Contract(erc_abi.abi, address.ht.erc20)
        },
        link: {
            pool: new Contract(pool_abi.abi, address.link.pool),
            erc20: new Contract(erc_abi.abi, address.link.erc20)
        },
        usdt: {
            pool: new Contract(pool_abi.abi, address.usdt.pool),
            erc20: new Contract(erc_abi.abi, address.usdt.erc20)
        },
        eth: {
            pool: new Contract(pool_abi.abi, address.eth.pool),
            erc20: new Contract(erc_abi.abi, address.eth.erc20)
        },
        yfii: {
            pool: new Contract(pool_abi.abi, address.yfii.pool),
            erc20: new Contract(erc_abi.abi, address.yfii.erc20)
        },
        
    }
}

