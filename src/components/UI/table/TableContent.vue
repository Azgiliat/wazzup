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
      sortDirection: false,
      actualRows: []
    }
  },
  created () {
    this.copyRows()
  },
  watch: {
    rows () {
      this.copyRows()
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
            return this.sortDirection ? 1 : -1
          }
          if (firstRow[this.sortBy] < secondRow[this.sortBy]) {
            return this.sortDirection ? -1 : 1
          }
          return 0
        })
      } else {
        this.copyRows()
      }
    },
    renderCellsInRow (h, row, columnsOptions) {
      return columnsOptions.map(column => h('td', {
            class: 'table__cell',
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
    // TODO make table on divs for use transition-group
    // TODO add styles to make it more beautiful
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
    }, [
      h('div', {
        class: 'table__cell-wrapper'
      }, [h('p', {
        class: 'table__header-title',
        domProps: {
          innerHTML: column.title
        }
      }),
        column.sortable && h('div', {
          class: {
            'table__header-sort': true,
            'table__header-sort--down': this.sortBy === column.prop && !this.sortDirection
          },
          on: {
            click: () => {
              if (this.sortBy === column.prop) {
                this.sortDirection = !this.sortDirection
              } else {
                this.sortDirection = false
                this.sortBy = column.prop
              }
              this.sortRows()
            }
          }
        })])
    ]))

    const rows = this.actualRows.map((row, index) => h('tr', {
      class: 'table__row',
      key: `table-row-${index}`,
      on: {
        click: () => {
          this.$emit('showPopup', row)
        }
      }
    }, this.renderCellsInRow(h, row, columnsOptions)))

    return h('table',
        {
          class: 'table__content'
        },
        [
          h('thead', {
            class: 'table__header',
            key: 'header'
          }, [
            h('tr', {
              class: 'table__header-row'
            }, [columnsHead])
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
