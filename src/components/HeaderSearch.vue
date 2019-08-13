<template>
  <div class="headersearch">
    <!-- <router-link to="/">
    <img src="@/assets/images/logo_small.svg" alt="logo">
    </router-link> -->
    
    <!-- <div class="header">
      <div class="header-title">
        <Icon type="md-cloud" size="20" class="header-icon" color="#159cf8"/>{{msg}}
      </div>
      <Input search enter-button placeholder="亲，请输入单号" />
    </div> -->
    <x-header :title="header_title" :left-options="{showBack:false,preventGoBack:true}" @on-click-back="getMore">
      <div slot="left">
        <drawer width="200px;" :show.sync="drawerVisibility">

          <div slot="drawer">
            <!-- 菜单内容 -->
          </div>

          <!-- rourer-view 作为默认插槽内容 -->
          <div>
            <router-view></router-view>
          </div>
        </drawer>
      </div>
    </x-header>
  </div>
</template>

<script>
import { XHeader, Drawer} from "vux";
export default {
  name: 'HeaderSearch',
  data () {
    return {
      header_title: 'vux使用',
      drawerVisibility: false
    }
  },
  components: {
    XHeader
  },
  methods:{
    getMore(){
      console(1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.headersearch{
  .header{
    margin: 0 auto;
    max-width: 400px;
    padding: 10px 10px 0 10px;
    .header-title{
      width: 100%;
      text-align: left;
    }
    // .header-icon{
    //   margin-left: 0;
    // }
  }
}
</style>
 
