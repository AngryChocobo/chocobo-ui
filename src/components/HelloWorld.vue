<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li>
        <span v-for="girl in user.girls" :key="girl">{{ girl }}</span>
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
import Emitter from "../mixins/emitter";

export default {
  name: "HelloWorld",
  inject: ["user"],
  mixins: [Emitter],
  props: {
    msg: String,
  },
  mounted() {
    // console.log("HelloWorld mounted");
    // this.user.girls = [1, 2, 3];
    // console.log(this.user.girls);
    // this.$on("show", (msg) => {
    //   console.log("son组件Helloworld收到了", msg);
    // });
  },
  created() {
    // console.log("HelloWorld created");
    // this.dispatch("App", "report", "我是H1");
    // console.log(this.user.girls);
    // this.$on("show", (msg) => {
    //   console.log("son组件Helloworld收到了App的boradcast: ", msg);
    // });
    // this.dispatch("App", "report", "我是H1");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
