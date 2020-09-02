<template>
  <div class="footer">
    <div class="icon flex">
      <img class="er_code" :src="er_code" v-if="er_code_show" />
      <p class="c2020">©2020 Golff</p>
      <ul class="footer_icon flex">
        <li>
          <a class="flex" href="https://t.me/GolffProtocol" target="_black">
            <img src="../assets/icon_telegram.png" alt />
          </a>
        </li>
        <li>
          <a class="flex" href="https://twitter.com/GolffProtocol" target="_black">
            <img src="../assets/icon_twitter.png" alt />
          </a>
        </li>
        <li>
          <a class="flex" href="https://discord.gg/ySbD6Ck" target="_black">
            <img src="../assets/icon_discord.png" alt />
          </a>
        </li>
        <li>
          <a class="flex" href="https://medium.com/@GolffProtocol" target="_black">
            <img src="../assets/icon_medium.png" alt />
          </a>
        </li>
        <li>
          <a class="flex" href="https://www.reddit.com/user/GolffProtocol" target="_black">
            <img src="../assets/icon_reddit.png" alt />
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
</template>

<script>
import { sendEmail } from '@/service/CommonService'
import er_code from '../assets/er_code.png';
export default {
  data () {
    return {
      er_code: er_code,
      er_code_show: false
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.footer {
  height: 70px;
  background-color: #283742;
  display: flex;
  align-items: center;
  position: relative;
  .icon {
    width: 100%;
    height: 100%;
    margin-left: 10px;
    flex-direction: row;
    justify-content: space-between;
    .er_code {
      position: absolute;
      z-index: 10;
      right: 0;
      top: -120px;
    }
    .c2020 {
      color: #127164;
      font-size: 14px;
    }
    .footer_icon {
      display: flex;
      flex-direction: row;
      li {
        list-style: none;
        margin-right: 5px;
        img {
          width: 36px;
          height: 36px;
        }
      }
    }
  }
}
</style>
