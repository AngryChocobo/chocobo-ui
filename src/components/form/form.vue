<template>
  <form>
    <slot> </slot>
  </form>
</template>

<script>
export default {
  name: "cForm",
  props: {
    model: Object,
    rules: {
      type: Object,
    },
  },
  provide() {
    return {
      form: this,
    };
  },
  data() {
    return {
      fields: [],
    };
  },
  created() {
    // 由于子组件会优先于form完成mounted，所以监听事件必须得提前
    this.$on("on-form-item-add", (field) => {
      // TODO ? 有必要判断吗
      if (field) {
        this.fields.push(field);
      }
    });
    this.$on("on-form-item-remove", (field) => {
      // TODO ? 有必要判断吗
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1);
      }
    });
  },
  methods: {
    // 公开方法：重置全部数据
    resetFields() {
      this.fields.forEach((field) => {
        field.resetField();
      });
    },
    // 公开方法：全部校验数据，支持 Promise
    validate(callback) {
      let valid = true;
      let count = 0;
      let promise;
      if (typeof callback !== "function") {
        promise = new Promise((resolve, reject) => {
          callback = (valid) => (valid ? resolve(valid) : reject(valid));
        });
      }

      if (this.fields.length === 0) {
        if (typeof callback === "function") {
          callback(true);
        }
      }
      this.fields.forEach((field) => {
        field.validate("", (errors) => {
          if (errors) {
            valid = false;
          }
          if (
            typeof callback === "function" &&
            ++count === this.fields.length
          ) {
            callback(valid);
          }
        });
      });
      if (promise) {
        return promise;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.form {
  .item {
    display: none;
  }
}
</style>
