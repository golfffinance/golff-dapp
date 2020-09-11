<template>
  <div class="header" @mouseleave="langShow = false">
    <div class="middle_header">
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
          routerChildren: '/home',
          active: false
        },
        {
          name: 'Farm',
          router: '/farm',
          routerChildren: '/farm,/trade',
          active: true
        },
        {
          name: 'Vault',
          router: '/vault',
          routerChildren: '/vault',
          active: false
        },
        {
          name: 'Insurance',
          router: '/insurance',
          routerChildren: '/insurance',
          active: false
        },
        {
          name: 'Lend',
          router: '/lend',
          routerChildren: '/lend',
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
        if (o.routerChildren.indexOf(e) > -1) {
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
  z-index: 100;
  background-color: #fff;
  display: flex;
  justify-content: center;
  position: fixed;
  .middle_header {
    width: 100%;
    display: flex;
    max-width: 1440px;
    position: relative;
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
      margin-right: 105px;
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
      right: 0;
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
      height: 46px;
      background-color: rgba(85, 188, 126, 0.8);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      cursor: pointer;
      position: absolute;
      z-index: 99;
      right: 10px;
      top: 12px;
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
  }
}
@media (max-width: 920px) {
  .header {
    height: 44px;
    .middle_header {
      .icon {
        img {
          width: 61px;
          margin: 0px 0 0 16px;
        }
      }
      .min_menu_icon {
        img {
          width: 16px;
          height: 14px;
          top: 15px;
          right: 66px;
        }
      }
      .min_menu {
        top: 45px;
        right: 62px;
      }
      .lang {
        background-color: transparent;
        color: #118b80;
        font-size: 14px;
        top: 0;
        right: 0;
      }
      .langSelect {
        top: 35px;
        right: -10px;
      }
    }
  }
  .header_menu {
    display: none;
  }
}
@media (min-width: 920px) {
  .min_menu_icon {
    display: none;
  }
}
</style>
