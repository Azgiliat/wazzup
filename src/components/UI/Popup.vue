<template>
  <div class="popup" v-if="isOpen">
    <slot />
    <button class="popup__close" @click="setOverlayState(false)" type="button" />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'Popup',
  props: {
    isOpen: {
      type: Boolean,
      require: true
    }
  },
  computed: {
    ...mapState('global', {
      isPopupShow: 'isPopupShow'
    })
  },
  methods: {
    ...mapMutations('global', {
      setOverlayState: 'setOverlayState'
    }),
    onKeyup(evt) {
      if (evt.keyCode === 27) {
        this.setOverlayState(false)
      }
    }
  },
  mounted() {
    window.addEventListener('keyup', this.onKeyup)
  },
  destroyed () {
    window.removeEventListener('keyup', this.onKeyup)
  },
  watch: {
    isOpen (newVal) {
      if (newVal) {
        this.setOverlayState(true)
      } else {
        this.setOverlayState(false)
      }
    },
    isPopupShow (newVal) {
      if (!newVal) {
        this.$emit('update:isOpen', false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.popup {
  background-color: $main-white;
  position: fixed;
  z-index: 110;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  border-radius: 15px;

  &__close {
    width: 20px;
    height: 20px;
    position: absolute;
    top: -20px;
    right: -20px;
    border: none;
    outline: none;
    background-color: transparent;

    &::before, &::after {
      position: absolute;
      content: '';
      width: 100%;
      height: 2px;
      border-radius: 1px;
      background-color: $error;
      transform: rotate(45deg);
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
