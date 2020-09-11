<template>
  <div class="GolfInsurance">
    <div class="header">
      <div>
        <img src="../../assets/gof_go.png" alt />
        <img src="../../assets/GolfInsurance.png" alt />
      </div>
    </div>
    <div class="content flex">
      <p>{{$t('insuranceContent')}}</p>
      <img v-if="!isH5()" src="../../assets/coming_soon.png" alt />
      <img v-if="isH5()" src="../../assets/coming_soon_m.png" alt />
    </div>
  </div>
</template>

<script>
import { isH5 } from '@/utils/index';
export default {
    data () {
        return { isH5: isH5 }
    }
}
</script>

<style lang="less" scoped>
.GolfInsurance {
  flex: 1;
  padding-top: 70px;
  background-color: #118b80;
  .header {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    div {
      img:nth-child(1) {
        width: 60px;
      }
      img:nth-child(2) {
        width: 355px;
        margin-left: 25px;
      }
    }
  }
  .content {
    margin-top: 20px;
    color: #fff;
    p {
      width: 80%;
      max-width: 550px;
      text-align: center;
      font-weight: 400;
    }
    img {
      width: 80%;
      max-width: 593px;
      margin-top: 55px;
    }
  }
}
@media (max-width: 920px) {
  .GolfInsurance {
    .header {
      display: flex;
      justify-content: center;
      margin-top: 30px;
      div {
        margin-left: 10%;
        img:nth-child(1) {
          width: 12%;
        }
        img:nth-child(2) {
          width: 70%;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
