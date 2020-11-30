<template>
  <div class="table">
    <transition name="table-page">
      <TableContent :rows="rowsPerPage" :key="pageKey">
        <slot/>
      </TableContent>
    </transition>
    <TableControls class="table__controls" :totalPages="totalPages" :currentPage.sync="currentPage"/>
  </div>
</template>

<script>
import TableContent from '@/components/UI/table/TableContent'
import TableControls from '@/components/UI/table/TableControls'

export default {
  name: 'Table',
  props: {
    rows: {
      type: Array,
      require: true
    },
    perPage: {
      type: Number,
      require: false,
      default: 20
    }
  },
  components: {
    TableControls,
    TableContent
  },
  data () {
    return {
      pageKey: 0,
      currentPage: 0
    }
  },
  computed: {
    totalPages () {
      return Math.ceil(this.rows.length / this.perPage)
    },
    rowsPerPage () {
      return this.rows.slice(this.perPage * this.currentPage, this.perPage)
    }
  }
}
</script>

<style lang="scss">
.table {
  &__header-sort {
    background-color: #0AD266;
    width: 10px;
    height: 10px;
  }

  &-move {
    transition: transform 1s;
  }
}
</style>
