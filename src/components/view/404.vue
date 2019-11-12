<template>
  <div class="mainBox">
    <img src="../../assets/images/error-page/yun0.png" alt="" class="yun yun0"/>
    <img src="../../assets/images/error-page/yun1.png" alt="" class="yun yun1"/>
    <img src="../../assets/images/error-page/yun2.png" alt="" class="yun yun2"/>
    <img src="../../assets/images/error-page/bird.png" alt="" class="bird"/>
    <img src="../../assets/images/error-page/san.png" alt="" class="san"/>
    <div class="tipInfo">
      <div class="in">
        <div class="textThis">
          <h2>出错啦404！</h2>
          <p><span>页面自动<router-link to="/home">跳转</router-link></span><span>等待<b>{{time}}</b>秒</span></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        time: 6
      }
    },
    mounted() {
      const timer = setInterval(() => {
        this.time --
        if(this.time === 0) {
          clearInterval(timer)
          this.$router.push("/home");
        }
      },1000)
    }
  }
</script>
<style scoped>

  .mainBox {
    width: 100%;
    height: 100vh;
    background: #d2f5f1;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }

  .mainBox > img {
    position: absolute
  }

  .yun0 {
    right: -140px;
    top: 30px;
    animation: cloudLarge 105s infinite;
  }

  .yun1 {
    left: 5%;
    top: 48%;
    animation: cloudSmall 105s infinite;
  }

  .yun2 {
    left: 16%;
    top: 35%;
    animation: cloudMedium 105s infinite;
  }

  .san {
    left: 10%;
    top: 20%;
    animation: dn400 3s 0s ease both;
  }

  .bird {
    left: 27%;
    top: 15%;
    animation: flying 3s infinite;
  }

  .tipInfo {
    position: absolute;
    z-index: 99;
    border: 4px solid rgba(192, 237, 232, 07);
    border-radius: 5px;
    derbackground: #c0ece7;
    background: rgba(192, 237, 232, 07);
    width: 360px;
    right: 250px;
    top: calc(50% - 180px);
  }

  .tipInfo .in {
    background: #fff;
    padding: 0 10%
  }

  .tipInfo .in h2 {
    line-height: 50px;
    font-size: 30px;
    color: #e94c3c;
    border-bottom: 1px dashed #aacdd5;
    padding: 18px 0
  }

  .tipInfo .in p {
    padding: 30px 0 50px 0;
    text-align: center;
    color: #289575
  }

  .tipInfo .in p span {
    margin: 0 20px
  }

  .tipInfo .in p span a {
    color: #e94c3c;
    margin: 0 10px
  }


  .tipInfo .in .desc h3 {
    font-weight: normal;
    padding: 20px 0 5px 0
  }

  .tipInfo .in .desc li {
    background: no-repeat left center;
    margin-left: 5px;
    padding: 5px 0;
    padding-left: 8px;
    *padding-left: 20px;
  }

  @-webkit-keyframes cloudLarge {
    0% {
      right: -140px;
    }
    100% {
      right: 118%;
    }
  }

  @-moz-keyframes cloudLarge {
    0% {
      right: -140px;
    }
    100% {
      right: 118%;
    }
  }

  @-o-keyframes cloudLarge {
    0% {
      right: -140px;
    }
    100% {
      right: 118%;
    }
  }

  @keyframes cloudLarge {
    0% {
      right: -140px;
    }
    100% {
      right: 118%;
    }
  }

  @-webkit-keyframes cloudSmall {
    0% {
      left: 5%;
    }
    100% {
      left: 108%;
    }
  }

  @-moz-keyframes cloudSmall {
    0% {
      left: 5%;
    }
    100% {
      left: 105%;
    }
  }

  @-o-keyframes cloudSmall {
    0% {
      left: 5%;
    }
    100% {
      left: 105%;
    }
  }

  @keyframes cloudSmall {
    0% {
      left: 5%;
    }
    100% {
      left: 105%;
    }
  }

  @-webkit-keyframes cloudMedium {
    0% {
      left: 16%;
    }
    100% {
      left: -18%;
    }
  }

  @-moz-keyframes cloudMedium {
    0% {
      left: 16%;
    }
    100% {
      left: -18%;
    }
  }

  @-o-keyframes cloudMedium {
    0% {
      left: 16%;
    }
    100% {
      left: -18%;
    }
  }

  @keyframes cloudMedium {
    0% {
      left: 16%;
    }
    100% {
      left: -18%;
    }
  }

  @-webkit-keyframes light {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 100;
    }
  }

  @-moz-keyframes light {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 100;
    }
  }

  @-o-keyframes light {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 100;
    }
  }

  @keyframes light {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 100;
    }
  }

  @-webkit-keyframes hide {
    0% {
      opacity: 100;
    }
    100% {
      opacity: 0;
    }
  }

  @-moz-keyframes hide {
    0% {
      opacity: 100;
    }
    100% {
      opacity: 0;
    }
  }

  @-o-keyframes hide {
    0% {
      opacity: 100;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes hide {
    0% {
      opacity: 100;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes flying {
    0% {
      margin-top: 0;
    }
    50% {
      margin-top: 6px;
    }
    100% {
      margin-top: 0;
    }
  }

  @-webkit-keyframes flying {
    0% {
      margin-top: 0;
    }
    50% {
      margin-top: 6px;
    }
    100% {
      margin-top: 0;
    }
  }

  @-moz-keyframes flying {
    0% {
      margin-top: 0;
    }
    50% {
      margin-top: 6px;
    }
    100% {
      margin-top: 0;
    }
  }

  @-o-keyframes flying {
    0% {
      margin-top: 0;
    }
    50% {
      margin-top: 6px;
    }
    100% {
      margin-top: 0;
    }
  }

  @keyframes flying {
    0% {
      margin-top: 0;
    }
    50% {
      margin-top: 6px;
    }
    100% {
      margin-top: 0;
    }
  }

  @-webkit-keyframes flying {
    0% {
      margin-top: 0;
    }
    50% {
      margin-top: 6px;
    }
    100% {
      margin-top: 0;
    }
  }

  @-moz-keyframes flying {
    0% {
      margin-top: 0;
    }
    50% {
      margin-top: 6px;
    }
    100% {
      margin-top: 0;
    }
  }

  @-o-keyframes flying {
    0% {
      margin-top: 0;
    }
    50% {
      margin-top: 6px;
    }
    100% {
      margin-top: 0;
    }
  }

  @-webkit-keyframes down900 {
    0% {
      opacity: 0;
      -webkit-transform: translate(0, 0);
    }
    100% {
      opacity: 1;
      -webkit-transform: translate(900, 900);
    }
  }

  @-moz-keyframes down900 {
    0% {
      opacity: 0;
      -moz-transform: translate(0, 0);
    }
    100% {
      opacity: 1;
      -moz-transform: translate(900, 900);
    }
  }

  @-o-keyframes down900 {
    0% {
      opacity: 0;
      -o-transform: translate(0, 0);
    }
    100% {
      opacity: 1;
      -o-transform: translate(900, 900);
    }
  }

  @keyframes down900 {
    0% {
      opacity: 0;
      transform: translate(0, 0);
    }
    100% {
      opacity: 1;
      transform: translate(900, 900);
    }
  }

  @-webkit-keyframes dn400 {
    0% {
      opacity: 0;
      -webkit-transform: translateY(-400px);
    }
    100% {
      opacity: 1;
      -webkit-transform: translateY(0);
    }
  }

  @-moz-keyframes dn400 {
    0% {
      opacity: 0;
      -moz-transform: translateY(-400px);
    }
    100% {
      opacity: 1;
      -moz-transform: translateY(0);
    }
  }

  @-o-keyframes dn400 {
    0% {
      opacity: 0;
      -o-transform: translateY(-400px);
    }
    100% {
      opacity: 1;
      -o-transform: translateY(0);
    }
  }

  @keyframes dn400 {
    0% {
      opacity: 0;
      transform: translateY(-400px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

</style>
