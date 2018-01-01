<template>
<div class="goods">
  <div class="menu-wrapper" ref="menu">
    <ul>
      <li v-for="(item,index) in goods.data" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
        <span class="text" >
          <span v-show="item.type<3" class="icon" :class="classMap[item.type]">{{item.name}}</span>
        </span>
      </li>
    </ul>
  </div>
  <div class="foods-wrapper" ref="food">
    <ul>
      <li v-for="item in goods.data" class="food-list food-list-hook">
        <h1 class="title">{{item.name}}</h1>
        <ul>
          <li v-for="food in item.foods" class="food-item">
            <div class="icon">
              <img :src="food.icon" width="57px" height="57px" alt="">
            </div>
            <div class="content">
              <h2 class="name">{{food.name}}</h2>
              <p class="desc">{{food.description}}</p>
              <div class="extra">
                <span>月售{{food.sellCount}}份</span>
                <span>好评率{{food.rating}}%</span>
              </div>
              <div class="price">
                <span><i>¥</i><span>{{food.price}}</span></span>
                <span v-show="food.oldPrice"><i>¥</i><span>{{food.oldPrice}}</span></span>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <Shopcart :seller="seller"></Shopcart>
</div>
</template>

 <script type="text/ecmascript-6">
   import Shopcart from '../shopcart/shopcart.vue';
   import axios from 'axios';
   import BScroll from 'better-scroll';
   const ERR_OK = 0;
    export default {
      props: { // 接收父组件传的数据
        seller: {
          type: Object
        }
      },
      data () {
        return {
          goods: [],
          ListHeight: [],
          scrollY: 0  // 存放实时获取的y值
        };
      },
      computed: {
                          //  对比左右index实现高亮效果
        currentIndex () { // 当前菜单在整个菜单中的下标的index
          for (let i = 0; i < this.ListHeight.length; i++) {
            // 判断当currentindex在height1和height2区间的时候显示
            let height1 = this.ListHeight[i];
            let height2 = this.ListHeight[i + 1];
            if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
              // 最后一个区间没有height2  判断当前的实时获取的csrollY在哪个height1和height2的区间内（即哪一个i和menu所对应的下标）
              return i; // 如果满足则返回index
            }
          }
          return 0; // 不满足返回初始值0
        }
      },
      created () {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

        axios.get('/goods').then(response => {
          if (response.data.errno === ERR_OK) {
            this.goods = response.data;
            this.$nextTick(() => { // 数据是异步更新的 虽然改变了数据 但dom没有变化  $nexttick的目的就是把传进来的函数 延迟到dom更新 以后再调用
              this._initScroll();
              this._calculateHeight();
            });
//            console.log(this.ListHeight);
            console.log(this.goods);
          }
        });
      },
      methods: {
                                 // 获取左侧的index 传给右侧使之跳到左侧index的位置
        selectMenu (index, event) { // 给menu绑定点击事件 并获取到当前的index  传入一个事件对象
          if (!event._constructed) { // 如果不存在这个属性，则不执行下面的函数
            return;
          }
          // 自己默认派发时间时候（BSscroll）._constructed被置为true，但是浏览器原生并没有至各属性
          let foodList = this.$refs.food.getElementsByClassName('food-list-hook');
          let ref = foodList[index]; // 把menu的index传到foodlist中 获取当前的menu的index的foodlist  找到对应的foodlist
          this.foodScroll.scrollToElement(ref, 300); // 使用scrollToElement方法 点击menu的时候 使foodlist跳到对应的位置 动画时间
//          console.log(index);
        },
                                // 实时获取右侧的y值
        _initScroll () {
          this.menuScroll = new BScroll(this.$refs.menu, {click: true}); // click属性用于可以设置点击事件
          this.foodScroll = new BScroll(this.$refs.food, {probeType: 3}); // probeType探针作用，实时监测滚动位置
          this.foodScroll.on('scroll', (pos) => { // 实时滚动的时候把获取到的位置给暴露出来
            // on监听foodScroll的scroll事件 会调参数的参数是一个位置pos
            this.scrollY = Math.abs(Math.round(pos.y)); // 实时获取Y值的方法  获取到foodScroll的y值并赋值给scrollY
            console.log(this.scrollY);
          });
        },
                             // 获取每一个右侧li的高度 并储存起来
        _calculateHeight () {
          let foodList = this.$refs.food.getElementsByClassName('food-list-hook');
          let height = 0;
          this.ListHeight.push(height);
          for (let i = 0; i < foodList.length; i++) {
            let item = foodList[i]; // 把获取到的每一个li（即一商品的类）循环出来
            height += item.clientHeight; // 获取到每一个li的高度加前一个的高度
            this.ListHeight.push(height); // 把每一个加完的高度push到listHeihgt数组中 并保存到data中
          }
        }
      },
      components: {
        Shopcart
      }
    };
