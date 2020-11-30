import Table from '@/components/UI/table/Table'
import TableColumn from '@/components/UI/table/TableColumn'

export default {
  install (Vue) {
    Vue.component('Table', Table)
    Vue.component('TableColumn', TableColumn)
  }
}
