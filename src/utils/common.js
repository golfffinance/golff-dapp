import pool_abi from './json/POOLABI.json';
import erc_abi from './json/ERC20.json';
import Contract from 'web3-eth-contract'
// import { Web3Provider } from '@ethersproject/providers'

export const address = {
    token: '0x488e0369f9bc5c40c002ea7c1fe4fd01a198801c',
    uniswap: {
        USDC_WETH: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        LINK_WETH: '0x514910771af9ca656af840dff83e8264ecf986ca',
        HT_WETH: '0x6f259637dcd74c767781e37bc6133cd6a68aa161',
        YFII_WETH: '0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83',
        GXC_WETH: '0x2e93FE8d550a7B7E7b2e561cd45ceBccbAa79358'
    },
    gxc: {
        pool: '0x308A61E8b52430342295583EA3641B49ad832E22',
        erc20: '0x2e93FE8d550a7B7E7b2e561cd45ceBccbAa79358'
    },
    ht: {
        pool: '0x08ED8e144170F3D66260bcc34c8e7484b6Dd1ce8',
        erc20: '0x6f259637dcD74C767781E37Bc6133cd6A68aa161'
    },
    link: {
        pool: '0x02cC8f37c64C48ceE5E3B81D8fe803D4968312eE',
        erc20: '0x514910771AF9Ca656af840dff83E8264EcF986CA'
    },
    usdt: {
        pool: '0x214324c8A613ef7775B9180aAb1E239DE6Db8395',
        erc20: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
    },
    weth: {
        pool: '0xC46188A5a7c1dFB04a99903544660EA83f986FB8',
        erc20: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    },
    yfii: {
        pool: '0x4E81626eb309B9690A4a3a4592b5f29AAac0F183',
        erc20: '0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83'
    }
}


export const initContracts = () => {
    Contract.setProvider(window.ethereum); 
    return {
        address: address,
        token: new Contract(erc_abi.abi, address.token),
        gxc: {
            pool: new Contract(pool_abi.abi, address.gxc.pool),
            erc20: new Contract(erc_abi.abi, address.gxc.erc20)
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
        weth: {
            pool: new Contract(pool_abi.abi, address.weth.pool),
            erc20: new Contract(erc_abi.abi, address.weth.erc20)
        },
        yfii: {
            pool: new Contract(pool_abi.abi, address.yfii.pool),
            erc20: new Contract(erc_abi.abi, address.yfii.erc20)
        },

    }
}

export const initContractsSend = () => {
    Contract.setProvider(window.ethereum || 'wss://mainnet.infura.io/ws/v3/e785d37207f14487a811e41820b4fab8') 
    return {
        address: address,
        token: new Contract(erc_abi.abi, address.token),
        gxc: {
            pool: new Contract(pool_abi.abi, address.gxc.pool),
            erc20: new Contract(erc_abi.abi, address.gxc.erc20)
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
        weth: {
            pool: new Contract(pool_abi.abi, address.weth.pool),
            erc20: new Contract(erc_abi.abi, address.weth.erc20)
        },
        yfii: {
            pool: new Contract(pool_abi.abi, address.yfii.pool),
            erc20: new Contract(erc_abi.abi, address.yfii.erc20)
        },

    }
}

