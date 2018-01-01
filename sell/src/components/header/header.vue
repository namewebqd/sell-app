<template>
    <div class="header">
        <div class="content-wrapper" >
          <div class="avatar">
            <img :src="seller.data.avatar" alt="">
          </div>
          <div class="content">
            <div class="title"></div>
            <div class="description">
              {{seller.data.description}}/{{seller.data.deliverTime}}分钟送达
            </div>
            <div v-if="seller.data.supports" class="supports">
              <span class="icon" :class="classMap[seller.data.supports[0].type]"></span>
              <span class="text">{{seller.data.supports[0].description}}</span>
            </div>
          </div>
          <div class="support-count" v-if="seller.data.supports" @click="showDetail()">
            <span class="count">{{seller.data.supports.length}}个</span>
            <i class="icon-keyboard_arrow_right"></i>
          </div>
        </div>
        <div class="bulletin-wrapper"  @click="showDetail()">
          <span class="bulletin-title"></span><span class="bulletin-text">{{seller.data.bulletin}}</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background" >
          <img :src="seller.data.avatar" alt="" width="100%" height="100%">
        </div>
      <transition name="fade">
        <div v-if="detailShow" class="detail">
          <div class="detail-wrapper clearfix">
            <div class="detail-main">
              <h1 class="name">{{seller.data.name}}</h1>
              <div class="star-wrapper">
              <Star :size="48" :score="seller.data.score"></Star>
              </div>
              <div class="title">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>
              <ul v-if="seller.data.supports" class="supports">
                <li class="support-item" v-for="(item,index) in seller.data.supports">
                <span class="icon" :class="classMap[seller.data.supports[index].type]"></span>
                <span class="text">{{seller.data.supports[index].description}}</span>
                </li>
              </ul>
              <div class="title">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
              </div>
              <div class="bulletin">
                <p class="content">{{seller.data.bulletin}}</p>
              </div>
            </div>
          </div>
          <div class="detail-close" @click="hiddenDetail()">
            <i class="icon-close"></i>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
  import Star from '../star/star.vue';
export default {
 props: {
   seller: {
     type: Object
   }
 },
  data () {
   return {
      detailShow: false
   };
  },
 created () {
   this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
 },
  methods: {
   showDetail () {
      this.detailShow = true;
   },
    hiddenDetail () {
      this.detailShow = false;
    }
  },
  components: {
    Star
  }
};
</script>

<style lang="less" rel="stylesheet/less">
  @import  '../../common/less/style';
  .mixin(@weight,@color,@height,@size){
    font-weight:@weight;
    color:@color;
    line-height: @height;
    font-size:@size;
  }
