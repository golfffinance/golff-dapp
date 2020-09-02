<template>
  <div class="Farmer">
    <div class="header flex">
      <div class="minWalletBtn flex" @click="changeMetaMask" v-if="this.address && this.address.length>0">
        <p>· {{hiddenAddress(this.address)}}</p>
      </div>
      <div class="minWalletBtn flex" @click="changeMetaMask" v-else>
        <p>{{$t('connectWallet')}}</p>
      </div>
      <div class="golfFarm">
        <img class="golf" src="../../assets/gof_go.png" />
        <img class="farm" src="../../assets/GolfFarm.png" alt />
      </div>
      <p class="tips">{{$t('EarnGolff')}}</p>
      <p v-if="disConnet">{{$t('PleaseInstall')}}MetaMask</p>
      <div class="middle flex" v-if="!disConnet">
        <TimeDown />
        <p class="stage" v-if="stake.status === 0">{{$t('comingSoon')}}</p>
        <p class="stage" v-if="stake.status === 1">{{$t('countdown1')}}</p>
        <p class="stage" v-if="stake.status === 2">{{$t('countdown2')}}</p>
        <p class="notice">
          <el-carousel direction="vertical" :autoplay="true" :interval="3000" :loop="true">
            <el-carousel-item v-for="(item,i) in newsList" :key="i">
              <a class="medium" :href="item.link">{{item.content}}</a>
            </el-carousel-item>
          </el-carousel>
        </p>
      </div>
    </div>

    <div class="list flex" v-if="!disConnet">
      <div class="web-item golBor flex" v-for="(item,i) in coinList">
        <img
          class="rank"
          v-if="item.status === 1 && i === 0 && item.usd !== 0"
          src="../../assets/first.png"
        />
        <img
          class="rank"
          v-if="item.status === 1 && i === 1 && item.usd !== 0"
          src="../../assets/second.png"
        />
        <img
          class="rank"
          v-if="item.status === 1 && i === 2 && item.usd !== 0"
          src="../../assets/third.png"
        />

        <img
          class="double"
          v-if="item.status === 2 && lang === 'zh-CN'"
          src="../../assets/double_zh.png"
        />
        <img
          class="double"
          v-if="item.status === 2 && lang === 'en-US'"
          src="../../assets/double_en.png"
        />
        <img
          class="double"
          v-if="item.status === 2 && lang === 'ko-KR'"
          src="../../assets/double_ko.png"
        />

        <div class="coin flex">
          <img :src="item.img" />
          <p>{{item.name.toUpperCase()}}</p>
        </div>

        <div class="tips" v-if="[0].indexOf(item.status) > -1">
          <p class="obtain">{{$t('Provide',{x: item.name.toUpperCase()})}}</p>
        </div>
        <div class="tips flex" v-if="[1,2].indexOf(item.status) > -1">
          <p class>{{$t('Mining')}}</p>
          <p class="total">{{item.total.toFixed(2)}}</p>

          <p
            class="usd"
            v-if="[1,2].indexOf(item.status) > -1 && item.usd"
          >≈{{item.totalBalance.toFixed(2)}} USD</p>
        </div>

        <div
          class="btn flex disable"
          v-if="item.status === 0 || !address"
          @click="goFarm(item)"
        >{{$t('Deposit')}}</div>

        <div
          class="btn flex"
          v-if="[1,2].indexOf(item.status) > -1 && address"
          @click="goFarm(item)"
        >{{$t('Deposit')}}</div>

        <div
          class="btn flex"
          v-if="item.status === 3 && address"
          @click="goFarm(item)"
        >{{$t('HarvestWithdraw')}}</div>
      </div>
      <div class="m-item golBor" v-for="(item,i) in coinList">
        <img
          class="rank"
          v-if="item.status === 1 && i === 0 && item.usd !== 0"
          src="../../assets/first.png"
        />
        <img
          class="rank"
          v-if="item.status === 1 && i === 1 && item.usd !== 0"
          src="../../assets/second.png"
        />
        <img
          class="rank"
          v-if="item.status === 1 && i === 2 && item.usd !== 0"
          src="../../assets/third.png"
        />

        <img
          class="double"
          v-if="item.status === 2 && lang === 'zh-CN'"
          src="../../assets/double_zh.png"
        />
        <img
          class="double"
          v-if="item.status === 2 && lang === 'en-US'"
          src="../../assets/double_en.png"
        />
        <img
          class="double"
          v-if="item.status === 2 && lang === 'ko-KR'"
          src="../../assets/double_ko.png"
        />
        <div class="left">
          <div class="coin">
            <img :src="item.img" />
            <p>{{item.name.toUpperCase()}}</p>
            <p v-if="[1,2].indexOf(item.status) > -1">{{$t('Mining')}}</p>
          </div>
          <div class="tips">
            <p class="obtain" v-if="[0].indexOf(item.status) > -1">{{$t('Provide',{x: item.name})}}</p>
            <p class="total" v-if="[1,2].indexOf(item.status) > -1">{{item.total}}</p>
            <p
              class="usd"
              v-if="[1,2].indexOf(item.status) > -1 && item.usd"
            >≈{{item.totalBalance.toFixed(2)}} USD</p>
          </div>
        </div>
        <div class="right flex">
          <div
            class="btn flex disable"
            v-if="item.status === 0 || !address"
            @click="goFarm(item)"
          >{{$t('Deposit')}}</div>

          <div
            class="btn flex"
            v-if="[1,2].indexOf(item.status) > -1 && address"
            @click="goFarm(item)"
          >{{$t('Deposit')}}</div>

          <div
            class="btn flex"
            v-if="item.status === 3 && address"
            @click="goFarm(item)"
          >{{$t('HarvestWithdraw')}}</div>
        </div>
      </div>
    </div>
    <div class="more flex" v-if="!disConnet && stake.status === 1">{{$t('StagePhase')}}</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import erc from '@/utils/json/ERC20.json';
import { toNonExponential, leftTime } from '@/utils/index';
import TimeDown from '@/components/timeDown';
import { hiddenAddress } from '@/utils/index';
export default {
  components: {
    TimeDown
  },
  data () {
    return {
      ethereumMetaMask: false,
      status: 0,
      isOpen: false,
      newsList: [
        {
          content: this.$t('newsList1'),
          link: '',
        },
        {
          content: this.$t('newsList2'),
          link: '',
        },
      ],
      hiddenAddress: hiddenAddress
    }
  },
  computed: {
    ...mapState(['network', 'lang', 'address', 'stake', 'coinList', 'reloadTime', 'disConnet']),
    toFixed (e, o) {
      return ((e, o) => {
        if (!e || e === '...') return '...';
        return toNonExponential(e / o);
      })
    },
  },
  watch: {
    network (e) {
      console.log(e)
    }
  },
  async created () {


  },
  mounted () {
      this.changeMetaMask();
  },
  methods: {
    goFarm (e) {
      if (!this.address || this.address.length === 0) {
        this.$message({
          message: 'Please log in to the wallet first',
          type: 'warning'
        });
        return;
      }
      if (e.status === 0) {
        this.$message({
          message: 'Not started',
          type: 'warning'
        });
        return;
      }
      this.$store.commit('updateSelectCoin', e.name);
      this.$router.push('/exchange?coin=' + e.name);
    },
    changeMetaMask () {
      ethereum.enable()
        .then((accounts) => {
          console.log('accounts', accounts)
          this.$store.commit('updateAccountsChanged', accounts[0])
          this.$store.commit('updateWalletModel', false);
          this.routerReload();
        })
        .catch((err) => {
          errorHandler(err);
        })
    },
  }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
