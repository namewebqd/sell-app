<template>
  <div id="app">
    <Hheader :seller="seller"></Hheader>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods" exact>商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import Hheader from './components/header/header.vue';
  import axios from 'axios';
  const ERR_OK = 0;

export default {
  name: 'app',
  data () {
   return {
     seller: {}
   };
  },
  created () {
    this.head();
  },
  methods: {
    head () {
      axios.get('/seller').then(res => {
        if (res.data.errno === ERR_OK) {
          this.seller = res.data;
//          console.log(this.seller);
        }
      });
    }
  },
  components: {
     Hheader
  }
};
</script>

<style lang="less" rel="stylesheet/less">
  @import 'common/less/style';
#app{
  .tab{
  display:flex;
  width:100%;
  height:4rem;
  line-height: 4rem;
    .border-1px(rgba(7,17,27,0.1));
    .border-2px(rgba(7,17,27,0.1));
    .tab-item{
      flex:1;
      text-align:center;
       &>a{
        display:block;
        text-decoration:none;
        font-size:1.4rem;
        color:rgb(77,85,93);

      }
    }
  }
  .router-link-active{
    color:rgb(240,20,20)!important;
  }
}
</style>
