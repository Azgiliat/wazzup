<template>
  <div class="input-group" :class="{'input-group--cleanable': cleanable}">
    <input class="input-group__input" @keyup.enter="$emit('enter')" :required="required" v-model="_value" :placeholder="placeholder" :type="type"/>
    <button @click="_value = ''" v-if="cleanable" v-show="_value.length" type="button" class="input-group__clear" />
  </div>
</template>

<script>
export default {
  name: 'AppInput',
  props: {
    type: {
      type: String,
      require: false,
      default: 'text'
    },
    placeholder: {
      type: String,
      require: false,
      default: ''
    },
    value: {
      type: String,
      require: true
    },
    required: {
      type: Boolean,
      require: false,
      default: false
    },
    cleanable: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  computed: {
    _value: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('update:value', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.input-group {
  border: 1px solid $main-black;
  position: relative;

  &__input {
    padding: 10px;
    font-size: 14px;
    line-height: 17px;
    background-color: $main-white;
    border-radius: 4px;
    border: none;
    width: 100%;

    &::placeholder {
      font-size: 14px;
      line-height: 17px;
      color: $main-black;
    }
  }

  &--cleanable {
    padding-right: 30px;
  }

  &__clear {
    position: absolute;
    right: 5px;
    top: 5px;
    border: none;
    outline: none;
    background-color: transparent;
    width: 20px;
    height: 20px;
    display: block;
    padding: 0;

    &::before, &::after {
      position: absolute;
      content: '';
      width: 100%;
      height: 2px;
      border-radius: 1px;
      background-color: $main-black;
      transform: rotate(45deg);
      top: calc(50% - 1px);
      left: 0;
    }

    &::after {
      transform: rotate(-45deg);
    }

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
