<template>
  <div class="line-loader">
    <span class="line-loader__element"/>
    <span class="line-loader__element"/>
    <span class="line-loader__element"/>
  </div>
</template>

<script>
export default {
  name: 'LineLoader'
}
</script>

<style lang="scss" scoped>
  .line-loader {
    display: flex;
    align-items: center;

    &__element {
      width: 12px;
      height: 12px;
      display: block;
      border-radius: 50%;
      background-color: $main-white;
      margin: 0 3px;
      animation: fade 1s ease infinite;
      opacity: 0;

      &:nth-child(2) {
        animation-delay: 0.1s;
      }

      &:nth-child(3) {
        animation-delay: 0.2s;
      }
    }
  }

  @keyframes fade {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
