<template>
  <div class="modal">
    <ul class="modal__list">
      <li class="modal__element" v-for="key in keys" :key="key.value">
        <p class="modal__text">
          <span class="modal__title">{{ key.name }}:</span>
          <span class="modal__info">{{ itemForDisplay[key.value] }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TableModal',
  props: {
    keys: {
      type: Array,
      require: true
    },
    itemForDisplay: {
      type: Object,
      require: true
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__title {
    font-weight: bolder;
    margin-right: 5px;
  }
}
</style>
