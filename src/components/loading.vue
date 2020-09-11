<template>
  <div class="loading_screen flex">
    <div class="loading_course">
      <div class="loading_hole"></div>
      <div class="loading_flag">
        <span></span>
      </div>
    </div>
    <div class="loading_ball"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.loading_screen {
    position: relative;
    overflow: hidden;
    width: 340px;
    height: 360px;
    margin: auto;
}
.loading_screen:before {
    content: " ";
    position: absolute;
    border-bottom: solid 10px #6cc18c;
    border-radius: 50%;
    z-index: 10;
    top: 181px;
    left: 50%;
    margin-left: -12px;
    width: 24px;
    height: 20px;
}
.loading_course {
    position: absolute;
    background: #6cc18c;
    border-radius: 50%;
    top: 180px;
    left: 0px;
    width: 340px;
    height: 155px;
}
.loading_hole {
    position: absolute;
    background: #143f64;
    border-radius: 50%;
    top: 8px;
    left: 50%;
    margin-left: -12px;
    width: 24px;
    height: 14px;
}
.loading_flag {
    position: absolute;
    overflow: hidden;
    width: 40px;
    height: 64px;
    border-radius: 2px;
    left: 50%;
    top: -55px;
    margin-left: 4px;
}
.loading_flag:before {
    content: " ";
    position: absolute;
    background: #f2d777;
    border-radius: 2px 2px 0 0;
    top: 0;
    left: 0;
    width: 4px;
    height: 68px;
    z-index: 2;
}
.loading_flag{
    span {
        position: absolute;
        background: #ec221c;
        border-left: solid 12px #ec221c;
        border-right: solid 12px #f00;
        animation: flag 3s linear infinite;
        top: 3px;
        left: 4px;
        width: 35px;
        height: 28px;
    }
    span:before {
        content: " ";
        position: absolute;
        background: #f1f8f2;
        border-bottom-right-radius: 20px 10px;
        animation: flag-top .7s ease-out alternate-reverse infinite;
        top: 100px;
        left: 100px;
        width: 50px;
        height: 30px;
        transform: translateY(-120px) translateX(-110px) rotateZ(20deg);
    }
    span:after {
        content: " ";
        position: absolute;
        background: #f1f8f2;
        border-top-left-radius: 2px;
        border-top-right-radius: 50px 12px;
        animation: flag-bottom .7s linear alternate-reverse infinite;
        top: 101px;
        left: 100px;
        width: 50px;
        height: 30px;
        transform: translateY(-87px) translateX(-110px) rotateZ(-20deg);
    }
}

.loading_ball {
    position: absolute;
    background: #fff;
    border-radius: 15px;
    animation: ball 3s ease infinite;
    z-index: 5;
    top: 180px;
    left: 192px;
    width: 12px;
    height: 12px;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
}
@keyframes flag {
    8% { transform: none; }
    10% { transform: rotateZ(4deg); }
    14% { transform: none; }
}
@keyframes flag-top {
    0% { border-bottom-right-radius: 24px 16px; }
    100% { border-bottom-right-radius: 50px 20px;}
}
@keyframes flag-bottom {
    0% { border-top-right-radius: 50px 12px; }
    100% { border-top-right-radius: 0 0; }
}
@keyframes ball {
    0% { top: 190px; left: -10px; }
    5% { top: 120px; }
    10% { top: 130px; left: 165px; }
    17% { top: 80px; left: 162px; }
    22% { top: 90px; }
    26% { top: 194px; left: 163px; }
    31% { left: 166px; }
    33% { left: 163px; }
    34% { left: 166px; }
    35% { left: 163px; }
    100% { top: 194px; left: 163px; }
}

</style>
