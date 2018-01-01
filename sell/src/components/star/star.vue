<template>
<div class="star" :class="starType">
  <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
</div>
</template>
<script type="text/ecmascript-6">
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
  export default{
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType () {
      return 'star-' + this.size;
    },
    itemClasses () {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
//      /*4.3乘2=8.6 下取整=8/2=4（4.5乘2=9 下取整（整数不用取整）=9/2=4.5*/
      let hasDecimal = score % 1 !== 0;
      let integer = Math.floor(score);
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less">
  .bg(@url){
    background-image:url("@{url}@2x.png")
  }
.star{
  font-size:0;
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }
  &.star-48{
    .star-item{
      width:2rem;
      height:2rem;
      margin-right:2.2rem;/*总宽度 除以 星星的宽度乘个数 再除以4 等于单个间距*/
      background-size:2rem 2rem;
      &.last-child{
        margin-right: 0
      }
      &.on{
        .bg('star48_on')
      }
      &.half{
        .bg('star48_half')
      }
      &.off{
        .bg('star48_off')
      }
    }
  }
  &.star-36{
    .star-item{
      width:1.5rem;
      height:1.5rem;
      margin-right:1.6rem;
      background-size:1.5rem 1.5rem;
      &.last-child{
        margin-right: 0
      }
      &.on{
        .bg('star36_on')
      }
      &.half{
        .bg('star36_half')
      }
      &.off{
        .bg('star36_off')
      }
    }
  }
  &.star-24{
    .star-item{
      width:1rem;
      height:1rem;
      margin-right:0.3rem;
      background-size:1rem 1rem;
      &.last-child{
        margin-right: 0;
      }
      &.on{
        .bg('star24_on')
      }
      &.half{
        .bg('star24_half')
      }
      &.off{
        .bg('star24_off')
      }
    }
  }
}
</style>
