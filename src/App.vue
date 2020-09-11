<template>
  <div id="app">
    <HeaderBar v-if="barShow && isRouterAlive" />
    <router-view v-if="isRouterAlive" v-show="!routerLoading" />
    <Loading v-if="routerLoading" />
    <FooterBar v-if="barShow && isRouterAlive" :total="totalPriceUsdt" />
  </div>
</template>

<script>
import HeaderBar from '@/components/header.vue';
import FooterBar from '@/components/footer.vue';
import Loading from '@/components/loading.vue'
import { isH5 } from '@/utils/index';
import { mapState, mapActions } from 'vuex';
import { toNonExponential, leftTime } from '@/utils/index';
import { getPrice } from '@/service/CommonService'
import { initContracts, initContractsSend } from '@/utils/common';
import errorHandler from '@/utils/errorHandler';
import BigNumber from 'bignumber.js'
import Vue from 'vue'
import Cookie from 'js-cookie'
import { ChainId, Token, WETH, Fetcher, Route } from '@uniswap/sdk'
import Contract2 from 'web3-eth-contract'
export default {
  name: 'App',
  components: {
    HeaderBar,
    FooterBar,
    Loading
  },
  computed: {
    ...mapState(['stake', 'reloadTime', 'walletLock', 'lang', 'isRouterAlive', 'network', 'routerLoading']),
  },
  data () {
    return {
      barShow: true,
      startTimeInterval: '',
      timeInterval: '',
      GOFPrice: '',
      totalPriceUsdt: '',
      coinList: [
        {
          name: 'gxc',
          img: require('./assets/coin_gxc.png'),
          total: '...',
          usd: 0,
          totalBalance: 0,
          status: 0,
          isOpen: true,
          decimals: 5,
          precision: 8,
          rate: '',
        },
        {
          name: 'usdt',
          img: require('./assets/coin_usdt.png'),
          total: '...',
          usd: 0,
          totalBalance: 0,
          status: 0,
          isOpen: true,
          decimals: 6,
          precision: 8,
          rate: '',
        },
        {
          name: 'weth',
          img: require('./assets/coin_weth.png'),
          total: '...',
          usd: 0,
          totalBalance: 0,
          status: 0,
          isOpen: true,
          decimals: 18,
          precision: 8,
          rate: '',
        },
        {
          name: 'ht',
          img: require('./assets/coin_ht.png'),
          total: '...',
          usd: 0,
          totalBalance: 0,
          status: 0,
          isOpen: true,
          decimals: 18,
          precision: 8,
          rate: '',
        },
        {
          name: 'link',
          img: require('./assets/coin_link.png'),
          total: '...',
          usd: 0,
          totalBalance: 0,
          status: 0,
          isOpen: true,
          decimals: 18,
          precision: 8,
          rate: '',
        },
        {
          name: 'yfii',
          img: require('./assets/coin_yfii.png'),
          total: '...',
          usd: 0,
          totalBalance: 0,
          status: 0,
          isOpen: true,
          decimals: 18,
          precision: 8,
          rate: '',
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
      if(isH5()){
          this.$store.commit('updateRouterLoading', true);
      }
      
  },
  mounted () {
    setTimeout(() => {
      if (!window.ethereum) {
        this.$store.commit('updateDisNotConnet', true);
      } else {
        this.$store.commit('updateDisNotConnet', false);
      }
      this.getEthereumAddress();
        this.init()
    }, 1000)

    // this.barShow = isH5() ? false : true;
    this.changeIcon(Cookie.get('lang') || 'en-US')
  },
  methods: {
    ...mapActions(['postAssetsInfo','getEthereumAddress']),
    init () {
      Vue.prototype.contract = initContracts();
      Vue.prototype.contractSend = initContractsSend();

    //   window.ethereum.autoRefreshOnNetworkChange = false;
    //   window.ethereum.on('accountsChanged', (e) => {
    //     console.log('accountsChanged', e)
    //     this.$store.commit('updateAccountsChanged', e[0])
    //   })
    //   window.ethereum.on('networkChanged', (e) => {

    //     this.$store.commit('updateNetWorkChanged', e)
    //     if (process.env.NODE_ENV === 'production' && e === '1') {
    //       return;
    //     }
    //     if (process.env.NODE_ENV === 'development' && e === '4') {
    //       return;
    //     }
    //     this.$store.commit('updateAccountsChanged', undefined);

    //   })

      setInterval(() => {
        this.$store.commit('updateReload', Date.parse(new Date()))
      }, 15000)
      this.getContractDetail();
    },
    getContractDetail () {
      Promise.all([
        // this.getIsOpen(),
        this.getStartTime(),
        this.periodFinish(),
        this.getTotalSupply()
      ]).then((e) => {
        this.postAssetsInfo(JSON.parse(JSON.stringify(this.coinList)));
        this.getCoinPrice();
      }).catch(err => {
        errorHandler(err);
      });
      //   this.getDecimals().then(e => {

      //   }).catch(err => {
      //     errorHandler(err);
      //   });
    },
    statusChange () {
      let coinList = this.coinList;
      let total = 0;
      coinList.forEach(e => {
        if (typeof (e.total) === 'number' && typeof (e.usd) === 'number') {
          e.totalBalance = new BigNumber(e.total).times(e.usd).toNumber();
        }
      })

      //Not Started
      let notStart = this.stake.startTime - Date.parse(new Date()) > 0 ? true : false;

      if (notStart || this.stake.time === 0) {
        this.$store.commit('updateStakeStatus', 0);
        coinList.forEach(e => {
          e.status = 0
        })
      }
      //Begining 7-day cycle
      else if (!notStart && this.stake.time > 0 && (Date.parse(new Date()) - this.stake.startTime) <= 604800000) {
        this.$store.commit('updateStakeStatus', 1);
        coinList = this.sortByKey(coinList, 'totalBalance');
        coinList.forEach(e => {
          e.status = 1
          total += e.totalBalance
        })
      }
      //The Second Stage 7-day cycle
      else if (!notStart && this.stake.time > 0 && (Date.parse(new Date()) - this.stake.startTime) > 604800000) {
        this.$store.commit('updateStakeStatus', 2);
        coinList = this.sortByKey(coinList, 'totalBalance');
        coinList.forEach((e, i) => {
          total += e.totalBalance
          // Screen the top two
          if ([0, 1, 2].indexOf(i) > -1) {
            e.status = 2
          } else {

            if (e.name === 'gxc') {
              e.status = 2;
              coinList[2].status = 3;
              [coinList[2], coinList[i]] = [coinList[i], coinList[2]]
            } else {
              e.status = 3
            }
          }
        })

      }

      this.totalPriceUsdt = total;
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


      let USDC = new Token(ChainId.MAINNET, this.contract.address.uniswap.USDC_WETH, 6)
      let USDCWETHPair = await Fetcher.fetchPairData(USDC, WETH[USDC.chainId])
      let USDCWETHRoute = new Route([USDCWETHPair], WETH[USDC.chainId])
      let eth_usdt = USDCWETHRoute.midPrice.toSignificant(6);

      let LINK = new Token(ChainId.MAINNET, this.contract.address.uniswap.LINK_WETH, 18)
      let LINKUSDCPair = await Fetcher.fetchPairData(LINK, WETH[USDC.chainId])
      let LINKUSDCRoute = new Route([LINKUSDCPair], WETH[USDC.chainId])
      let link_usdt = eth_usdt / LINKUSDCRoute.midPrice.toSignificant(6)

      //   let HT = new Token(ChainId.MAINNET, this.contract.address.uniswap.HT_WETH, 18)
      //   let HTUSDCPair = await Fetcher.fetchPairData(HT, WETH[USDC.chainId])
      //   let HTUSDCRoute = new Route([HTUSDCPair], WETH[USDC.chainId])
      //   let ht_usdt = eth_usdt / HTUSDCRoute.midPrice.toSignificant(6)

      let YFII = new Token(ChainId.MAINNET, this.contract.address.uniswap.YFII_WETH, 18)
      let YFIIUSDCPair = await Fetcher.fetchPairData(YFII, WETH[USDC.chainId])
      let YFIIUSDCRoute = new Route([YFIIUSDCPair], WETH[USDC.chainId])
      let yfii_usdt = eth_usdt / YFIIUSDCRoute.midPrice.toSignificant(6)

      let GXC = new Token(ChainId.MAINNET, this.contract.address.uniswap.GXC_WETH, 5)
      let GXCUSDCPair = await Fetcher.fetchPairData(GXC, WETH[USDC.chainId])
      let GXCUSDCRoute = new Route([GXCUSDCPair], WETH[USDC.chainId])
      let gxc_usdt = eth_usdt / GXCUSDCRoute.midPrice.toSignificant(6)

      let GOF = new Token(ChainId.MAINNET, this.contract.address.token, 18)
      let GOFUSDCPair = await Fetcher.fetchPairData(GOF, WETH[USDC.chainId])
      let GOFUSDCRoute = new Route([GOFUSDCPair], WETH[USDC.chainId])
      let gof = USDCWETHRoute.midPrice.toSignificant(18) / GOFUSDCRoute.midPrice.toSignificant(18)
      this.GOFPrice = gof;

      await getPrice().then(e => {
        if (e.data.code === 1) {
          e.data.data.map(o => {
            this.coinList.forEach(p => {
              //   if (o.symbol.toUpperCase() === p.name.toUpperCase()) {
              //     p.usd = o.price;
              //   }
              //   if (p.name.toUpperCase() === 'GXC' && o.symbol.toUpperCase() === 'GXC') {
              //     p.usd = o.price;
              //   }
              if (p.name.toUpperCase() === 'HT' && o.symbol.toUpperCase() === 'HT') {
                p.usd = o.price;
              }
              if (p.name.toUpperCase() === 'USDT') {
                p.usd = 1;
              }
            })
          })
        }
      }).catch(err => {
        errorHandler(err);
      });

      this.coinList.forEach(p => {
        if (p.name === 'weth') {
          p.usd = new BigNumber(eth_usdt).toNumber();
        } else if (p.name === 'link') {
          p.usd = new BigNumber(link_usdt).toNumber();
        } else if (p.name === 'yfii') {
          p.usd = new BigNumber(yfii_usdt).toNumber();
        } else if (p.name === 'gxc') {
          p.usd = new BigNumber(gxc_usdt).toNumber();
        }
      });
      this.getAllRewardRate()
      this.postAssetsInfo(JSON.parse(JSON.stringify(this.coinList)));
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

      this.$store.commit('updateStakeStartTime', 1599652800000);
      return;
      //   return new Promise((resolve, reject) => {
      //     this.contract.gxc.pool.methods.startTime().call().then(result => {
      //       let startTime = result * 1000;
      //       this.$store.commit('updateStakeStartTime', startTime)
      //       console.log(startTime)
      //       let time = startTime - Date.parse(new Date());
      //       if (time >= 0) {
      //         this.startTimeInterval = setInterval(() => {
      //           time = time - 1000;
      //           this.$store.commit('updateStakeTime', time)
      //           this.$store.commit('updateStakeLeftTime', leftTime(time))
      //           this.statusChange();
      //           if (time <= 0) {
      //             clearInterval(this.startTimeInterval);
      //             this.getContractDetail()
      //           }
      //         }, 1000)
      //       } else {
      //         clearInterval(this.startTimeInterval);
      //       }
      //       resolve()
      //     }).catch(err => {
      //       errorHandler(err)
      //       reject()
      //     });
      //   });
    },
    periodFinish () {
      return new Promise((resolve, reject) => {
        this.contract.gxc.pool.methods.periodFinish().call().then(result => {
          let time = result * 1000 - Date.parse(new Date());
          this.$store.commit('updateStakeTime', time)
          if (time >= 0 && time <= 604800000) {
            this.timeInterval = setInterval(() => {
              time = time - 1000;
              this.$store.commit('updateStakeTime', time)
              this.$store.commit('updateStakeLeftTime', leftTime(time))
              this.statusChange();
              if (time <= 0) {
                clearInterval(this.timeInterval);
                this.getContractDetail()
              }
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
    getRewardRate (e) {
      return new Promise((resolve, reject) => {
        this.contract[e].pool.methods.rewardRate().call().then(result => {
          resolve(result / 1e18)
        }).catch(err => {
          errorHandler(err);
          reject()
        });
      });
    },
    async getAllRewardRate () {
      let gxc = await this.getRewardRate('gxc');
      let ht = await this.getRewardRate('ht');
      let usdt = await this.getRewardRate('usdt');
      let yfii = await this.getRewardRate('yfii');
      let weth = await this.getRewardRate('weth');
      let link = await this.getRewardRate('link');
      let gof = this.GOFPrice;
      this.coinList.forEach(e => {
        if (e.usd > 0) {
          switch (e.name) {
            case 'gxc':
              e.rate = this.calcAPR(gxc, e.total, gof, e.usd)
              break;
            case 'ht':
              e.rate = this.calcAPR(ht, e.total, gof, e.usd)
              break;
            case 'usdt':
              e.rate = this.calcAPR(usdt, e.total, gof, e.usd)
              break;
            case 'yfii':
              e.rate = this.calcAPR(yfii, e.total, gof, e.usd)
              break;
            case 'weth':
              e.rate = this.calcAPR(weth, e.total, gof, e.usd)
              break;
            case 'link':
              e.rate = this.calcAPR(link, e.total, gof, e.usd)
              break;
            default:
              break;
          }
        }
      });
      this.postAssetsInfo(JSON.parse(JSON.stringify(this.coinList)));
    },
    calcAPR (symbol, total, gof, usd) {
      return (((symbol / (total < 1 ? 1 : total) * gof) * 360 * 24 * 60 * 60) / usd) * 100;
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
@import "./styles/common.less";
</style>
