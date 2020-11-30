<template>
  <div class="error-modal">
    <p class="error-modal__title">
      Ошибочка!
    </p>
    <p class="error-modal__text">
      {{errorText}}
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ErrorModal',
  computed: {
    ...mapState('global', {
      errorText: 'errorText'
    })
  }
}
</script>

<style lang="scss" scoped>
.error-modal {
  &__title {
    font-weight: 700;
    color: $error;
    font-size: 30px;
    text-align: center;
  }
}
</style>
