<template>
  <div class="footer" :total="total">
    <div class="web_footer">
      <div class="c2020">
        <span>©</span> 2020 Golff
      </div>
      <div class="icon flex">
        <img class="er_code" :src="er_code" v-if="er_code_show" />
        <a
          class="tokenContract flex"
          href="https://etherscan.io/token/0x488E0369f9BC5C40C002eA7c1fe4fd01A198801c"
          target="_black"
        >Token Contract</a>
        <a
          class="tokenContract uniswap flex"
          href="https://uniswap.info/pair/0x9776a214272ab452f8c88c7576dcd0c6ffbfee14"
          target="_black"
        >
          <img src="../assets/icon_uniswap.png" alt />
          Uniswap GOF-ETH
        </a>

        <ul class="footer_icon flex">
          <li v-for="item in iconList">
            <a class="flex" :href="item.link" target="_black">
              <img :src="item.img" alt />
            </a>
          </li>
          <li class="flex">
            <img
              src="../assets/icon_wechat.png"
              alt
              @mouseleave="er_code_show = false"
              @mouseover="er_code_show = true"
            />
          </li>
        </ul>
      </div>
    </div>
    <div class="m_footer">
      <div class="link">
        <a
          class="tokenContract flex"
          href="https://etherscan.io/token/0x488E0369f9BC5C40C002eA7c1fe4fd01A198801c"
          target="_black"
        >Token Contract</a>
        <a
          class="tokenContract uniswap flex"
          href="https://uniswap.info/pair/0x9776a214272ab452f8c88c7576dcd0c6ffbfee14"
          target="_black"
        >
          <img src="../assets/icon_uniswap.png" alt />
          Uniswap GOF-ETH
        </a>
      </div>

      <ul class="footer_icon flex">
        <li v-for="item in iconList">
          <a class="flex" :href="item.link" target="_black">
            <img :src="item.img" alt />
          </a>
        </li>
        <li class="flex">
          <img
            src="../assets/icon_wechat.png"
            alt
            @mouseleave="er_code_show = false"
            @mouseover="er_code_show = true"
          />
        </li>
      </ul>
      <div class="c2020">
        <span>©</span> 2020 Golff
      </div>
    </div>
  </div>
</template>

<script>
import { sendEmail } from '@/service/CommonService';
import er_code from '../assets/er_code.png';
export default {
  props: ['total'],
  data () {
    return {
      er_code: er_code,
      er_code_show: false,
      iconList: [
        {
          img: require('../assets/icon_telegram.png'),
          link: 'https://t.me/GolffProtocol'
        },
        {
          img: require('../assets/icon_twitter.png'),
          link: 'https://twitter.com/GolffProtocol'
        },
        {
          img: require('../assets/icon_discord.png'),
          link: 'https://discord.gg/ySbD6Ck'
        },
        {
          img: require('../assets/icon_medium.png'),
          link: 'https://medium.com/@GolffProtocol'
        },
        {
          img: require('../assets/icon_reddit.png'),
          link: 'https://www.reddit.com/user/GolffProtocol'
        },
        {
          img: require('../assets/icon_github.png'),
          link: 'https://github.com/golff-protocol/'
        }
      ]
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.footer {
  .web_footer {
    width: 100%;
    height: 70px;
    background-color: #283742;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .m_footer {
    display: none;
    background-color: #283742;
    height: 180px;
  }
  .c2020 {
    width: 120px;
    color: #127164;
    font-size: 14px;
    margin-left: 10px;
    span {
      color: #666;
    }
  }
  .tokenContract {
    width: 136px;
    height: 40px;
    border: 1px solid #118b80;
    color: #118b80;
    border-radius: 8px;
    font-size: 14px;
    margin-right: 40px;
    flex-direction: row;
    cursor: pointer;
    img {
      width: 30px;
      height: 30px;
      margin-top: 3px;
      margin-right: 2px;
    }
  }
  .tokenContract:hover {
    border: 1px solid #ff6400;
    color: #ff6400;
  }
  .uniswap {
    width: 196px;
  }
  .icon {
    width: 100%;
    max-width: 1440px;
    height: 100%;
    margin-left: 10px;
    flex-direction: row;
    justify-content: flex-end;

    .er_code {
      position: absolute;
      z-index: 10;
      right: 0;
      top: -120px;
    }
  }
  .footer_icon {
    display: flex;
    flex-direction: row;
    justify-content: start;
    margin-left: 10px;
    li {
      list-style: none;
      margin-right: 3px;
      img {
        width: 33px;
        height: 33px;
        margin-top: 9px;
      }
    }
  }
}
@media (max-width: 760px) {
  .web_footer {
    display: none !important;
  }
  .m_footer {
    display: block !important;
    .link {
      display: flex;
      a {
        flex: 1;
        margin: auto;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 16px;
      }
      a:nth-child(1) {
        margin-left: 10px;
        margin-right: 5px;
      }
      a:nth-child(2) {
        margin-left: 5px;
        margin-right: 10px;
      }
    }
    .footer_icon {
      margin-top: 24px;
      li {
        margin-right: 10px;
      }
    }
  }
  .c2020 {
    margin-top: 10px;
    margin-left: 10px;
  }
  .footer {
    height: 180px;
    flex-direction: column;
  }
}
</style>
