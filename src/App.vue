<template>
  <div id="app" class="app">
    <router-view class="app__body"/>
    <div class="overlay" v-show="isOverlayShow" @click="setOverlayState(false)"/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState('global', {
      isOverlayShow: 'isPopupShow'
    })
  },
  methods: {
    ...mapMutations('global', {
      setOverlayState: 'setOverlayState'
    })
  }
}
</script>
<style lang="scss">
</style>