</script>

<style lang="less" rel="stylesheet/less">
  @import  '../../common/less/style';
  .goods{
  position:absolute;
  width:100%;
  top:17.4rem;
  bottom:4.8rem;
  display:flex;
  overflow:hidden;
  .menu-wrapper{
    flex:0 0 8rem;
    width:8rem;
    color:black;
    background: #f3f5f7;
    .menu-item{
      display:table;
      width:5.6rem;
      height:5.4rem;
      padding:0 1.2rem;
      &.current{
        position:relative;
        z-index:10;
        margin-top:-0.1rem;
        background:#fff;
        font-weight:700;
        .text{
          border-bottom:none;
        }
      }
      .icon{
        display:inline-block;
        width:5.6rem;
        height:5.4rem;
        font-size:1.2rem;
        font-weight:200;
        line-height:5.4rem;
        color:black;
        margin-right:0.2rem;
        /*padding-top:2rem;*/
        background-size:1.2rem 1.2rem;
        background-repeat: no-repeat;
        background-position:left 1.1rem;
        &.decrease {
          text-indent: 1.4rem;
          line-height:1.4rem;
          padding-top:1rem;
          height:4.4rem;
          .image(decrease_3);
          //.bg("../../components/header/brand")
        }
        &.discount{
          line-height:1.4rem;
          text-indent: 1.4rem;
          padding-top:1rem;
          height:4.4rem;
          .image(discount_3)
        }
        &.guarantee{
          line-height:1.4rem;
          text-indent: 1.4rem;
          padding-top:1rem;
          height:4.4rem;
          .image(guarantee_3)
        }
        &.invoice{
          line-height:1.4rem;
          text-indent: 1.4rem;
          padding-top:1rem;
          height:4.4rem;
          .image(invoice_3)
        }
        &.special{
          line-height:1.4rem;
          text-indent: 1.4rem;
          padding-top:1rem;
          height:4.4rem;
          .image(special_3)
        }
      .text{
        display:table-cell;
        width:5.6rem;
        font-size:0;
      }

      }
    }
  }
  .foods-wrapper{
    flex:1;
    .food-list{
      &:last-child{
        border:0;
      }
      .title{
        height:2.6rem;
        border-left:0.2rem solid #D9DDE1;
        background:#f3f5f7;
        font-size:1.2rem;
        color:rgb(147,153,159);
        line-height:2.6rem;
        padding-left:1.4rem;
      }
      .food-item{
        padding:1.8rem 1.8rem;
        display:flex;
        border-bottom:0.1rem solid rgba(7,17,27,0.1);
        .icon{
          display:inline-block;
          width:5.7rem;
          height:5.6rem;
          background-size:5.7rem 5.7rem;
        }
        .content{
          margin-left:1rem;
          display:inline-block;
          .name{
            font-size:1.4rem;
            color:rgb(7,17,27);
            line-height:1.4rem;
            margin-top:0.2rem;
            height:1.4rem;
          }
          .desc{
            margin:0.8rem 0;
            line-height:1rem;
            font-size:1rem;
            color:rgb(147,153,159);
          }
          .extra{
            span{
              font-size:1rem;
              color:rgb(147,153,159);
              line-height:1rem;
              margin-right:1.2rem;
            }
          }
          .price{
            line-height:2.4rem;
            & :first-child>i{
              font-size:1rem;
              color:#F01414;
              font-weight: 700;
              font-style:normal; /*去i标签的斜体效果*/
            }
            & :first-child>span{
              font-size:1.4rem;
              font-weight:700;
              color:#F01414;
            }
            & :last-child>i{
              font-size:1rem;
              color:rgb(147,153,159);
              font-style:normal;
              font-weight: 700;
              text-decoration:line-through;
            }
            & :last-child>span{
              font-size:1rem;
              color:rgb(147,153,159);
              font-weight:700;
              text-decoration:line-through;
            }
          }
        }
      }
    }
  }
}
</style>
