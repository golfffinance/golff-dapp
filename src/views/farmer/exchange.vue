<template>
  <div class="Exchange">
    <div class="depositModel model flex" v-if="receiveAllModel">
      <div class="depositContent golBor">
        <div class="close" @click="receiveAllModel = false">
          <img src="../../assets/model_close.png" alt />
        </div>
        <p class="tips flex">
          {{$t('endStake')}}
          <br />
          {{$t('endStake')}} {{xCoin.toUpperCase()}}
        </p>
        <div class="balance">{{stakeBalance}} {{xCoin.toUpperCase()}}</div>
        <div class="balance">{{gofBalance}} GOF</div>
        <div class="btnWarp">
          <div class="btn active flex" @click="receiveAllEnter">{{$t('withdraw')}}</div>
        </div>
      </div>
    </div>
    <div class="depositModel model flex" v-if="receiveModel">
      <div class="depositContent golBor">
        <div class="close" @click="receiveCloseBtn">
          <img src="../../assets/model_close.png" alt />
        </div>
        <p class="tips flex">{{$t('HarvestGOF')}}</p>
        <div class="balance">{{gofBalance}}</div>
        <div class="number flex d_n">
          <input type="text" v-model="receiveGofInput" disabled />
        </div>
        <div class="btnWarp">
          <div class="btn active flex" @click="receiveGofEnter">{{$t('get')}}</div>
        </div>
      </div>
    </div>
    <div class="depositModel model flex" v-if="depositModel">
      <div class="depositContent golBor">
        <div class="close" @click="depositCloseBtn">
          <img src="../../assets/model_close.png" alt />
        </div>
        <p
          class="tips active flex"
          v-if="depositModelType === 0"
        >{{$t('Deposit2')}} {{xCoin.toUpperCase()}}</p>
        <div class="balance" v-if="depositModelType === 0">{{coinBalance}}</div>

        <p
          class="tips active flex"
          v-if="depositModelType === 1"
        >{{$t('withdraw')}} {{xCoin.toUpperCase()}}</p>
        <div class="balance" v-if="depositModelType === 1">{{stakeBalance}}</div>

        <div class="number flex">
          <InputNumber :point="precision" :max="1e8" v-model.number="depositInput"></InputNumber>
        </div>
        <div class="ratio flex">
          <div @click="depositRatio(.25)">25%</div>
          <div @click="depositRatio(.5)">50%</div>
          <div @click="depositRatio(.75)">75%</div>
          <div @click="depositRatio(1)">100%</div>
        </div>
        <div class="btnWarp">
          <div class="btn flex" @click="depositCloseBtn">{{$t('cancel')}}</div>
          <div
            class="btn active flex"
            v-if="depositModelType === 0"
            @click="depositEnter"
          >{{$t('Deposit2')}}</div>
          <div
            class="btn active flex"
            v-if="depositModelType === 1"
            @click="receiveEnter"
          >{{$t('withdraw')}}</div>
        </div>
      </div>
    </div>
    <div class="minWalletBtn flex" v-if="this.address && this.address.length>0">
      <p>· {{hiddenAddress(this.address)}}</p>
    </div>
    <div class="coinHeader flex">
      <div class="golfFarm flex">
        <img :src="coin_img" alt />
        <p>{{xCoin.toUpperCase()}}</p>
      </div>
      <p class="tips">{{$t('EarnGolff')}}</p>
      <TimeDown />
      <p class="stage">{{$t('comingSoon')}}</p>
    </div>
    <div class="list flex">
      <div class="item golBor flex">
        <div class="coin flex">
          <img src="../../assets/coin_gof.png" />
          <p>GOF</p>
        </div>
        <div class="tips flex">
          <p class="total">{{gofBalance}}</p>
          <p>{{$t('harvest')}}</p>
        </div>
        <div class="btn flex" v-if="!address" @click="changeMetaMask">{{$t('connectWallet')}}</div>
        <div class="btn flex" v-if="address && (allowance > 0 || stakeBalance > 0)" @click="receiveBtn" >{{$t('get')}}</div>
      </div>
      <div class="item golBor flex">
        <div class="coin flex">
          <img :src="coin_img" />
          <p>{{xCoin.toUpperCase()}}</p>
        </div>
        <div class="tips flex">
          <p class="total">{{stakeBalance}}</p>
          <p>{{$t('Mining')}}</p>
        </div>
        <div class="btn flex" v-if="!address" @click="changeMetaMask">{{$t('connectWallet')}}</div>
        <div class="btnWrap flex" v-if="address">
          <div class="btni flex" @click="depositAuth(1,1)" v-if="allowance === 0 && stakeBalance === 0">{{$t('WalletAuthorization')}}</div>
          <div class="btni flex" @click="depositBtn(1)" v-if="allowance > 0 || stakeBalance > 0">{{$t('withdraw')}}</div>
          <div class="btni flex" @click="depositBtn(0)" v-if="allowance > 0 || stakeBalance > 0">{{$t('Deposit2')}}</div>
        </div>
      </div>
    </div>
    <div class="coinFooter flex">
      <div
        class="btn flex"
        @click="receiveAllModel = true"
      >{{$t('HarvestWithdraw')}}{{xCoin.toUpperCase()}}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TimeDown from '@/components/timeDown';
