<template>
  <div>
    <Header></Header>
    <!-- 书写路由组件出口 -->
    <router-view></router-view>
    <!-- 在Home、Search是显示的，在登录、注册隐藏 -->
    <Footer
      v-show="$route.meta.show"
    ></Footer>
  </div>
</template>

<script>
//引入
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "",
  components: {
    Header,
    Footer,
  },
  mounted() {
    //派发一个action获取商品分类的三级列表数据
    this.$store.dispatch("getCategoryList");
  },
};
</script>

<style scoped>
</style>