.header{
  position: relative;
  overflow: hidden;
  background:(rgba(7,17,27,0.5));
  .content-wrapper{
    padding:2.4rem 1.2rem 1.8rem 2.4rem;
    position: relative;
    .avatar{
      display:inline-block;
      border-radius:2px;
      vertical-align: top;
      width:6.4rem;
      height:6.4rem;
      img{
        width:6.4rem;
        height:6.4rem;
      }
    }
    .content{
      display:inline-block;
      margin-left:1.6rem;
      .title{
        margin:0.2rem 0 0.8rem 0;
        .brand {
          display: inline-block;
          .bg-image(brand);
          width:3rem;
          height:1.8rem;
          background-size:3rem 1.8rem;
          background-repeat:no-repeat;
          vertical-align: top;
         }
        .name {
          margin-left:0.6rem;
          .mixin(bold, rgb(255, 255, 255), 18px, 16px);
          display:inline-block;
        }
      }
      .description{
        margin:0.8rem 0 1rem 0;
        .mixin(200,rgb(255,255,255),1.2rem,1.2rem);
      }
      .supports{
        .icon{
          display:inline-block;
          width:1.2rem;
          height:1.2rem;
          background-size:1.2rem 1.2rem;
          background-repeat: no-repeat;
          vertical-align: top;
          &.decrease {
            .bg-image(decrease_1);
            //.bg("../../components/header/brand")
          }
          &.discount{
            .bg-image(discount_1)
          }
          &.guarantee{
            .bg-image(guarantee_1)
          }
          &.invoice{
            .bg-image(invoice_1)
          }
          &.special{
            .bg-image(special_1)
          }
        }
        .text{
          margin-left:0.4rem;
          height:1.3rem;
          display:inline-block;
          vertical-align: top;
          .mixin(200,rgb(255,255,255),1.3rem,1rem);
        }
      }
    }
    .support-count{
      height:2.4rem;
      line-height: 2.4rem;
      text-align: center;
      background-color: rgba(0,0,0,0.2);
      padding:0 0.8rem;
      position: absolute;
      right:1.2rem;
      bottom:1.8rem;
      border-radius:1.4rem;
      .count{
        vertical-align: top;
      }
      .count,.icon-keyboard_arrow_right{
        .mixin(200,white,2.4rem,1erm);
        text-align: center!important;
      }
      .icon-keyboard_arrow_right{
        /*margin-left:2px;*/
        line-height: 2.9rem!important;
        padding-top:0.2rem;
      }
    }
  }
  .bulletin-wrapper{
    padding:0 2.2rem 0 1.2rem;
    height:2.8rem;
    line-height: 2.8rem;
    /*font-size:0;*/
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    color:white;
    vertical-align: baseline;
    .bulletin-title{
      display: inline-block;
      width:2.2rem;
      height:1.2rem;
      margin-top:0.8rem;
      .bg-image("bulletin");
      background-size: 2.2rem 1.2rem;
      background-repeat: no-repeat;
    }
    .bulletin-text{
      margin:0 0.4rem;
      vertical-align: top;
      font-size:1rem;
      color:white;
      letter-spacing: 0.1rem;
    }
    .icon-keyboard_arrow_right{
      position: absolute;
      font-size:1rem;
      right:1.2rem;
      top:0.8rem;
      color:white;
    }
  }
  .background{
    position: absolute;
    top:0;
    left: 0;
    width:100%;
    height:100%;
    z-index: -1;
    filter:blur(1rem)
  }
  .detail{
    position:fixed;
    z-index:100;
    left:0;
    top:0;
    width:100%;
    height:100%;
    overflow:hidden;
    background:rgba(7,17,27,0.8);
    transition:all 0.5s;
    &.fade-enter-active,&.fade-leave-active{
      /*transition:all 0.5s;*/
      opacity:1;
      background:rgba(7,17,27,0.8)
    }
    &.fade-enter,&.fade-leave{
      opacity: 0;
      background:rgba(7,17,27,0)
    }
    .detail-wrapper{
      min-height:100%;
      width:100%;
      .detail-main{
        margin-top:6.4rem;
        padding-bottom:  6.4rem;
        /*width:100%;*/
        .name{
          line-height: 1.6rem;
          text-align:center;
          font-size:1.6rem;
          font-weight: 700;
          color:white;
        }
        .star-wrapper{
          margin:1.8rem auto 0 1.9rem;
          padding:0.2rem 0;
          text-align: center;
        }
        .title{
          display:flex;
          width:80%;
          margin: 2.8rem auto 2.4rem auto;
          .line{
            flex:1;
            position:relative;
            top:-0.6rem;
            border-bottom:0.1rem solid rgba(255,255,255,0.2)
          }
          .text{
            padding:0 1.2rem;
            font-weight: 200;
            font-size:1.2rem;
          }
        }
        .supports{
          width:80%;
          margin: 0 auto ;
          .support-item{
            padding:0 1.2rem;
            margin-bottom: 1.2rem;
            &.last-child{
              margin-bottom:0;
            }
            .icon{
              display:inline-block;
              width:1.6rem;
              height:1.6rem;
              vertical-align: top;
              margin-right:0.4rem;
              background-size: 1.6rem 1.6rem;
              background-repeat: no-repeat;
              &.decrease {
              .bg-image(decrease_2);
              //.bg("../../components/header/brand")
              }
              &.discount{
                .bg-image(discount_2)
              }
              &.guarantee{
                .bg-image(guarantee_2)
              }
              &.invoice{
                .bg-image(invoice_2)
              }
              &.special{
                .bg-image(special_2)
              }
            }
            .text{
              font-size:1.2rem;
              font-weight:200;
              display: inline-block;
              line-height:1.6rem;
            }
          }
        }
        .bulletin{
          width:80%;
          margin:0 auto;
          .content{
            padding:0 1.2rem;
            font-size:1.2rem;
            font-weight:200;
            color:white;
            line-height:2.4rem;
          }
        }
      }
    }
    .detail-close{
      position:relative;
      width:3.2rem;
      height:3.2rem;
      margin:-6.4rem auto 0 auto;
      clear:both;
      font-size:3.2rem;
    }
  }
}
</style>