import InputNumber from '@/components/inputNumber.vue';
import errorHandler from '@/utils/errorHandler';
import { hiddenAddress } from '@/utils/index';
import BigNumber from 'bignumber.js';
import { isH5 } from '@/utils/index';
export default {
  components: {
    TimeDown, InputNumber
  },
  data () {
    return {
      gofBalance: '...',
      coinBalance: '...',
      stakeBalance: '...',
      depositInput: '',
      receiveGofInput: '',
      allowance: 0,
      depositModelType: 1,
      depositModel: false,
      receiveModel: false,
      receiveAllModel: false,
      precision: 0,
      decimals: 0,
      coin_img: '',
      coinListCallBack: false,
      hiddenAddress: hiddenAddress
    }
  },
  computed: {
    ...mapState(['network', 'lang', 'address', 'xCoin', 'coinList', 'reloadTime']),
  },
  watch: {
    address (e) {
      if (!e) {
        this.stakeBalance = '...';
        this.coinBalance = '...';
        this.gofBalance = '...';
      }
    },
    coinList () {
      // Only once
      if (this.address && !this.coinListCallBack) {
        this.coinListCallBack = true;
        this.getBalanceAll()
      }
    },
    reloadTime () {
      if (this.coinList.length > 0 && this.address) {
        this.getBalanceAll()
      }
    }
  },
  created () {
    this.$store.commit('updateSelectCoin', this.$route.query.coin);
    if (this.coinList.length > 0 && this.address) {
      this.getBalanceAll()
    }
    if (isH5) {
      this.changeMetaMask();
    }
  },
  methods: {
    getBalanceAll () {
      let precision = this.coinList.filter(e => (e.name === this.xCoin))[0].precision;
      let decimals = this.coinList.filter(e => (e.name === this.xCoin))[0].decimals;
      this.coin_img = this.coinList.filter(e => (e.name === this.xCoin))[0].img
      this.precision = precision;
      if (decimals) {
        this.decimals = eval(`1e${decimals}`);
        this.getBalance()
      }
    },
    depositRatio (e) {
      if (this.depositModelType === 0) {
        this.depositInput = this.coinBalance * e;
      } else if (this.depositModelType === 1) {
        this.depositInput = this.stakeBalance * e;
      }
    },
    receiveRatio (e) {
      this.receiveGofInput = this.gofBalance * e;
    },
    depositEnter () {
      if (this.depositInput && this.depositInput !== 0) {
        this.depositAuth(0, this.depositInput);
      }
    },
    receiveEnter () {
      if (this.depositInput && this.depositInput !== 0) {
        this.depositAuth(1, this.depositInput);
      }
    },
    receiveGofEnter () {
      if (this.receiveGofInput && this.receiveGofInput !== 0) {
        this.depositAuth(2, this.receiveGofInput);
      }
    },
    receiveAllEnter () {
      this.depositSend(3, this.receiveGofInput);
    },
    depositAuth (type, input) {
      let amount = type !== 2 ? input * this.decimals : input * 1e18;
      amount = new BigNumber(amount);
      if([1,2].indexOf(type) > -1){
          this.depositSend(type, amount);
          return;
      }
      if (this.allowance > input) {
        this.depositSend(type, amount)
      } else {
          let balance = new BigNumber(this.coinBalance * this.decimals);
        this.contract[this.xCoin].erc20.methods.approve(this.contract.address[this.xCoin].pool, balance).send({ from: this.address, gas: 210000 }).then(result => {
          this.$message({
            message: 'Success',
            type: 'success'
          });
          this.depositSend(type, amount)
        }).catch(err => {
          errorHandler(err);
        });
      }
    },
    depositSend (type, amount) {
      switch (type) {
        case 0:
          this.contract[this.xCoin].pool.methods.stake(amount).send({ from: this.address }).then(result => {
            console.log(result)
            this.$message({
              message: 'Success',
              type: 'success'
            });
            this.depositModel = false;
          }).catch(err => {
            errorHandler(err);
          });
          break;
        case 1:
          this.contract[this.xCoin].pool.methods.withdraw(amount).send({ from: this.address }).then(result => {
            this.$message({
              message: 'Success',
              type: 'success'
            });
            this.depositModel = false;
          }).catch(err => {
            errorHandler(err);
          });
          break;
        case 2:
          this.contract[this.xCoin].pool.methods.getReward().send({ from: this.address }).then(result => {
            this.$message({
              message: 'Success',
              type: 'success'
            });
            this.receiveModel = false;
          }).catch(err => {
            errorHandler(err);
          });
          break;
        case 3:
          this.contract[this.xCoin].pool.methods.exit().send({ from: this.address }).then(result => {
            this.$message({
              message: 'Success',
              type: 'success'
            });
            this.receiveAllModel = false;
          }).catch(err => {
            errorHandler(err);
          });
          break;

      }
    },
    depositCloseBtn () {
      this.depositModel = false;
    },
    depositBtn (e) {
      this.depositModelType = e;
      this.depositModel = true;
    },
    receiveCloseBtn () {
      this.receiveModel = false;
    },
    receiveBtn () {
      this.receiveGofInput = this.gofBalance;
      this.receiveModel = true;
    },
    getBalance () {
      this.contract[this.xCoin].pool.methods.earned(this.address).call().then(result => {
        this.gofBalance = result / 1e18;
      }).catch(err => {
        errorHandler(err);
      });
      this.contract[this.xCoin].erc20.methods.balanceOf(this.address).call().then(result => {
        this.coinBalance = result / this.decimals;
      }).catch(err => {
        errorHandler(err);
      });
      this.contract[this.xCoin].pool.methods.balanceOf(this.address).call().then(result => {
        this.stakeBalance = result / this.decimals;
      }).catch(err => {
        errorHandler(err);
      });
      this.contract[this.xCoin].erc20.methods.allowance(this.address, this.contract.address[this.xCoin].pool).call().then(result => {
        this.allowance = result / this.decimals;
      }).catch(err => {
        errorHandler(err);
      });
    },
    changeMetaMask () {
      ethereum.enable()
        .then((accounts) => {
          this.$store.commit('updateAccountsChanged', accounts[0])
          this.getBalanceAll()
        })
        .catch((err) => {
          errorHandler(err);
        })
    },
  }
}
</script>

<style lang="less" scoped>
@import "./exchange.less";
</style>
