<template>
  <div id="app">
    <HeaderBar v-if="barShow && isRouterAlive" />
    <router-view v-if="isRouterAlive" />
    <FooterBar v-if="barShow && isRouterAlive" />
  </div>
</template>

<script>
import HeaderBar from '@/components/header.vue';
import FooterBar from '@/components/footer.vue';
import { isH5 } from '@/utils/index';
import { mapState, mapActions } from 'vuex';
import { toNonExponential, leftTime } from '@/utils/index';
import { getPrice } from '@/service/CommonService'
import { initContracts } from '@/utils/common';
import errorHandler from '@/utils/errorHandler';
import BigNumber from 'bignumber.js'
import Vue from 'vue'
import Cookie from 'js-cookie'
// import { ChainId, Token, WETH, Fetcher, Route } from '@uniswap/sdk'
export default {
  name: 'App',
  components: {
    HeaderBar,
    FooterBar
  },
  computed: {
    ...mapState(['stake', 'reloadTime', 'walletLock', 'lang']),
  },
  data () {
    return {
      barShow: true,
      startTimeInterval: '',
      timeInterval: '',
      coinList: [
        {
          name: 'gxc',
          img: require('./assets/coin_gxc.png'),
          total: '...',
          usd: 0,
          totalBalance: 0,
          status: 0,
          isOpen: false,
          decimals: 0,
          precision: 8,
        },
        {
          name: 'usdt',
          img: require('./assets/coin_usdt.png'),
          total: '...',
          usd: 1,
          totalBalance: 0,
          status: 0,
          isOpen: false,
          decimals: 0,
          precision: 8,
        },
        {
          name: 'eth',
          img: require('./assets/coin_eth.png'),
          total: '...',
          usd: 0,
          totalBalance: 0,
          status: 0,
          isOpen: false,
          decimals: 0,
          precision: 8,
        },
        {
          name: 'ht',
          img: require('./assets/coin_ht.png'),
          total: '...',
          usd: 0,
          totalBalance: 0,
          status: 0,
          isOpen: false,
          decimals: 0,
          precision: 8,
        },
        {
          name: 'link',
          img: require('./assets/coin_link.png'),
          total: '...',
          usd: 0,
          totalBalance: 0,
          status: 0,
          isOpen: false,
          decimals: 0,
          precision: 8,
        },
        {
          name: 'yfii',
          img: require('./assets/coin_yfii.png'),
          total: '...',
          usd: 0,
          totalBalance: 0,
          status: 0,
          isOpen: false,
          decimals: 0,
          precision: 8,
        },
      ]
    }
  },
  watch: {
    reloadTime () {
      this.getTotalSupply().then(e => {
        this.postAssetsInfo(JSON.parse(JSON.stringify(this.coinList)));
      })
    },
    lang (e) {
      this.changeIcon(e)
    }
  },
  created () {
    if (!window.ethereum) {
      this.$store.commit('updateDisNotConnet', true);
      return;
    }
    Vue.prototype.contract = initContracts();

    window.ethereum.autoRefreshOnNetworkChange = false;
    window.ethereum.on('accountsChanged', (e) => {
      console.log('accountsChanged', e)
      this.$store.commit('updateAccountsChanged', e[0])
    })
    window.ethereum.on('networkChanged', (e) => {
      console.log('networkChanged', e)
      this.$store.commit('updateNetWorkChanged', e)
    })

    setInterval(() => {
      this.$store.commit('updateReload', Date.parse(new Date()))
    }, 15000)
    // this.barShow = isH5() ? false : true;
    this.getDecimals().then(e => {
      Promise.all([
        this.getIsOpen(),
        this.getStartTime(),
        this.periodFinish(),
        this.getTotalSupply()
      ]).then((e) => {
        this.postAssetsInfo(JSON.parse(JSON.stringify(this.coinList)));
      }).catch(err => {
        errorHandler(err);
      });
    }).catch(err => {
      errorHandler(err);
    });
    this.getCoinPrice();
    this.changeIcon(Cookie.get('lang') || 'en-US')
  },
  methods: {
    ...mapActions(['postAssetsInfo']),
    statusChange () {
      //Not Started
      let notStart = this.stake.startTime - Date.parse(new Date()) > 0 ? true : false;
      let coinList = this.coinList;
      if (notStart || this.stake.time === 0) {
        this.$store.commit('updateStakeStatus', 0);
        this.coinList.forEach(e => {
          e.status = 0
        })
      }
      //Begining 7-day cycle
      else if (!notStart && this.stake.time > 0 && (Date.parse(new Date()) - this.stake.startTime) <= 604800000) {
        this.$store.commit('updateStakeStatus', 1);
        this.coinList.forEach(e => {
          e.status = 1
        })
      }
      //The Second Stage 7-day cycle
      else if (!notStart && this.stake.time > 0 && (Date.parse(new Date()) - this.stake.startTime) > 604800000) {
        this.$store.commit('updateStakeStatus', 2);
        this.coinList.forEach(e => {
          if (e.isOpen) {
            e.status = 2
          } else {
            e.status = 3
          }
        })
      }
      this.coinList.forEach(e => {
        if (typeof (e.total) === 'number' && typeof (e.usd) === 'number') {
          e.totalBalance = new BigNumber(e.total).times(e.usd).toNumber();
        }
      })
      coinList = this.sortByKey(coinList, 'totalBalance');
      this.postAssetsInfo(JSON.parse(JSON.stringify(coinList)));
    },
    sortByKey (array, key) {
      return array.sort(function (a, b) {
        let x = a[key];
        let y = b[key];
        return ((x > y) ? -1 : ((x > y) ? 1 : 0));
      })
    },
    async getCoinPrice () {
      await getPrice().then(e => {
        if (e.data.code === 1) {
          e.data.data.map(o => {
            this.coinList.forEach(p => {
              if (o.symbol.toUpperCase() === p.name.toUpperCase()) {
                p.usd = o.price;
              }
            })
          })
        }
      }).catch(err => {
        errorHandler(err);
      });

      // let USDC = new Token(ChainId.MAINNET, '0xdac17f958d2ee523a2206206994597c13d831ec7', 6)
      // let USDCWETHPair = await Fetcher.fetchPairData(USDC, WETH[USDC.chainId])
      // let USDCWETHRoute = new Route([USDCWETHPair], WETH[USDC.chainId])

      // console.log(USDCWETHRoute.midPrice.toSignificant(6))


      // let LINK = new Token(ChainId.MAINNET, '0x514910771af9ca656af840dff83e8264ecf986ca', 18)
      // let LINKUSDCPair = await Fetcher.fetchPairData(LINK, USDC)
      // let LINKUSDCRoute = new Route([LINKUSDCPair], WETH[USDC.chainId])
      // console.log(LINKUSDCRoute.midPrice.toSignificant(6))


      // let HT = new Token(ChainId.MAINNET, '0x9Db10C305c671153662119D453C4D2c123725566', 18)
      // let HTUSDCPair = await Fetcher.fetchPairData(HT, USDC)
      // let HTUSDCRoute = new Route([USDCWETHPair, HTUSDCPair], WETH[USDC.chainId])
      // console.log(HTUSDCRoute.midPrice.toSignificant(6))

      //   let DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18)
      //   let DAIUSDCPair = await Fetcher.fetchPairData(DAI, USDC)
      //   let DAIUSDCRoute = new Route([USDCWETHPair, DAIUSDCPair], WETH[USDC.chainId])
      //   console.log(DAIUSDCRoute.midPrice.invert().toSignificant(6))

      //   const USDC = new Token(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6)

      //   const USDCWETHPair = await Fetcher.fetchPairData(USDC, WETH[USDC.chainId])

      //   const USDCRoute = new Route([USDCWETHPair], WETH[USDC.chainId])

    },
    getIsOpen () {
      let relay = 0
      return new Promise((resolve, reject) => {
        this.coinList.map((e, i) => {
          this.contract[e.name].pool.methods.isOpen().call().then(result => {
            this.coinList[i].isOpen = result;
            relay++;
            if (relay === 6) { resolve() }
          }).catch(err => {
            errorHandler(err);
            reject()
          });
        });
      });
    },
    getDecimals () {
      let relay = 0
      return new Promise((resolve, reject) => {
        this.coinList.map((e, i) => {
          this.contract[e.name].erc20.methods.decimals().call().then(result => {
            this.coinList[i].decimals = parseInt(result);
            relay++;
            if (relay === 6) { resolve() }
          }).catch(err => {
            errorHandler(err);
            reject()
          });
        });
      });
    },
    getTotalSupply () {
      let relay = 0
      return new Promise((resolve, reject) => {
        this.coinList.map((e, i) => {
          this.contract[e.name].pool.methods.totalSupply().call().then(result => {
            this.coinList[i].total = result / eval(`1e${this.coinList[i].decimals}`);
            relay++;
            if (relay === 6) { resolve() }
          }).catch(err => {
            errorHandler(err);
            reject()
          });
        });
      });
      //   
    },
    // GET The time
    getStartTime () {
      return new Promise((resolve, reject) => {
        this.contract.gxc.pool.methods.startTime().call().then(result => {
          let startTime = result * 1000; // - Date.parse(new Date())
          this.$store.commit('updateStakeStartTime', startTime)
          let time = startTime - Date.parse(new Date());
          if (time >= 0) {
            this.startTimeInterval = setInterval(() => {
              time = time - 1000;
              this.$store.commit('updateStakeTime', time)
              this.$store.commit('updateStakeLeftTime', leftTime(time))
              this.statusChange();
            }, 1000)
          } else {
            clearInterval(this.startTimeInterval);
          }
          resolve()
        }).catch(err => {
          errorHandler(err)
          reject()
        });
      });
    },
    periodFinish () {
      return new Promise((resolve, reject) => {
        this.contract.gxc.pool.methods.periodFinish().call().then(result => {
          let time = result * 1000 - Date.parse(new Date());
          this.$store.commit('updateStakeTime', time)
          if (time >= 0) {
            this.timeInterval = setInterval(() => {
              time = time - 1000;
              this.$store.commit('updateStakeTime', time)
              this.$store.commit('updateStakeLeftTime', leftTime(time))
              this.statusChange();
            }, 1000)
          } else {
            this.$store.commit('updateStakeLeftTime', leftTime(0))
            this.statusChange();
            clearInterval(this.timeInterval);
          }
          resolve()
        }).catch(err => {
          errorHandler(err);
          reject()
        });
      });
    },
    changeIcon (key) {
      switch (key) {
        case 'zh-CN':
          this.coinList.forEach(e => {
            e.img = require('./assets/coin_' + e.name + '.png')
          })
          break;
        default:
          this.coinList.forEach(e => {
            e.img = require('./assets/emoji_' + e.name + '.png')
          })
          break;
      }
      this.postAssetsInfo(JSON.parse(JSON.stringify(this.coinList)));
    }
  }
}
</script>

<style lang="less">
html,
body {
  height: 100%;
  background-color: #f1f8f2;
}
#app {
  font-family: PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei,
    WenQuanYi Micro Hei, Helvetica, Arial, monospace, serif;
  -webkit-tap-highlight-color: transparent;
  display: flex;
  flex-direction: column;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
}
.golBor {
  border: 1px solid rgba(17, 139, 128, 0.06);
  border-radius: 24px;
  box-shadow: 0px 12px 29px -10px rgba(17, 139, 128, 0.25);
}
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.model {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
}
.minWalletBtn {
  position: absolute;
  z-index: 11;
  top: 100px;
  right: 10px;
  height: 44px;
  padding: 0 10px;
  background: #f1f8f2;
  border: 1px solid #08a89a;
  border-radius: 100px;
  color: #08a89a;
  cursor: pointer;

  p {
    line-height: 40px;
  }
}
@media (min-width: 920px) {
  .minWalletBtn {
    display: none;
  }
}
.d_n {
  display: none;
}
</style>
