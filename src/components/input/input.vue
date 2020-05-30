<template>
  <div>
    <input :value="currentValue" @input="handleInput" @blur="handleBlur" />
  </div>
</template>

<script>
import Emitter from "../../mixins/emitter";

export default {
  name: "cInput",
  mixins: [Emitter],
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      currentValue: this.value,
    };
  },
  watch: {
    value(val) {
      // console.log("watch");
      this.currentValue = val;
    },
    // 这里似乎也可以 currentValue 初始化为空字符串， 然后用下面的形式实现
    // value: {
    //   handler: function(val) {
    //     this.currentValue = val;
    //   },
    //   immediate: true,
    // },
  },
  methods: {
    handleInput(event) {
      const value = event.target.value;
      this.$emit("input", value);
      this.dispatch("cFormItem", "on-form-change", value);
    },
    handleBlur() {
      this.dispatch("cFormItem", "on-form-blur", this.currentValue);
    },
  },
};
</script>

<style lang="less" scoped></style>
