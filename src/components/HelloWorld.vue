<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <router-link :to="'/content'">
      <span>toContent</span>
    </router-link>
    <button @click="getData" class="isMe">111</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '点击下面进行跳转'
    }
  },
  methods: {
    getData(){
      this.$fetch.get('https://vip.kingdee.com/api/topstories?page=1&pageSize=10&types%5B0%5D=Article&types%5B1%5D=News&types%5B2%5D=Question&types%5B3%5D=Course').then(res => {
          // this.dataList = res.content;
          // if(this.dataList.length == 0){
          //   this.isNull = false;
          // }
          console.log(res)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello{
  .isMe{
  width: 100px;
  height: 20px;
}
}

</style>
