<template>
  <c-form :model="form" :rules="rules" ref="form">
    <c-formItem label="用户名" prop="username">
      <c-input v-model="form.username" />
    </c-formItem>
    <c-formItem label="邮箱" prop="email">
      <c-input v-model="form.email" />
    </c-formItem>
    <div class="btn-group">
      <button type="button" @click="submit">提交</button>
      <button type="button" @click="reset">重置</button>
    </div>
  </c-form>
</template>

<script>
import Emitter from "./mixins/emitter";
import cForm from "./components/form/form.vue";
import cFormItem from "./components/form/form-item.vue";
import cInput from "./components/input/input.vue";

export default {
  name: "FormTest",
  mixins: [Emitter],
  components: {
    cForm,
    cFormItem,
    cInput,
  },
  data() {
    return {
      form: {
        username: "AngryChocobo",
        email: "1347237169@qq.com",
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {},
  created() {},
  methods: {
    reset() {
      this.$refs.form.resetFields();
    },
    submit() {
      // 回调函数形式的校验
      //   this.$refs.form.validate((valid) => {
      //     console.log("valid: ", valid);
      //     if (valid) {
      //       window.alert("提交成功");
      //     } else {
      //       window.alert("表单校验失败");
      //     }
      //   });
      // promise形式的校验
      this.$refs.form.validate().then(
        () => {
          window.alert("提交成功");
        },
        (result) => {
          window.alert(result);
        }
      );
    },
  },
};
</script>

<style></style>
