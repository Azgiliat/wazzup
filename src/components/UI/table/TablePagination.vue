<template>
  <div class="pagination">
    <div class="pagination__first-page-block">
      <p class="pagination__text pagination__first-page" @click="$emit('goToFirst')">
        Первая страница
      </p>
    </div>
    <div class="pagination__current-page-block">
      <svg class="pagination__prev" @click="$emit('goPrev')">
        <use xlink:href="#arrow"/>
      </svg>
      <p class="pagination__current-page pagination__text">
        {{ currentPage + 1 }}
      </p>
      <svg class="pagination__next" @click="$emit('goNext')">
        <use xlink:href="#arrow"/>
      </svg>
    </div>
    <div class="pagination__last-page-block">
      <p class="pagination__text pagination__last-page" @click="$emit('goToLast')">
        Последняя страница
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TablePagination',
  props: {
    currentPage: {
      type: Number,
      require: true
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 50%;
  margin: 20px auto 0 auto;

  &__current-page-block {
    display: flex;
    align-items: center;
  }

  &__next, &__prev {
    width: 20px;
    height: 20px;
    transform: rotate(90deg);

    &:hover {
      cursor: pointer;
    }
  }

  &__next {
    transform: rotate(-90deg);
  }

  &__current-page {
    margin: 0 10px;
  }

  &__last-page, &__first-page {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
