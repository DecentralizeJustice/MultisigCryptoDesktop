export default {

  updateDevicePlan ({ commit }, deviceplan) {
    commit('updateDevicePlan', deviceplan)
  },
  hideDevicePlan ({ commit }) {
    commit('hideDevicePlan')
  },
  showDeviceSetup ({ commit }) {
    commit('showDeviceSetup')
  },





  toggleAll ({ state, commit }, done) {
    state.todos.forEach((todo) => {
      commit('editTodo', { todo, done })
    })
  },

  clearCompleted ({ state, commit }) {
    state.todos.filter(todo => todo.done)
      .forEach(todo => {
        commit('removeTodo', todo)
      })
  }
}
