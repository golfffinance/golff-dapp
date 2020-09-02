<template>
  <input
    class="inputNumber"
    type="number"
    :placeholder="placeholder"
    v-model.number="inputModel"
  />
</template>
<script type="text/ecmascript-6">
export default {
  components: {},
  model: {
    prop: 'inputModel',
    event: 'notify'
  },
  props: {
    point: {
      default: 0
    },
    max: Number,
    placeholder: String,
  },
  data () {
    return {
      lineData: {},
      formData: {},
      inputModel: null,
    }
  },
  mounted () {

  },
  methods: {
    setParentModeVal () {
      this.$emit('notify', this.inputModel);
    }
  },
  watch: {
    'inputModel': function (newVal, oldVal) {
      if (newVal === '' && oldVal.toString().indexOf('.') > 0) {
        this.inputModel = oldVal;
        this.setParentModeVal();
        return;
      }
      if (newVal) {
        newVal = newVal.toString();
        var pointIndex = newVal.indexOf('.');
        if (pointIndex > 0 && (newVal.length - pointIndex) > (this.point + 1)) {
          this.inputModel = oldVal;
          this.setParentModeVal();
          return;
        }
      }
      if (this.max > 0 && newVal > this.max) {
        this.inputModel = oldVal;
        this.setParentModeVal();
        return;
      }
      this.setParentModeVal();
    }
  }
}
</script>
 
<style lang="less" scoped>
.inputNumber {
  user-select: auto;
  outline: none;
  width: 80%;
  border: 1px solid #118b80;
  color: #444;
  background-color: #fff;
  font-size: 20px;
  font-weight: 700;
  font-family: Bebas-Regular;
  padding: 7px 20px;
  border-radius: 100px;
  outline: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
