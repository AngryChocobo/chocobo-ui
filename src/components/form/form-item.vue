<template>
  <div>
    <label v-if="label" :class="{ 'c-form-item-label-required': isRequired }">{{
      label
    }}</label>
    <div>
      <slot></slot>
      <div v-if="validateState === 'error'" class="c-form-item-message">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import AsyncValidator from "async-validator";
import Emitter from "../../mixins/emitter";

export default {
  name: "cFormItem",
  mixins: [Emitter],
  inject: ["form"],
  props: {
    label: {
      type: String,
    },
    prop: {
      type: String,
    },
  },
  data() {
    return {
      initialValue: "", //初始值
      isRequired: false,
      validateState: "", // 校验状态
      validateMessage: "", // 校验不通过时的提示信息
    };
  },
  computed: {
    // 从 Form 的 model 中动态得到当前表单组件的数据
    fieldValue() {
      return this.form.model[this.prop];
    },
  },
  mounted() {
    // 将自己缓存到Form中
    if (this.prop) {
      this.dispatch("cForm", "on-form-item-add", this);
      // 设置初始值，以便在重置时恢复默认值
      this.initialValue = this.fieldValue;
      this.setRules();
    }
  },
  methods: {
    setRules() {
      let rules = this.getRules();
      if (rules.length) {
        let isRequired = false;
        if (rules && rules.length) {
          rules.every((rule) => {
            if (rule.required) {
              isRequired = true;
              return false;
            }
            return true;
          });
        }
        this.isRequired = isRequired;
      }
      this.$on("on-form-change", this.onFieldChange);
      this.$on("on-form-blur", this.onFieldBlur);
    },
    onFieldChange() {
      this.validate("change");
    },
    onFieldBlur() {
      this.validate("blur");
    },
    getRules() {
      let formRules = this.form.rules;
      formRules = formRules ? formRules[this.prop] : [];
      return [].concat(formRules || []);
    },
    getFilteredRule(trigger) {
      const rules = this.getRules();
      return rules.filter(
        (rule) => !rule.trigger || rule.trigger.indexOf(trigger) !== -1
      );
    },
    validate(trigger, callback = function() {}) {
      const rules = this.getFilteredRule(trigger);
      // 如果没有校验规则，则直接返回成功
      if (rules.length === 0) {
        return true;
      }
      // console.log("需要校验trigger：", trigger, callback);
      // 否则，进入校验中状态
      this.validateState = "validating";
      // 以下为 async-validator 库的调用方法
      const descriptor = {};
      descriptor[this.prop] = rules;
      const validator = new AsyncValidator(descriptor);
      const model = {};
      model[this.prop] = this.fieldValue;
      validator.validate(model, { firstFields: true }, (errors) => {
        this.validateState = !errors ? "success" : "error";
        this.validateMessage = errors ? errors[0].message : "";
        callback(this.validateMessage);
      });
    },
    // 重置数据
    resetField() {
      this.validateState = "";
      this.validateMessage = "";
      // TODO 这里算是一种强行修改父组件的值，似乎有点反模式
      this.form.model[this.prop] = this.initialValue;
    },
  },
  beforeDestroy() {
    this.dispatch("cForm", "on-form-item-remove", this);
  },
};
</script>

<style>
.c-form-item-label-required:before {
  content: "*";
  color: red;
}
.c-form-item-message {
  color: red;
}
</style>
