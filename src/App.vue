<template>
  <div id="app" class="app">
    <router-view class="app__body"/>
    <div class="overlay" v-show="isOverlayShow" @click="setOverlayState(false)"/>
    <Popup :isOpen.sync="isError">
      <ErrorModal />
    </Popup>
  </div>
</template>

<script>
import Popup from '@/components/UI/Popup'
import ErrorModal from '@/components/UI/ErrorModal'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'App',
  components: {
    Popup,
    ErrorModal
  },
  computed: {
    ...mapState('global', {
      isOverlayShow: 'isPopupShow',
      errorText: 'errorText'
    }),
    isError: {
      get() {
        return !!this.errorText
      },
      set(val) {
        if (!val) {
          this.setErrorText('')
        }
      }
    }
  },
  methods: {
    ...mapMutations('global', {
      setOverlayState: 'setOverlayState',
      setErrorText: 'setErrorText'
    })
  }
}
</script>
<style lang="scss" scoped>
</style>
