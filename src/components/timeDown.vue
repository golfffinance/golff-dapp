<template>
  <div class="TimeDown golBor">
      <div class="spar" >
          <div class="flex">{{stake.leftTime.day || '...'}}</div>
            <div class="flex">:</div>
            <div class="flex">{{stake.leftTime.hour || '...'}}</div>
            <div class="flex">:</div>
            <div class="flex">{{stake.leftTime.minutes || '...'}}</div>
            <div class="flex">:</div>
            <div class="flex">{{stake.leftTime.seconds || '...'}}</div>
        </div>
      </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
    computed: {
        ...mapState(['network', 'lang', 'stake']),
    },
    watch: {
        'stake.status' (e) {
            
        }
    },
    data() {
        return {
            
        }
    },
    methods: {
   
    }
}
</script>

<style lang="less" scoped>
.TimeDown{
    width: 80%;
    max-width: 400px;
    font-family: Bebas-Regular;
    .spar{
        display: flex;
        color: #118B80;
        font-size: 30px;
        padding: 5px 40px;
        font-weight: 400;
        div{
            flex:1;
            text-shadow:0px 5px 5px rgba(17,139,128,0.5);
        }
    }
}
</style>
