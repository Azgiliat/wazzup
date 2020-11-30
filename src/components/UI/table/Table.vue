<template>
  <div class="table" :class="{'table--with-popup': popupProp.length}">
    <TableSearch class="table__search" v-if="withSearch" @goSearch="goSearch" :searchKey.sync="searchKey"/>
    <TableContent :rows="rowsPerPage" :key="pageKey" @showPopup="showPopup">
      <slot/>
    </TableContent>
    <TablePagination v-if="withPagination" class="table__controls" :totalPages="totalPages"
                     :currentPage.sync="currentPage"
                     @goToFirst="goToFirstPage"
                     @goToLast="goToLastPage"
                     @goPrev="goToPrevPage"
                     @goNext="goToNextPage"
    />
    <Popup :isOpen.sync="isPopupOpen">
      <TableModal :keys="popupProp" :itemForDisplay="itemForPopup"/>
    </Popup>
  </div>
</template>

<script>
import Popup from '@/components/UI/Popup'
import TableModal from '@/components/UI/table/TableModal'
import TableSearch from '@/components/UI/table/TableSearch'
import TableContent from '@/components/UI/table/TableContent'
import TablePagination from '@/components/UI/table/TablePagination'

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
    },
    withSearch: {
      type: Boolean,
      require: false,
      default: false
    },
    withPagination: {
      type: Boolean,
      require: false,
      default: false
    },
    popupProp: {
      type: Array,
      require: false
    }
  },
  components: {
    TableSearch,
    TablePagination,
    TableContent,
    TableModal,
    Popup
  },
  data () {
    return {
      pageKey: 0,
      currentPage: 0,
      searched: false,
      searchKey: '',
      searchedRows: [],
      isPopupOpen: false,
      itemForPopup: {}
    }
  },
  computed: {
    totalPages () {
      return Math.ceil(this.rowsForDisplay.length / this.perPage)
    },
    rowsPerPage () {
      return this.rowsForDisplay.slice(this.perPage * this.currentPage, this.perPage * (this.currentPage + 1))
    },
    rowsForDisplay () {
      return this.searched ? this.searchedRows : this.rows
    }
  },
  methods: {
    goSearch () {
      //TODO add loader for search time mb
      this.searchedRows = this.rows.filter(row => {
        let acceptable = false
        for (let key in row) {
          if (row[key].includes(this.searchKey)) {
            acceptable = true
            break
          }
        }

        return acceptable
      })

      this.searched = true
    },
    goToFirstPage () {
      this.currentPage = 0
    },
    goToLastPage () {
      this.currentPage = this.totalPages - 1
    },
    goToNextPage () {
      if (this.currentPage + 1 < this.totalPages) {
        this.currentPage++
      }
    },
    goToPrevPage () {
      if (this.currentPage - 1 >= 0) {
        this.currentPage--
      }
    },
    showPopup (evt) {
      if (this.popupProp.length) {
        this.itemForPopup = evt
        this.isPopupOpen = true
      }
    }
  },
  watch: {
    searchKey (newVal) {
      if (newVal === '') {
        setTimeout(() => {
          this.searched = false
        }, 700)
      }
    }
  }
}
</script>

<style lang="scss">
.table {
  &__search {
    margin-bottom: 50px;
  }

  &-move {
    transition: transform 1s;
  }

  &__content {
    width: 100%;
  }

  &__header {
    border-bottom: 1px solid $main-black;

    &::after {
      display: block;
      content: '-';
      opacity: 0;
      line-height: 15px;
    }
  }

  &__header-title {
    margin: 0;
  }

  &__cell-wrapper {
    display: flex;
    align-items: center;
  }

  &__header-sort {
    width: 0;
    height: 0;
    border-bottom: 10px solid $main-black;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    margin-left: 10px;
    transition: transform $transition, opacity $transition;
    opacity: 0;

    &--down {
      transform: rotate(180deg);
    }

    &--show {
      opacity: 1;
    }
  }

  &__header-cell {
    &--sortable {
      &:hover {
        cursor: pointer;

        .table__header-sort {
          opacity: 1;
        }
      }
    }
  }

  &__row {
    &:nth-child(2n) {
      background-color: rgba($main-black, 0.2);
    }

    .table__cell {
      padding: 5px 10px;
    }
  }

  &--with-popup {
    .table {
      &__cell:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
