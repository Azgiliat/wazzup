export function loadUsers ({ commit} ) {
  commit('setLoadingStatus', true)

  return this.$wazzupApi.loadData()
    .then(res => {
      console.log(res)
      commit('setUsers', res)
    })
    .finally(() => {
      commit('setLoadingStatus', false)
    })
}
