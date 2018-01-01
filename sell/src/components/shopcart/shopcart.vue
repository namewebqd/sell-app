<template>
<div class="shopcart">
  <div class="content">
    <div class="content-left">
      <div class="logo-wrapper">
        <div class="logo" :class="{'highlight':totalPrice>0}">
          <span class="icon-shopping_cart" :class="{'highlight':totalPrice>0}"></span>
        </div>
        <div class="num" v-show="totalPrice>0" :class="{'highlight':totalPrice>0}">{{totalPrice}}</div>
      </div>
      <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
      <div class="desc">另需配送费￥{{seller.data.deliveryPrice}}元</div>
    </div>
    <div class="content-right">
      <div class="pay">￥{{seller.data.minPrice}}起送</div>
    </div>
  </div>
</div>
</template>
<script type="text/ecmascript-6">
export default{
  props: {
    seller: {},
    selectFoods: {
      type: Array,
      default () {
        return [
          {
            price: 10,
            count: 1
          }
        ];
      }
    }
  },
  computed: {
    totalPrice () {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    }
  },
  totalCount () {
    let count = 0;
    this.selectFoods.forEach((food) => {
      count += food.count;
    });
    return count;
  }
};
</script>
<style lang="less" rel="stylesheet/less">
.shopcart{
  position:fixed;
  left:0;
  bottom:0;
  width:100%;
  background:#141D27;
  height:4.8rem;
  z-index: 50;
  .content{
    display:flex;
    .content-left{
      flex:1;
      font-size:0;
      .logo-wrapper{
        display:inline-block;
        position:relative;
        top:-1rem;
        margin:0 1.2rem;
        padding:0.6rem;
        width:5.6rem;
        height:5.6rem;
        box-sizing:border-box;
        vertical-align: top;
        border-radius: 50%;
        background:#141D27;
        .logo{
          width:100%;
          height:100%;
          border-radius: 50%;
          background:#2B343C;
          text-align: center;
          &.highlight{
            background:rgb(0,160,220);
          }
          .icon-shopping_cart{
            font-size:2.4rem;
            color:#80858a;
            line-height:4.4rem;
            &.highlight{
              color:white;
            }
          }
        }
        .num{
          position:absolute;
          top:0;
          right:0;
          background:red;
          width:2.4rem;
          height:1.6rem;
          line-height:1.6rem;
          text-align: center;
          box-shadow: 0 0.4rem 0.8rem 0 rgba(0,0,0,0.4);
          border-radius: 1.6rem;
          font-size:0.9rem;
          font-weight:700;
          color:white;
        }
      }
      .price{
        display:inline-block;
        font-size:1.6rem;
        color:rgba(255,255,255,0.4);
        font-weight: 700;
        line-height:2.4rem;
        padding-right:1.2rem;
        margin:1.2rem 0 1.2rem 0;
        box-sizing:border-box;
        border-right:1px solid rgb(255,255,255,0.1);
        &.highlight{
          color:white;
        }
      }
      .desc{
        display: inline-block;
        font-size:1rem;
        color:rgba(255,255,255,0.4);
        line-height: 4.8rem;
        font-weight:700;
        padding:0 1.2rem;
        vertical-align: top;
      }
    }
    .content-right {
      flex: 0 0 10.5rem;
      .pay{
        font-size: 1.2rem;
        font-weight: 700;
        line-height: 4.8rem;
        color: rgba(255, 255, 255, 0.4);
        padding:0 0.8rem;
        background: #2B333B;
        box-sizing: border-box;
        text-align: center;
      }
    }
  }
}
</style>
