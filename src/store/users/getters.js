export function formattedUsers (state) {
  return state.users.map(({ add, ...other }) => ({
    ...other,
    state: add.state
  }))
}
