<script>
export default {
  name: 'TableContent',
  props: {
    rows: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      sortBy: '',
      actualRows: []
    }
  },
  created () {
    this.copyRows()
  },
  watch: {
    rows() {
      this.copyRows()
    },
    sortBy() {
      this.sortRows()
    }
  },
  methods: {
    copyRows () {
      this.actualRows = this.rows
    },
    sortRows () {
      if (this.sortBy) {
        this.actualRows.sort((firstRow, secondRow) => {
          if (firstRow[this.sortBy] > secondRow[this.sortBy]) {
            return 1
          }
          if (firstRow[this.sortBy] < secondRow[this.sortBy]) {
            return -1
          }
          return 0
        })
      } else {
        this.copyRows()
      }
    },
    renderColumns (h, row, columnsOptions) {
      return columnsOptions.map(column => h('td', {
            class: 'table__row',
            style: {
              width: `${column.width}px`,
            },
            domProps: {
              innerHTML: row[column.prop],
            }
          })
      )
    }
  },
  render (h) {
    const columnsOptions = this.$slots.default.filter(item => item?.componentOptions?.tag === 'TableColumn')
        .map(column => ({
          ...column.componentOptions.propsData,
          sortable: typeof column?.data?.attrs?.sortable !== 'undefined'
        }))

    const columnsHead = columnsOptions.map((column, index) => h('th', {
      class: 'table__header-cell',
      key: `table-header-${index}`,
      style: {
        width: `${column.width}px`,
      }
    }, [column.title,
      column.sortable && h('div', {
        class: 'table__header-sort',
        on: {
          click: () => {
            this.sortBy = column.prop
          }
        }
      })]))

    const rows = this.actualRows.map((row, index) => h('tr', {
      class: 'table__row',
      key: `table-row-${index}`
    }, this.renderColumns(h, row, columnsOptions)))

    return h('table',
        {
          class: 'table__content'
        },
        [
          h('thead', {
            class: 'table__header',
            key: 'header'
          }, [
            h('tr', [columnsHead])
          ]),
          h('transition-group', {
            props: {
              tag: 'tbody',
              name: 'table',
            },
            class: 'table__body',
            key: 'body'
          }, [rows])
        ])
  }
}
</script>
