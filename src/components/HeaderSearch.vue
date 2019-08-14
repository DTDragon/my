<template>
  <div id="headersearch">
    <!-- <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div> -->
    <div v-transfer-dom>
      <actionsheet :menus="menus1" v-model="showMenu" @on-click-menu="changeLocale"></actionsheet>
    </div>
    <drawer width="200px;" :show.sync="drawerVisibility" :show-mode="showModeValue"
      :placement="showPlacementValue"
      :drawer-style="{'background-color':'#35495e', width: '200px'}">

      <div slot="drawer" class="slot-drawer">
        <!-- 菜单内容 -->
      </div>
      <view-box ref="viewBox" :body-padding-top="isShowNav ? '46px' : '0'" body-padding-bottom="55px">
        <x-header
        slot="header"
        style="width:100%;position:absolute;left:0;top:0;z-index:100;"
        :left-options="leftOptions"
        :right-options="rightOptions"
        :title="title"
        @on-click-more="onClickMore">
        <span v-if="$route.path === '/' || $route.path === '/component/drawer'" slot="overwrite-left" @click="drawerVisibility = !drawerVisibility">
          <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
        </span>
      </x-header>
        <!-- rourer-view 作为默认插槽内容 -->
        <keep-alive>
          <router-view class="router-view"></router-view>
        </keep-alive>
        <tabbar class="vux-demo-tabbar" icon-class="vux-center"  slot="bottom">
          <tabbar-item :link="{path:'/'}" :selected="$route.path === '/'">
            <span class="demo-icon-22 vux-demo-tabbar-icon-home" slot="icon" style="position:relative;top: -2px;">&#xe637;</span>
            <span slot="label">Home</span>
          </tabbar-item>
          <tabbar-item :link="{path:'/democontent'}" :selected="isDemo" badge="9">
            <span class="demo-icon-22" slot="icon">&#xe633;</span>
            <span slot="label"><span v-if="componentName" class="vux-demo-tabbar-component">{{componentName}}</span><span v-else>Demos</span></span>
          </tabbar-item>
        </tabbar>
      </view-box>
    </drawer>
  </div>
</template>

<script>
import { XHeader, Drawer,ViewBox,Tabbar, TabbarItem,Actionsheet,Loading,TransferDom} from "vux";
import { mapState } from 'vuex'
export default {
  name: 'headersearch',
  directives: {
    TransferDom
  },
  data () {
    return {
      title: 'vux使用',
      drawerVisibility: false,
      showModeValue: 'push',
      showPlacementValue: 'left',
      isShowNav: true,
      showMenu: false,
      menus1: {
        menus1: '是否退出',
        menus2: '退出',
        menus3: '点错啦'
      },
    }
  },
  components: {
    XHeader,
    Drawer,
    ViewBox,
    Tabbar,
    TabbarItem,
    Actionsheet,
    Loading
  },
  computed: {
    // ...mapState({
    //   deviceready: state => state.app.deviceready,
    //   demoTop: state => state.vux.demoScrollTop,
    //   isLoading: state => state.vux.isLoading,
    //   direction: state => state.vux.direction
    // }),
    leftOptions () {
      return {
        showBack: this.$route.path !== '/'
      }
    },
    rightOptions () {
      return {
        showMore: true
      }
    },
    isDemo () {
      return /component|democontent/.test(this.$route.path)
    },
    componentName () {
      if (this.$route.path) {
        const parts = this.$route.path.split('/')
        if (/component/.test(this.$route.path) && parts[2]) return parts[2]
      }
    },
  },
  methods:{
    getMore(){
      console(1);
    },
    onClickMore () {
      this.showMenu = true
    },
    changeLocale (locale) {
      // this.$i18n.set(locale)
      // this.$locale.set(locale)
      console.log(this.menus1[locale])
    },
  }
}

</script>

<style lang="less" scoped>
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';
  // body{
  //   height: 100%;
  //   overflow-x: hidden;
  // }
  // html{
  //   height: 100%;
  //   overflow-x: hidden;
  // }
  #headersearch {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* margin-top: 20px; */
    // height: 648px;
     height: 100%;
    .header{
      margin: 0 auto;
      max-width: 400px;
      padding: 10px 10px 0 10px;
      .header-title{
        width: 100%;
        text-align: left;
      }
      
      
    }
    .slot-drawer{
      width: 100px;
      height: 100%;
    }
    .router-view{
      top: 46px;
      width: 100%;
    }
    .demo-icon-22 {
  font-family: 'vux-demo';
  font-size: 22px;
  color: #888;
}
.weui-tabbar.vux-demo-tabbar {
  /** backdrop-filter: blur(10px);
  background-color: none;
  background: rgba(247, 247, 250, 0.5);**/
}
.vux-demo-tabbar .weui-bar__item_on .demo-icon-22 {
  color: #F70968;
}
.vux-demo-tabbar .weui-tabbar_item.weui-bar__item_on .vux-demo-tabbar-icon-home {
  color: rgb(53, 73, 94);
}
.demo-icon-22:before {
  content: attr(icon);
}
.vux-demo-tabbar-component {
  background-color: #F70968;
  color: #fff;
  border-radius: 7px;
  padding: 0 4px;
  line-height: 14px;
}
.weui-tabbar__icon + .weui-tabbar__label {
  margin-top: 0!important;
}
.vux-demo-header-box {
  z-index: 100;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}
@font-face {
  font-family: 'vux-demo';  /* project id 70323 */
  src: url('//at.alicdn.com/t/font_70323_wlronpvr565yiudi.eot');
  src: url('//at.alicdn.com/t/font_70323_wlronpvr565yiudi.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_70323_wlronpvr565yiudi.woff') format('woff'),
  url('//at.alicdn.com/t/font_70323_wlronpvr565yiudi.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_70323_wlronpvr565yiudi.svg#iconfont') format('svg');
}
.demo-icon {
  font-family: 'vux-demo';
  font-size: 20px;
  color: #04BE02;
}
.demo-icon-big {
  font-size: 28px;
}
.demo-icon:before {
  content: attr(icon);
}
.router-view {
  width: 100%;
  top: 46px;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  top: 46px;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.menu-title {
  color: #888;
}
  }
</style>

