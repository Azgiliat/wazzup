<template>
  <button type="button" class="button" :class="{'button--disabled': disabled || loading}"
          @click="$emit('click')">
    <transition name="button-loader" mode="out-in">
      <span class="button__text" ref="text" v-if="!loadingWithDelay">
        <slot/>
      </span>
      <div v-else class="button__text-shadow" :style="{width: `${textWidth}px`, height: `${textHeight}px`}">
        <LineLoader class="button__line-loader"/>
      </div>
    </transition>
  </button>
</template>

<script>
import LineLoader from './LineLoader'

export default {
  name: 'AppButton',
  props: {
    disabled: {
      type: Boolean,
      require: false,
      default: false
    },
    loading: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  components: {
    LineLoader
  },
  data() {
    return {
      textWidth: 0,
      textHeight: 0,
      loadingWithDelay: false
    }
  },
  mounted() {
    this.textWidth = this.$refs.text.clientWidth
    this.textHeight = this.$refs.text.clientHeight
  },
  watch: {
    loading(newVal) {
      if (newVal) {
        this.loadingWithDelay = true
      } else {
        setTimeout(() => {
          this.loadingWithDelay = false
        }, 1500)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  border: none;
  outline: none;
  background-color: $main-black;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;

  &__text {
    display: block;
    color: $main-white;
    letter-spacing: -0.2px;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    transition: all $transition;
    will-change: transform, opacity;

    &--hidden {
      transform: translateX(10px);
      opacity: 0;
    }
  }

  &:hover {
    cursor: pointer;
  }

  &--disabled {
    cursor: auto;
    pointer-events: none;
    filter: grayscale(1);
  }

  &__line-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__text-shadow {
    position: relative;
  }

  &-loader {
    &-enter-active, &-leave-active {
      transition: opacity $transition, transform $transition;
    }

    &-leave-to {
      transform: translateX(10px);
      opacity: 0;
    }

    &-enter {
      transform: translateX(-10px);
      opacity: 0;
    }

    &-enter-to {
      transform: translateX(0);
      opacity: 1;
    }
  }
}
</style>
