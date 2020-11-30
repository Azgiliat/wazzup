<template>
  <div class="search">
    <p class="search__title search__text">
      Поиск в таблице
    </p>
    <div class="search__controls">
      <AppInput cleanable @enter="$emit('goSearch')" class="search__input" :value.sync="search"/>
      <AppButton class="search__button" @click="$emit('goSearch')">
        Найти
      </AppButton>
    </div>
  </div>
</template>

<script>
import AppInput from '@/components/UI/AppInput'
import AppButton from '@/components/UI/AppButton'

export default {
  name: 'TableSearch',
  components: {
    AppButton,
    AppInput
  },
  props: {
    searchKey: {
      type: String,
      require: true
    }
  },
  computed: {
    search: {
      get() {
        return this.searchKey
      },
      set(val) {
        this.$emit('update:searchKey', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  &__controls {
    display: flex;
  }

  &__button {
    margin-left: 15px;
  }
}
</style>
