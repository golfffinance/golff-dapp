<template>
  <div class="GolfVault">
    <div class="header">
      <div>
        <img src="../../assets/gof_go.png" alt />
        <img src="../../assets/GolfVault.png" alt />
      </div>
    </div>
    <div class="content flex">
      <p>{{$t('vaultContent')}}</p>
        <img src="../../assets/coming_soon.png" alt="">
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.GolfVault {
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
    color: #FFF;
    p{
        width: 80%;
        max-width: 550px;
        text-align: center;
        font-weight: 400;
    }
    img{
        width: 80%;
        max-width: 593px;
        margin-top: 55px;
    }
  }
}
</style>
