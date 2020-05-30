<template>
    <h1>SON</h1>
</template>

<script>
import Emitter from "../mixins/emitter";

export default {
  name: "HelloWorld",
  mixins: [Emitter],
  created() {
    // console.log("sonson created");
    // this.dispatch("App", "report", "我是H1");
    // console.log(this.user.girls);
    // this.$on("show", (msg) => {
    //   console.log("son组件Helloworld收到了", msg);
    // });
    this.dispatch("App", "report", "我是孙砸");
  },
};
</script>

<style scoped>