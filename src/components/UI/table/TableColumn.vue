<script>
export default {
  name: 'TableColumn',
  props: {
    prop: {
      type: String,
      require: true
    },
    title: {
      type: String,
      require: true
    },
    width: {
      type: [String, Number],
      require: false
    }
  }
}
</script>
