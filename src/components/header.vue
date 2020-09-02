<template>
  <div class="header" @mouseleave="langShow = false">
    <div class="icon" @click="goTo('/')">
      <img src="../assets/logo.png" alt />
    </div>
    <div class="header_menu">
      <ul>
        <li :class="item.active ? 'active' : ''" v-for="item in menu" @click="goTo(item.router)">
          <a>{{item.name}}</a>
        </li>
      </ul>
    </div>
    <div class="header_wallet">
      <wallet />
    </div>
    <div class="min_menu_icon" @mouseover="minMenuShow = true">
      <img src="../assets/min_menu.png" alt />
    </div>
    <div
      class="min_menu"
      v-if="minMenuShow"
      @mouseover="minMenuShow = true"
      @mouseleave="minMenuShow = false"
      @click="minMenuShow = false"
    >
      <ul>
        <li v-for="item in menu" @click="goTo(item.router)">
          <a>{{item.name}}</a>
        </li>
        <li @click="myWallet">
          <a>{{$t('MyGOF')}}</a>
        </li>
      </ul>
    </div>
    <div
      class="langSelect"
      v-if="langShow"
      @mouseover="langShow = true"
      @mouseleave="langShow = false"
    >
      <div v-for="item in langList" @click="selectLang(item)">{{item.name}}</div>
    </div>
    <div class="lang" @mouseover="langShow = true">{{langName}}</div>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
import { goTo } from '@/utils/index';
import wallet from './wallet.vue'
export default {
  components: {
    wallet
  },
  data () {
    return {
      lang: Cookie.get('lang') || 'en-US',
      langName: '',
      goTo: goTo,
      menu: [
        {
          name: 'Home',
          router: '/home',
          active: false
        },
        {
          name: 'Farm',
          router: '/farm',
          active: true
        },
        {
          name: 'Vault',
          router: '/vault',
          active: false
        },
        {
          name: 'Insurance',
          router: '/insurance',
          active: false
        },
        {
          name: 'Lend',
          router: '/lend',
          active: false
        }
      ],
      menuAcitve: '',
      langShow: false,
      langList: [
        {
          key: 'en-US',
          name: 'EN'
        },
        {
          key: 'zh-CN',
          name: '中文'
        },
        {
          key: 'ko-KR',
          name: '한국어',
        }
      ],
      minMenuShow: false,
    }
  },
  watch: {
      '$route.path' (e) {
          this.menu.forEach(o => {
              o.active = false;
              if(e === o.router){
                  o.active = true;
              }
          })
      }
  },
  created () {
    this.langName = this.langList.filter(e => this.lang === e.key)[0].name;
  },
  methods: {
    myWallet () {
      this.$store.commit('updateMyWalletModel', true);
    },
    selectLang (e) {
      this.$i18n.locale = e.key;
      Cookie.set('lang', e.key);
      this.$store.commit('updateLang', e.key);
      this.langName = e.name;
      this.routerReload();
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 70px;
  display: flex;
  position: fixed;
  z-index: 100;
  background-color: #fff;
  .icon {
    display: flex;
    align-items: center;
    img {
      width: 80px;
      margin: 0px 0 0 30px;
    }
  }
  .header_menu {
    flex: 1;
    margin-right: 40px;
    ul {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 100%;
      li {
        margin: 0 30px;
        list-style: none;
        font-size: 16px;
        color: #27887d;
        cursor: pointer;
      }
      .active {
        color: #ff6c15;
        font-size: 18px;
      }
    }
  }
  .header_wallet {
    margin-right: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .langSelect {
    width: 55px;
    margin: 10px;
    position: absolute;
    z-index: 102;
    right: 10px;
    top: 48px;
    background-color: #6cc28d;
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
    div {
      width: 55px;
      height: 48px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    div:hover {
      background-color: #589e74;
    }
  }
  .lang {
    width: 55px;
    height: 30px;
    background-color: rgba(85, 188, 126, 0.8);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    margin: 10px;
    cursor: pointer;
    position: absolute;
    z-index: 99;
    right: 10px;
    top: 10px;
  }
  .min_menu_icon {
    img {
      width: 20px;
      height: 20px;
      position: absolute;
      top: 25px;
      right: 95px;
    }
  }
  .min_menu {
    background-color: #6cc28d;
    position: absolute;
    border-radius: 5px;
    top: 70px;
    right: 80px;
    li {
      list-style: none;
      color: #fff;
      padding: 10px 15px;
      text-align: center;
      border-radius: 5px;
      cursor: Z;
    }
    li:hover {
      background-color: #589e74;
    }
  }
  @media (max-width: 920px) {
    .header_menu {
      display: none;
    }
  }
  @media (min-width: 920px) {
    .min_menu_icon {
      display: none;
    }
  }
}
</style>
