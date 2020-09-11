<template>
  <div class="Farmer">
    <div class="header flex">
      <div
        class="minWalletBtn flex"
        @click="changeMetaMask"
        v-if="this.address && this.address.length>0"
      >
        <p>• {{hiddenAddress(this.address)}}</p>
      </div>
      <div class="minWalletBtn flex" @click="changeMetaMask" v-else>
        <p>{{$t('connectWallet')}}</p>
      </div>
      <div class="golfFarm">
        <img class="golf" src="../../assets/gof_go.png" />
        <img class="farm" src="../../assets/GolfFarm.png" alt />
      </div>
      <p class="tips">
          {{$t('EarnGolff')}}<br />
      </p>
      <p class="golffToken flex">{{$t('GOFTokenAddress')}}: 0x488E0369f9BC5C40C002eA7c1fe4fd01A198801c</p>
      <!-- <p class="disConnet" v-if="disConnet">{{$t('PleaseInstall')}}</p> -->
      <div class="middle flex">
        <TimeDown />
        <p class="stage" v-if="stake.status === 0">{{$t('comingSoon')}}</p>
        <p class="stage" v-if="stake.status === 1">{{$t('countdown1')}}</p>
        <p class="stage" v-if="stake.status === 2">{{$t('countdown2')}}</p>
        <p class="notice">
          <el-carousel direction="vertical" :autoplay="true" :interval="3000" :loop="true">
            <el-carousel-item v-for="(item,i) in newsList" :key="i">
              <a class="medium" :href="item.link" target="_black">
                <img class="speaker" src="../../assets/speaker.png" />
                <p style="line-height: 24px;">{{item.content}}</p>
              </a>
            </el-carousel-item>
          </el-carousel>
        </p>
      </div>
    </div>

    <div class="list flex">
      <div
        :class="[0,1,2].indexOf(item.status) > -1 ? 'web-item golBor flex' : 'web-item golBor close flex'"
        v-for="(item,i) in coinList"
      >
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
          <p>{{mToUpperCase(item.name)}}</p>
        </div>

        <div class="tips" v-if="[0].indexOf(item.status) > -1">
          <p class="obtain">{{$t('Provide',{x: mToUpperCase(item.name)})}}</p>
        </div>
        <div class="tips flex" v-if="[1,2].indexOf(item.status) > -1">
          <p class>{{$t('Mining')}}</p>
          <p class="total" v-if="item.total !== '...'">{{item.total.toFixed(2)}}</p>
          <p
            class="usd"
            v-if="[1,2].indexOf(item.status) > -1 && item.usd"
          >≈{{item.totalBalance.toFixed(2)}} USD</p>
          <p class="rate" v-if="[1,2].indexOf(item.status) > -1 && item.rate !== ''">
            {{$t('annualization')}}：
            <span>{{item.rate.toFixed(2)}} %</span>
          </p>
        </div>
        <div class="tips" v-if="[3].indexOf(item.status) > -1">
          <p class="obtain">{{$t('closePool')}}</p>
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
      <div
        :class="[0,1,2].indexOf(item.status) > -1 ? 'm-item golBor' : 'm-item golBor close'"
        v-for="(item,i) in coinList"
      >
        <img
          class="rank rank1"
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
          src="../../assets/double_m_zh.png"
        />
        <img
          class="double double_en"
          v-if="item.status === 2 && lang === 'en-US'"
          src="../../assets/double_m_en.png"
        />
        <img
          class="double"
          v-if="item.status === 2 && lang === 'ko-KR'"
          src="../../assets/double_m_ko.png"
        />
        <div class="left">
          <div class="coin">
            <img :src="item.img" />
            <p>{{mToUpperCase(item.name)}}</p>
            <p v-if="[1,2].indexOf(item.status) > -1">{{$t('Mining')}}</p>
          </div>
          <div class="tips">
            <p
              class="obtain obtain0"
              v-if="[0].indexOf(item.status) > -1"
            >{{$t('Provide',{x: mToUpperCase(item.name)})}}</p>
            <p class="total" v-if="item.total !== '...' && [1,2].indexOf(item.status) > -1">
              {{item.total.toFixed(2)}}
              <span
                class="usd"
                v-if="[1,2].indexOf(item.status) > -1 && item.usd"
              >≈{{item.totalBalance.toFixed(2)}} USD</span>
            </p>

            <p class="rate" v-if="[1,2].indexOf(item.status) > -1 && item.rate !== ''">
              {{$t('annualization')}}：
              <span>{{item.rate.toFixed(2)}} %</span>
            </p>
            <p class="obtain" v-if="[3].indexOf(item.status) > -1">{{$t('closePool')}}</p>
          </div>
        </div>
        <div class="right flex">
          <div
            class="btn flex disable"
            v-if="item.status === 0 || !address"
            @click="goFarm(item)"
          >{{$t('Deposit2')}}</div>

          <div
            class="btn flex"
            v-if="[1,2].indexOf(item.status) > -1 && address"
            @click="goFarm(item)"
          >{{$t('Deposit2')}}</div>

          <div
            class="btn flex"
            v-if="item.status === 3 && address"
            @click="goFarm(item)"
          >{{$t('withdraw')}}</div>
        </div>
      </div>
    </div>
    <div class="more flex" v-if="stake.status === 1">{{$t('StagePhase')}}</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import erc from '@/utils/json/ERC20.json';
import { toNonExponential, leftTime, mToUpperCase } from '@/utils/index';
import TimeDown from '@/components/timeDown';
import { hiddenAddress } from '@/utils/index';
import { address } from '@/utils/common'
export default {
  components: {
    TimeDown
  },
  data () {
    return {
      status: 0,
      isOpen: false,
      newsList: [
        {
          content: this.$t('newsList1'),
          link: 'https://www.yuque.com/golff/documentation/vv11gs',
        },
        {
          content: this.$t('newsList2'),
          link: 'https://www.yuque.com/golff/documentation/suuquo',
        },
        {
          content: this.$t('newsList3'),
          link: 'https://uniswap.info/pair/0x9776a214272ab452f8c88c7576dcd0c6ffbfee14',
        },
      ],
      hiddenAddress: hiddenAddress,
      mToUpperCase: mToUpperCase
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

    }
  },
  mounted () {
      this.$store.commit('updateRouterLoading', false);
  },
  methods: {
    ...mapActions(['getEthereumAddress']),
    goFarm (e) {
      if (!this.address || this.address.length === 0) {
        this.$message({
          message: this.$t('PleaseConnect'),
          type: 'warning'
        });
        return;
      }
      if (e.status === 0) {
        this.$message({
          message: this.$t('activityNoStart'),
          type: 'warning'
        });
        return;
      }
      this.$store.commit('updateSelectCoin', e.name);
      this.$router.push('/trade?coin=' + e.name);
    },
    changeMetaMask () {
      this.getEthereumAddress();
    },
  }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
