import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import Goods from '@/components/goods/goods';
import Seller from '@/components/seller/seller';
import Ratings from '@/components/ratings/ratings';
import '../common/less/index.css';
Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: HelloWorld
    // },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    },
    {
      path: '/',
      redirect: {name: 'goods'}
    }
  ]
});

// window.history.go(1)
// Router.go(-1)
