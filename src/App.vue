<template>
  <div id="app">
    <!-- <HelloWorld msg="HelloWorld">
      <Son />
    </HelloWorld>
    <HelloWorld2 msg="HelloWorld2" /> -->
    <FormTest />
  </div>
</template>

<script>
import Emitter from "./mixins/emitter";
// import HelloWorld from "./components/HelloWorld.vue";
// import Son from "./components/sonson.vue";
// import HelloWorld2 from "./components/HelloWorld2.vue";
import FormTest from "./FormTest.vue";

export default {
  name: "App",
  mixins: [Emitter],
  components: {
    // HelloWorld,
    // HelloWorld2,
    // Son,
    FormTest,
  },
  provide() {
    return {
      user: {
        name: "fuck",
        age: "2",
        girls: [1, 2],
      },
    };
  },
  mounted() {
    // console.log("App mounted");
    // this.func1();
    // this.broadcast("HelloWorld", "show", "show msg");
  },
  created() {
    // console.log("App created");
    // this.$on("report", (msg) => {
    //   console.log("App收到了son的dispatch", msg);
    // });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
