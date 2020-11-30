export function loadUsers ({ commit} ) {
  commit('setLoadingStatus', true)

  return this.$wazzupApi.loadData()
    .then(res => {
      commit('setUsers', res)
    })
    .catch(() => {
      commit('setUsers', [])
    })
    .finally(() => {
      commit('setLoadingStatus', false)
    })
}
