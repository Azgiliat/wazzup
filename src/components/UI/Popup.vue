<template>
  <div class="popup" v-if="isOpen">
    <slot />
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
      isOverlayShow: 'isOverlayShow'
    })
  },
  methods: {
    ...mapMutations('global', {
      setOverlayState: 'setOverlayState'
    })
  },
  watch: {
    isOpen (newVal) {
      if (newVal) {
        this.setOverlayState(true)
      } else {
        this.setOverlayState(false)
      }
    },
    isOverlayShow (newVal) {
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
}
</style>
